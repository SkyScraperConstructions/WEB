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
}

// Dot rail section mapping: 01-06
export const DOT_RAIL_SECTIONS = [
  { num: '01', stateId: 'enter' as const, label: 'Enter' },
  { num: '02', stateId: 'about' as const, label: 'About' },
  { num: '03', stateId: 'services' as const, label: 'Services' },
  { num: '04', stateId: 'projects' as const, label: 'Projects' },
  { num: '05', stateId: 'contact' as const, label: 'Contact' },
  { num: '06', stateId: 'contact' as const, label: 'Contact' },
];

export const SKYSCAPER_CONTENT = {
  brand: {
    name: 'SKYSCAPER',
    tagline: 'BUILDING TOMORROW',
    fullName: 'SKYSCAPER / BUILDING TOMORROW',
    heroDescription:
      'Pioneering hyper-sustainable, ultra-tall architectural engineering. Redefines city skylines through acoustic glass cores, kinetic facades, and zero-carbon structures.',
  },

  floors: {
    contact: {
      id: 'contact',
      floorNumber: 'L70-L72',
      title: 'CONTACT US',
      subtitle: 'Executive Penthouse & Global HQ Enquiries',
    },
    projects: {
      id: 'projects',
      floorNumber: 'L45-L69',
      title: 'PROJECTS',
      subtitle: 'Iconic Skylines Engineered Across 18 Nations',
    },
    services: {
      id: 'services',
      floorNumber: 'L20-L44',
      title: 'SERVICES',
      subtitle: 'End-to-End Architectural & Engineering Excellence',
    },
    about: {
      id: 'about',
      floorNumber: 'L01-L19',
      title: 'ABOUT US',
      subtitle: 'Quarter Century of Structural Innovation',
    },
  } as Record<string, FloorMetadata>,

  about: {
    heading: 'ABOUT US',
    bodyParagraph1:
      'We are a global construction company committed to excellence, innovation, and creating iconic landmarks that define the future of cities.',
    bodyParagraph2:
      'With a legacy of trust and a vision for tomorrow, we build more than structures — we build the future.',
    storyIntro:
      'Founded in 2001, SKYSCAPER has transcended traditional design boundaries to engineer the world\'s most resilient, intelligent, and breathtaking supertall towers. We blend computational aerodynamics, bio-composite materials, and renewable energy grids into monolithic masterworks.',
    fullStory:
      'Every tower we create is a self-sustaining vertical ecosystem. From dampening seismic shockwaves with active liquid tuned mass dampers to capturing cloud condensation for greywater recycling, our engineering pushes human capability forward.',
    stats: [
      { id: 'years', value: 25, suffix: '+', label: 'YEARS\nEXPERIENCE', description: 'Continuous leadership in supertall architecture' },
      { id: 'projects', value: 150, suffix: '+', label: 'PROJECTS\nCOMPLETED', description: 'Delivered across North America, Asia & EMEA' },
      { id: 'nations', value: 18, suffix: '', label: 'COUNTRIES', description: 'Global design studios & engineering hubs' },
      { id: 'satisfaction', value: 98, suffix: '%', label: 'CLIENT\nSATISFACTION', description: 'On-time delivery and structural excellence' },
    ] as StatItem[],
  },

  projects: {
    heading: 'PROJECTS',
    subheading1: 'Explore our iconic projects that shape skylines and inspire generations.',
    subheading2: 'From landmark towers to transformative urban spaces, our work reflects a commitment to excellence, innovation and a better tomorrow.',
    featured: {
      id: 'horizon-tower',
      title: 'Horizon Tower',
      location: 'Dubai, UAE',
      floors: 72,
      height: '828 m',
      yearCompleted: 2023,
      category: 'Commercial & Mixed-Use',
      description:
        'A revolutionary 72-story spire incorporating aerodynamic wind-turbines in its structural crown.',
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
    globalStats: [
      { id: 'projectsDone', value: 150, suffix: '+', label: 'PROJECTS\nCOMPLETED', description: '' },
      { id: 'cities', value: 72, suffix: '', label: 'CITIES\nWORLDWIDE', description: '' },
      { id: 'yearsExcellence', value: 25, suffix: '+', label: 'YEARS OF\nEXCELLENCE', description: '' },
      { id: 'countriesGlobal', value: 18, suffix: '', label: 'COUNTRIES', description: '' },
    ] as StatItem[],
  },

  services: {
    heading: 'SERVICES',
    bodyText: 'End-to-end solutions from concept to creation. We combine innovation, expertise, and technology to deliver spaces that inspire and perform for generations.',
    list: [
      {
        id: 'arch',
        title: 'Architecture',
        iconName: 'Building2',
        shortDesc: 'Iconic designs that define skylines.',
        fullDesc: 'We shape skylines with sculptural geometries optimized for wind dissipation, daylight harvesting, and structural efficiency.',
        capabilities: ['Aerodynamic Wind Tunnel Simulation', 'Parametric Facade Design', 'Skybridge & Atrium Engineering'],
      },
      {
        id: 'eng',
        title: 'Engineering',
        iconName: 'Cpu',
        shortDesc: 'Smart engineering for a stronger future.',
        fullDesc: 'Custom tuned mass dampers, high-strength composite cores, and deep foundation piles engineered for extreme geohazards.',
        capabilities: ['Active Liquid Tuned Mass Dampers', 'Deep Foundation Piling', 'Composite Steel-Core Framing'],
      },
      {
        id: 'const',
        title: 'Construction',
        iconName: 'HardHat',
        shortDesc: 'Precision construction built on trust.',
        fullDesc: 'Deploying autonomous scaffolding, drone inspection arrays, and prefabricated modular floor plates for 40% faster build cycles.',
        capabilities: ['Modular Floor Plate Prefabrication', 'Autonomous Crane Logistics', 'Laser Scanning QC'],
      },
      {
        id: 'pm',
        title: 'Project Management',
        iconName: 'BarChart3',
        shortDesc: 'Seamless planning, on time, every time.',
        fullDesc: 'Full lifecycle supervision ensuring strict safety compliance, budget accuracy, and green building certification.',
        capabilities: ['5D Building Information Modeling (BIM)', 'Real-time Structural Telemetry', 'LEED / WELL Certification'],
      },
      {
        id: 'interior',
        title: 'Interior Design',
        iconName: 'LayoutGrid',
        shortDesc: 'Spaces crafted with purpose and style.',
        fullDesc: 'Transforming indoor spaces into serene, acoustic sanctuaries with living walls, natural sunlight funnels, and luxury finishes.',
        capabilities: ['Acoustic Glass Core Acoustics', 'Biophilic Living Walls', 'Executive Sky-Lounge Craft'],
      },
      {
        id: 'sustain',
        title: 'Sustainability',
        iconName: 'Leaf',
        shortDesc: 'Building a better future responsibly.',
        fullDesc: 'Zero-carbon construction, renewable energy grids, and greywater recycling systems for truly self-sustaining towers.',
        capabilities: ['Zero-Carbon Construction', 'Renewable Energy Integration', 'Greywater Recycling'],
      },
    ] as ServiceItem[],
    stats: [
      { id: 'svcProjects', value: 150, suffix: '+', label: 'PROJECTS\nCOMPLETED', description: '' },
      { id: 'svcClients', value: 18, suffix: 'K+', label: 'HAPPY\nCLIENTS', description: '' },
      { id: 'svcCountries', value: 25, suffix: '+', label: 'COUNTRIES\nWORLDWIDE', description: '' },
      { id: 'svcYears', value: 25, suffix: '+', label: 'YEARS OF\nEXCELLENCE', description: '' },
    ] as StatItem[],
  },

  contact: {
    heading: 'CONTACT US',
    bodyText: "Let's build something extraordinary together. Tell us about your project and our team will get back to you shortly.",
    formOptions: ['Architectural Consultation', 'Structural Engineering Audit', 'Press & Media Inquiry', 'Investor Relations'],
    phone: '+971 4 123 4567',
    email: 'info@skyscaper.com',
    officeLocation: '72nd Floor, Skyscaper Tower\nDubai, UAE',
  },
};
