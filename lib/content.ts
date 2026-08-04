export interface BlueprintSpec {
  label: string;
  value: string;
  x: number;
  y: number;
  align: 'left' | 'right';
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  floors: number;
  height: string;
  yearCompleted: number;
  category: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
}

export interface FloorMetadata {
  id: 'about' | 'projects' | 'services' | 'contact';
  floorNumber: string;
  title: string;
  subtitle: string;
  bandColor: string;
  glowColor: string;
}

export const SKYSCAPER_CONTENT = {
  brand: {
    name: 'SKYSCAPER',
    tagline: 'BUILDING TOMORROW',
    fullName: 'SKYSCAPER / BUILDING TOMORROW',
    heroDescription:
      'Pioneering hyper-sustainable, ultra-tall architectural engineering. Redefines city skylines through acoustic glass cores, kinetic facades, and zero-carbon structures.',
  },

  blueprintSpecs: [
    { label: 'HEIGHT', value: '420.0 m', x: 75, y: 180, align: 'left' },
    { label: 'FLOORS', value: '72 Floors', x: 75, y: 340, align: 'left' },
    { label: 'CORE SYSTEM', value: 'Acoustic Glass Core', x: 325, y: 220, align: 'right' },
    { label: 'FOUNDATION', value: '65m Deep Piles', x: 325, y: 460, align: 'right' },
    { label: 'FACADE', value: 'Kinetic Solar Louvers', x: 75, y: 520, align: 'left' },
  ] as BlueprintSpec[],

  floors: {
    contact: {
      id: 'contact',
      floorNumber: 'L70-L72',
      title: 'CONTACT US',
      subtitle: 'Executive Penthouse & Global HQ Enquiries',
      bandColor: 'from-amber-500/40 to-yellow-500/20',
      glowColor: '#ffb830',
    },
    projects: {
      id: 'projects',
      floorNumber: 'L45-L69',
      title: 'PROJECTS',
      subtitle: 'Iconic Skylines Engineered Across 18 Nations',
      bandColor: 'from-cyan-500/40 to-blue-500/20',
      glowColor: '#00f0ff',
    },
    services: {
      id: 'services',
      floorNumber: 'L20-L44',
      title: 'SERVICES',
      subtitle: 'End-to-End Architectural & Engineering Excellence',
      bandColor: 'from-sky-500/40 to-indigo-500/20',
      glowColor: '#4a9eff',
    },
    about: {
      id: 'about',
      floorNumber: 'L01-L19',
      title: 'ABOUT US',
      subtitle: 'Quarter Century of Structural Innovation',
      bandColor: 'from-blue-600/40 to-cyan-400/20',
      glowColor: '#38bdf8',
    },
  } as Record<string, FloorMetadata>,

  about: {
    heading: 'Architects of the Next Century',
    storyIntro:
      'Founded in 2001, SKYSCAPER has transcended traditional design boundaries to engineer the world’s most resilient, intelligent, and breathtaking supertall towers. We blend computational aerodynamics, bio-composite materials, and renewable energy grids into monolithic masterworks.',
    fullStory:
      'Every tower we create is a self-sustaining vertical ecosystem. From dampening seismic shockwaves with active liquid tuned mass dampers to capturing cloud condensation for greywater recycling, our engineering pushes human capability forward.',
    stats: [
      { id: 'years', value: 25, suffix: '+', label: 'Years of Innovation', description: 'Continuous leadership in supertall architecture' },
      { id: 'projects', value: 150, suffix: '+', label: 'Global Projects', description: 'Delivered across North America, Asia & EMEA' },
      { id: 'nations', value: 18, suffix: '', label: 'Countries Active', description: 'Global design studios & engineering hubs' },
      { id: 'satisfaction', value: 98, suffix: '%', label: 'Satisfaction', description: 'On-time delivery and structural excellence' },
    ] as StatItem[],
  },

  projects: {
    heading: 'Landmarks That Define Horizon Skylines',
    subheading: 'Select architectural monuments designed and built by the SKYSCAPER engineering group.',
    featured: {
      id: 'horizon-tower',
      title: 'Horizon Tower',
      location: 'Dubai UAE',
      floors: 72,
      height: '420.0 m',
      yearCompleted: 2023,
      category: 'Commercial & Mixed-Use',
      description:
        'A revolutionary 72-story spire incorporating aerodynamic wind-turbines in its structural crown, reducing drag by 34% while generating 1.2 MW of clean power annually.',
      tags: ['Zero-Carbon', 'Kinetic Facade', 'Active Damper', 'LEED Platinum'],
      metrics: [
        { label: 'Wind Resistance', value: 'Category 5 Ready' },
        { label: 'Energy Offset', value: '42% On-Site Solar' },
        { label: 'Glass Efficiency', value: 'Triple Low-E Acoustic' },
      ],
    } as ProjectItem,
    portfolio: [
      {
        id: 'apex-plaza',
        title: 'Apex Financial Spire',
        location: 'London, UK',
        floors: 58,
        height: '345.5 m',
        yearCompleted: 2024,
        category: 'Financial HQ',
        description: 'Glass-clad hyper-structure featuring a 12-story indoor vertical rain-forest atrium.',
        tags: ['Biophilic', 'Smart Core'],
        metrics: [{ label: 'Structural Steel', value: '92% Recycled' }],
      },
      {
        id: 'lumina-heights',
        title: 'Lumina Innovation Hub',
        location: 'Tokyo, Japan',
        floors: 64,
        height: '388.0 m',
        yearCompleted: 2022,
        category: 'Tech Campus',
        description: 'Seismic-isolated super structure equipped with magnetic levitation dampers.',
        tags: ['MagLev Damper', 'AI Climate'],
        metrics: [{ label: 'Seismic Rating', value: 'Magnitude 9.0+' }],
      },
    ] as ProjectItem[],
  },

  services: {
    heading: 'Core Architecture & Engineering Matrix',
    subheading: 'Comprehensive architectural solutions from parametric blueprint modeling to turnkey construction management.',
    list: [
      {
        id: 'arch',
        title: 'Architecture',
        iconName: 'Building2',
        shortDesc: 'Parametric modeling & iconic aerodynamic facade sculpting.',
        fullDesc: 'We shape skylines with sculptural geometries optimized for wind dissipation, daylight harvesting, and structural efficiency.',
        capabilities: ['Aerodynamic Wind Tunnel Simulation', 'Parametric Facade Design', 'Skybridge & Atrium Engineering'],
      },
      {
        id: 'eng',
        title: 'Engineering',
        iconName: 'Cpu',
        shortDesc: 'Ultra-high strength concrete cores & kinetic dampening systems.',
        fullDesc: 'Custom tuned mass dampers, high-strength composite cores, and deep foundation piles engineered for extreme geohazards.',
        capabilities: ['Active Liquid Tuned Mass Dampers', 'Deep Foundation Piling', 'Composite Steel-Core Framing'],
      },
      {
        id: 'const',
        title: 'Construction',
        iconName: 'HardHat',
        shortDesc: 'Robotic assembly, modular crane systems & smart site logistics.',
        fullDesc: 'Deploying autonomous scaffolding, drone inspection arrays, and prefabricated modular floor plates for 40% faster build cycles.',
        capabilities: ['Modular Floor Plate Prefabrication', 'Autonomous Crane Logistics', 'Laser Scanning QC'],
      },
      {
        id: 'pm',
        title: 'Project Management',
        iconName: 'BarChart3',
        shortDesc: 'BIM 5D integration, real-time telemetry & supply chain execution.',
        fullDesc: 'Full lifecycle supervision ensuring strict safety compliance, budget accuracy, and green building certification.',
        capabilities: ['5D Building Information Modeling (BIM)', 'Real-time Structural Telemetry', 'LEED / WELL Certification'],
      },
      {
        id: 'interior',
        title: 'Interior Design',
        iconName: 'LayoutGrid',
        shortDesc: 'Biophilic executive suites, sky lobbies & acoustic glass cores.',
        fullDesc: 'Transforming indoor spaces into serene, acoustic sanctuaries with living walls, natural sunlight funnels, and luxury finishes.',
        capabilities: ['Acoustic Glass Core Acoustics', 'Biophilic Living Walls', 'Executive Sky-Lounge Craft'],
      },
    ] as ServiceItem[],
  },

  contact: {
    heading: 'Initiate a Supertall Vision',
    subheading: 'Speak directly with our principal structural engineering leadership and master architects.',
    officeLocation: 'SKYSCAPER HQ — Floor 72, 100 Skyline Blvd, New York, NY 10001',
    phone: '+1 (800) 555-TOWER',
    email: 'inquiries@skyscaper-architects.com',
    formOptions: ['Architectural Consultation', 'Structural Engineering Audit', 'Press & Media Inquiry', 'Investor Relations'],
  },
};
