// ─── Types ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
}

export interface ExperienceProject {
  name: string;
  bullets: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tags: string[];
  category: "edge-ai" | "ml" | "backend" | "automation";
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface LeadershipRole {
  id: string;
  title: string;
  organization: string;
  bullets: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  focus?: string;
}

// ─── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Aditya Kinikar",
  headline: "Software Developer & ECE Student",
  tagline: "Building at the intersection of backend systems, machine learning, and embedded intelligence.",
  location: "Navi Mumbai, India",
  email: "adityakinikar14@gmail.com",
  resumePath: "/resume.pdf",
} as const;

// ─── Social Links ────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-kinikar-0624412b3",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/notkini",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:adityakinikar14@gmail.com",
    icon: "mail",
  },
];

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Leadership", href: "#leadership" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    degree: "B.Tech in Electronics and Computer Science",
    institution: "SIES Graduate School of Technology, Navi Mumbai",
    period: "Aug 2023 – Present",
    score: "CGPA: 8.60 / 10",
    focus: "Databases, Data Processing, Machine Learning, Embedded Systems",
  },
  {
    degree: "Higher Secondary Certificate (12th)",
    institution: "St. Mary's Multipurpose High School, Vashi",
    period: "",
    score: "81.83%",
  },
  {
    degree: "Secondary School Certificate (10th)",
    institution: "St. Mary's Multipurpose High School, Vashi",
    period: "",
    score: "92%",
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "siemens",
    role: "Software Developer Intern",
    company: "Siemens Ltd.",
    location: "Kalwa",
    period: "June 2026 – July 2026",
    projects: [
      {
        name: "Industrial Machine Monitoring",
        bullets: [
          "Developed a machine monitoring backend to collect, process, and expose production data for vendors using Python, Flask, PostgreSQL, and Docker.",
          "Designed a PostgreSQL database schema and developed REST APIs to support machine monitoring data and dashboard workflows.",
          "Containerized the application using Docker to provide a consistent development and deployment environment for internal demonstrations.",
        ],
        tags: ["Python", "Flask", "PostgreSQL", "Docker", "REST APIs"],
      },
      {
        name: "Manufacturing Test Automation",
        bullets: [
          "Collaborated with production teams to understand testing and BOM management requirements and implemented process automation using VBA and VBScript.",
          "Integrated SQL Server with Excel automation for data validation, storage, and reporting across manufacturing workflows.",
          "Automated manufacturing processes using WinCC and TIA Portal, reducing manual effort and improving data consistency.",
        ],
        tags: ["VBA", "VBScript", "SQL Server", "WinCC", "TIA Portal"],
      },
    ],
  },
  {
    id: "dronaviation",
    role: "Technical Intern",
    company: "DronAviation",
    location: "IEEE GRSS, SIES GST",
    period: "",
    projects: [
      {
        name: "Capture the Flag — Drone Game",
        bullets: [
          "Led a team of 4 students in developing an interactive Capture the Flag game using Pluto drones, Arduino, and IR sensors.",
          "Designed and integrated sensor-based interactions to enable real-time game events and drone-to-drone gameplay.",
        ],
        tags: ["Arduino", "IR Sensors", "Pluto Drones", "Embedded Systems"],
      },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "aerovision",
    title: "AeroVision",
    subtitle: "Edge AI · Embedded Systems",
    description:
      "An AI-powered aerial traffic monitoring system integrating a PX4-based UAV, Raspberry Pi, camera, and Coral Edge TPU for real-time edge-based traffic analysis.",
    details: [
      "Deployed TensorFlow Lite models with Coral TPU acceleration for helmet, rider, vehicle, and number-plate detection.",
      "Enabled onboard traffic violation detection and alerts at the edge.",
      "Built a Flask dashboard with live video streaming, REST APIs, telemetry visualization, and remote interaction with the onboard Raspberry Pi AI system.",
    ],
    tags: [
      "TensorFlow Lite",
      "Coral Edge TPU",
      "Raspberry Pi",
      "PX4 UAV",
      "Flask",
      "REST APIs",
      "OpenCV",
    ],
    category: "edge-ai",
    accentColor: "#6366f1",
  },
  {
    id: "facetruth",
    title: "FaceTruth",
    subtitle: "Machine Learning · Computer Vision",
    description:
      "A deepfake detection application built with Flask, PyTorch, and the MesoNet architecture for real-time image analysis.",
    details: [
      "Developed a Flask application integrating PyTorch and MesoNet for deepfake detection via ML model inference.",
      "Built an interface for image upload and real-time inference, enabling users to interact with the trained detection model.",
      "Integrated the trained model into an end-to-end pipeline from input processing and inference to result presentation.",
    ],
    tags: ["PyTorch", "MesoNet", "Flask", "OpenCV", "Python"],
    category: "ml",
    accentColor: "#8b5cf6",
  },
  {
    id: "machine-monitoring",
    title: "Industrial Machine Monitoring",
    subtitle: "Backend · Industrial Systems",
    description:
      "A backend application for collecting, processing, and exposing production data for machine monitoring workflows at Siemens.",
    details: [
      "Developed REST APIs and a PostgreSQL database schema to support production data collection and dashboard workflows.",
      "Containerized the application using Docker for consistent development and deployment.",
      "Designed for internal vendor demonstrations and production data visibility.",
    ],
    tags: ["Python", "Flask", "PostgreSQL", "Docker", "REST APIs"],
    category: "backend",
    accentColor: "#3b82f6",
  },
  {
    id: "test-automation",
    title: "Manufacturing Test Automation",
    subtitle: "Industrial Automation · Data Processing",
    description:
      "Automation of manufacturing testing and BOM-related workflows at Siemens, integrating databases with process control systems.",
    details: [
      "Automated testing and BOM management processes using VBA, VBScript, and Excel automation.",
      "Integrated SQL Server for data validation, storage, and reporting across manufacturing workflows.",
      "Used WinCC and TIA Portal to automate manufacturing processes and improve data consistency.",
    ],
    tags: ["VBA", "VBScript", "SQL Server", "WinCC", "TIA Portal", "Excel"],
    category: "automation",
    accentColor: "#0ea5e9",
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "VBA", "VBScript"],
  },
  {
    title: "Frameworks & APIs",
    skills: ["Flask", "FastAPI", "REST APIs", "Streamlit"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "SQL Server", "SQLite"],
  },
  {
    title: "Libraries & ML",
    skills: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "SQLAlchemy",
      "PyTorch",
      "TensorFlow Lite",
      "OpenCV",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "Docker",
      "Linux",
      "Google Earth Engine",
      "WinCC",
      "TIA Portal",
      "Postman",
    ],
  },
  {
    title: "Shell & CLI",
    skills: ["Bash", "Windows Command Prompt", "PowerShell"],
  },
  {
    title: "Core Concepts",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Embedded Systems",
      "Machine Learning",
      "Business Intelligence",
    ],
  },
];

