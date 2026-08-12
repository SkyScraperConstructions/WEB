import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple email regex for server-side validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload in request.' },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, message } = body || {};

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Contact API] RESEND_API_KEY environment variable is missing.');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: Missing Resend API key.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const formattedName = name.trim();
    const formattedEmail = email.trim();
    const formattedCompany = company && typeof company === 'string' && company.trim() ? company.trim() : 'Not provided';
    const formattedProjectType = projectType && typeof projectType === 'string' && projectType.trim() ? projectType.trim() : 'Not provided';
    const formattedMessage = message.trim();

    const textContent = `New Contact Form Submission — Skyscraper Constructions\n\n` +
      `Name: ${formattedName}\n` +
      `Email: ${formattedEmail}\n` +
      `Company: ${formattedCompany}\n` +
      `Project Type: ${formattedProjectType}\n\n` +
      `Message:\n${formattedMessage}\n`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #c9a84c; border-bottom: 2px solid #c9a84c; padding-bottom: 8px;">
          New Contact Form Submission — Skyscraper Constructions
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 140px; border-bottom: 1px solid #eee;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${formattedEmail}" style="color: #c9a84c;">${formattedEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Project Type:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedProjectType}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f9f9f9; border-left: 4px solid #c9a84c; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #555;">Message:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${formattedMessage}</p>
        </div>
      </div>
    `;

    const sendResult = await resend.emails.send({
      from: 'Skyscraper Website <onboarding@resend.dev>',
      to: 'info.skyscraperconstructions@gmail.com',
      replyTo: formattedEmail,
      subject: 'New Contact Form Submission — Skyscraper Constructions',
      text: textContent,
      html: htmlContent,
    });

    if (sendResult.error) {
      console.error('[Contact API] Resend email send error:', sendResult.error);
      return NextResponse.json(
        { success: false, error: sendResult.error.message || 'Failed to send email notification.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    console.error('[Contact API] Internal Server Error:', error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
