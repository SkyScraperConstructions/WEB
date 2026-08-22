/**
 * Generates favicon and icon files from public/logo.jpeg using sharp.
 * Run from the project root: node scripts/gen-icons.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'public', 'logo.jpeg');

/**
 * Returns raw RGBA pixel buffer at the given size.
 */
async function resizeRaw(size) {
  const { data, info } = await sharp(SRC)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Returns a PNG buffer at the given size (for app/icon.png etc.).
 */
async function resizePng(size) {
  return sharp(SRC)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .png()
    .toBuffer();
}

/**
 * Build a BMP DIB image suitable for embedding inside an ICO file.
 * ICO BMPs use BITMAPINFOHEADER (40 bytes) + BGRA pixel data (bottom-up)
 * + a 1-bit AND mask (all zeros = fully opaque).
 * Next.js/Turbopack's ICO decoder requires raw RGBA BMP data, not PNG.
 */
function buildBmpDib(data, width, height) {
  const rowBytes = width * 4;          // BGRA, no padding needed for 32-bit
  const pixelDataSize = rowBytes * height;
  const andMaskRowBytes = Math.ceil(width / 32) * 4; // 1-bit mask, DWORD-aligned
  const andMaskSize = andMaskRowBytes * height;
  const dibSize = 40 + pixelDataSize + andMaskSize;
  const buf = Buffer.alloc(dibSize, 0);

  // BITMAPINFOHEADER (40 bytes)
  buf.writeUInt32LE(40, 0);             // biSize
  buf.writeInt32LE(width,  4);          // biWidth
  buf.writeInt32LE(height * 2, 8);      // biHeight (doubled = pixel + mask)
  buf.writeUInt16LE(1,  12);            // biPlanes
  buf.writeUInt16LE(32, 14);            // biBitCount (32-bit BGRA)
  buf.writeUInt32LE(0,  16);            // biCompression = BI_RGB
  buf.writeUInt32LE(pixelDataSize, 20); // biSizeImage
  // remaining BITMAPINFOHEADER fields stay 0

  // Pixel data — BMP rows are bottom-up, stored as BGRA
  let offset = 40;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4; // RGBA from sharp
      buf[offset++] = data[src + 2]; // B
      buf[offset++] = data[src + 1]; // G
      buf[offset++] = data[src + 0]; // R
      buf[offset++] = data[src + 3]; // A
    }
  }

  // AND mask — all zeros means fully opaque (mask is also bottom-up)
  // Buffer is already zeroed, so nothing to write.

  return buf;
}

/**
 * Build a valid ICO file embedding BMP DIB images for each size.
 */
function buildIco(dibBuffers, sizes) {
  const count = dibBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < count; i++) {
    entries.push({ size: sizes[i], buf: dibBuffers[i], offset });
    offset += dibBuffers[i].length;
  }

  const ico = Buffer.alloc(offset);

  // ICONDIR
  ico.writeUInt16LE(0,     0); // reserved
  ico.writeUInt16LE(1,     2); // type = ICO
  ico.writeUInt16LE(count, 4); // image count

  // ICONDIRENTRY[]
  for (let i = 0; i < count; i++) {
    const { size, buf, offset: imgOffset } = entries[i];
    const base = 6 + i * 16;
    ico.writeUInt8(size === 256 ? 0 : size, base);     // width  (0 = 256)
    ico.writeUInt8(size === 256 ? 0 : size, base + 1); // height (0 = 256)
    ico.writeUInt8(0,  base + 2); // color count
    ico.writeUInt8(0,  base + 3); // reserved
    ico.writeUInt16LE(1,  base + 4); // planes
    ico.writeUInt16LE(32, base + 6); // bit count
    ico.writeUInt32LE(buf.length,  base + 8);  // size of image data
    ico.writeUInt32LE(imgOffset,   base + 12); // offset from start of file
    buf.copy(ico, imgOffset);
  }

  return ico;
}

async function main() {
  console.log('Source:', SRC);
  if (!fs.existsSync(SRC)) {
    console.error('ERROR: logo.jpeg not found at', SRC);
    process.exit(1);
  }

  // 1. favicon.ico (16, 32, 48) — BMP DIB format required by Next.js ICO decoder
  const [raw16, raw32, raw48] = await Promise.all([resizeRaw(16), resizeRaw(32), resizeRaw(48)]);
  const dibs = [
    buildBmpDib(raw16.data, raw16.width, raw16.height),
    buildBmpDib(raw32.data, raw32.width, raw32.height),
    buildBmpDib(raw48.data, raw48.width, raw48.height),
  ];
  const ico = buildIco(dibs, [16, 32, 48]);
  const faviconDest = path.join(ROOT, 'app', 'favicon.ico');
  fs.writeFileSync(faviconDest, ico);
  console.log('  app/favicon.ico written', ico.length, 'bytes');

  // 2. app/icon.png (192x192) — Next.js `icon` convention
  const p192 = await resizePng(192);
  const iconDest = path.join(ROOT, 'app', 'icon.png');
  fs.writeFileSync(iconDest, p192);
  console.log('  app/icon.png written', p192.length, 'bytes');

  // 3. app/apple-icon.png (180x180) — Next.js `apple-icon` convention
  const p180 = await resizePng(180);
  const appleIconDest = path.join(ROOT, 'app', 'apple-icon.png');
  fs.writeFileSync(appleIconDest, p180);
  console.log('  app/apple-icon.png written', p180.length, 'bytes');

  // 4. public/icon-512.png (future PWA manifest)
  const p512 = await resizePng(512);
  const pwa512 = path.join(ROOT, 'public', 'icon-512.png');
  fs.writeFileSync(pwa512, p512);
  console.log('  public/icon-512.png written', p512.length, 'bytes');

  console.log('\nAll done!');
}

main().catch(err => { console.error(err); process.exit(1); });