// ─── Leadership ──────────────────────────────────────────────────────────────

export const leadershipRoles: LeadershipRole[] = [
  {
    id: "iei",
    title: "Founding Council Member & Technical Advisor",
    organization: "IEI, SIES GST",
    bullets: [
      "Contributed to establishing and supporting technical initiatives for the IEI student body at SIES GST.",
      "Supported technical workshops, events, and knowledge-sharing activities while collaborating with students and faculty.",
    ],
  },
  {
    id: "ieee-grss",
    title: "Technical Advisor (2026–2027)",
    organization: "IEEE GRSS, SIES GST",
    bullets: [
      "Serving as Technical Advisor, supporting technical initiatives, workshops, and knowledge-sharing activities.",
      "Conducted a hands-on Google Earth Engine workshop for 30+ students on satellite-based geospatial analysis using Landsat imagery.",
      "Demonstrated image preprocessing, cloud masking, NDVI and NDBI analysis, and change detection to study vegetation loss and built-up expansion.",
    ],
  },
];

// ─── Achievements ────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    id: "cognition",
    title: "Second Prize",
    event: "Cognition Tech Fest, SIES GST",
  },
  {
    id: "microsoft",
    title: "Finalist",
    event: "Microsoft Student Chapter ML Competition, PCCOE Pune",
  },
  {
    id: "techmania",
    title: "Finalist",
    event: "Father Agnel's Tech Mania",
  },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const aboutText = [
  "I'm a B.Tech student in Electronics and Computer Science at SIES Graduate School of Technology, Navi Mumbai, with a focus on building practical software systems that bridge the gap between data, hardware, and intelligent automation.",
  "My work spans backend development with Python, Flask, and PostgreSQL; machine learning with PyTorch and TensorFlow Lite; and embedded systems integrating microcontrollers, sensors, and edge AI accelerators. At Siemens, I built production monitoring backends and automated manufacturing workflows. Independently, I've developed edge-AI systems for aerial traffic monitoring and deepfake detection applications.",
  "I'm particularly interested in systems where software meets the physical world — industrial automation, robotics, edge computing, and data-driven decision-making. I enjoy working across the stack, from database schema design to deploying ML models on embedded hardware.",
];

// ─── Hero Section Interests ──────────────────────────────────────────────────

export const interests = [
  "Backend Development & Databases",
  "Machine Learning & AI",
  "Embedded Systems & Edge AI",
  "Industrial Automation",
];
