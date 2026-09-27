// ============================================
// PORTFOLIO DATA – All personal information
// ============================================

export interface Skill {
  name: string;
  description: string;
  icon?: string;
}

export interface Tool {
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  technology: string;
  description: string;
  funnyCaption: string;
  github: string;
}

export interface Interest {
  name: string;
  funnyCaption: string;
}

export const personalInfo = {
  name: 'Suhaan Avish Kumar',
  firstName: 'Suhaan',
  role: 'AI & Data Science Student',
  college: 'REVA University',
  location: 'Bengaluru, Karnataka, India',
  email: 'suhaanavish08@gmail.com',
  phone: '7019533207',
  github: 'https://github.com/suhaanavish08-lgtm',
  linkedin: 'https://www.linkedin.com/in/suhaan-avish-969181389/',
} as const;

export const aboutText = `Suhaan Avish Kumar is a student at REVA University, Bengaluru, pursuing AI & Data Science. He is interested in programming, software development, artificial intelligence, data science, and building practical projects.

Currently focused on developing technical skills, working on projects, and gaining experience with programming and software development.`;

export const education = {
  institution: 'REVA University',
  degree: 'Artificial Intelligence & Data Science',
  location: 'Bengaluru, Karnataka, India',
  status: 'Student',
  caption: 'Currently acquiring knowledge. Results may vary.',
} as const;

export const skills: Skill[] = [
  { name: 'Python', description: 'Used frequently enough to cause problems.' },
  { name: 'C', description: 'Pointers were a character-building experience.' },
  { name: 'HTML', description: 'Making rectangles appear on screens.' },
  { name: 'Git & GitHub', description: 'git commit -m \'please work\'' },
  { name: 'Artificial Intelligence', description: 'Teaching machines to think. Results pending.' },
  { name: 'Data Science', description: 'Making sense of data. Occasionally.' },
  { name: 'Web Development', description: 'Pixels, padding, and existential dread.' },
  { name: 'Programming & Problem Solving', description: 'If it works, don\'t touch it.' },
];

export const tools: Tool[] = [
  { name: 'Visual Studio Code', description: 'The IDE that runs everything.' },
  { name: 'Git', description: 'Version control for controlled chaos.' },
  { name: 'GitHub', description: 'Where code goes to be judged.' },
  { name: 'Jupyter Notebook', description: 'Interactive experiments in real time.' },
  { name: 'Anaconda', description: 'Python environment management.' },
  { name: 'DaVinci Resolve', description: 'Video editing beyond the basics.' },
];

export const projects: Project[] = [
  {
    id: 'graphics-editor',
    title: '2D Graphics Editor',
    technology: 'C',
    description: 'A 2D graphics editing project developed using C, focused on creating and working with graphical elements.',
    funnyCaption: 'Yes, I voluntarily used C.',
    github: 'https://github.com/suhaanavish08-lgtm',
  },
  {
    id: 'suhaan-portfolio',
    title: 'Suhaan Portfolio',
    technology: 'HTML',
    description: 'A personal portfolio project created to showcase personal information, skills, and projects.',
    funnyCaption: 'A portfolio about making a portfolio.',
    github: 'https://github.com/suhaanavish08-lgtm',
  },
  {
    id: 'about-me',
    title: 'About-me',
    technology: 'Web',
    description: 'A personal profile project containing information about Suhaan.',
    funnyCaption: 'Very advanced technology: talking about myself.',
    github: 'https://github.com/suhaanavish08-lgtm',
  },
  {
    id: 'rural-edge',
    title: 'RuralEdge',
    technology: 'React',
    description: 'An AI-powered advisory platform for rural entrepreneurs with hyper-local feasibility insights and a smart financial calculator.',
    funnyCaption: 'Turning rural ideas into practical business plans.',
    github: 'https://github.com/shreyassbhat508-cmd/RuralEdge-AI',
  }
];

export const whyHireMe = {
  heading: 'Why should you hire me?',
  subtitle: "Honestly? I'm still figuring that out.",
  cards: [
    'Will probably Google it',
    'Can debug at unreasonable hours',
    'Knows Ctrl+C and Ctrl+V responsibly',
    'Has successfully made computers do things',
    'Will name variables properly... eventually',
  ],
} as const;

export const interests: Interest[] = [
  { name: 'Programming', funnyCaption: 'Turning caffeine into code since recently.' },
  { name: 'Artificial Intelligence', funnyCaption: 'Hoping the machines remember me kindly.' },
  { name: 'Data Science', funnyCaption: 'Finding patterns in the chaos.' },
  { name: 'Software Development', funnyCaption: 'Building things that sometimes work.' },
  { name: 'Web Development', funnyCaption: 'Centering divs is a lifestyle.' },
  { name: 'Exploring Technology', funnyCaption: 'Clicking buttons to see what happens.' },
  { name: 'Gaming', funnyCaption: 'Researching frame rates scientifically.' },
  { name: 'Video Editing', funnyCaption: 'Turning hours of footage into 12 seconds.' },
  { name: 'Building Personal Projects', funnyCaption: 'Starting projects > finishing projects.' },
];

export const languages = ['English', 'Hindi'] as const;

export const systemStatus = [
  { name: 'Brain.exe', status: 'ONLINE' as const },
  { name: 'Python.exe', status: 'ONLINE' as const },
  { name: 'Sleep.exe', status: 'ERROR' as const },
  { name: 'Motivation.exe', status: 'ONLINE' as const },
  { name: 'Bugs.exe', status: 'TOO MANY' as const },
];

export const bootSequenceLines = [
  'INITIALIZING SUHAAN.EXE',
  'Loading Python...',
  'Loading C...',
  'Loading HTML...',
  'Loading questionable decisions...',
  'Compiling portfolio...',
  '',
  'STATUS: SOMEHOW WORKING',
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  whoami     - Who is this person?
  skills     - List technical skills
  projects   - View projects
  contact    - Contact information
  coffee     - Essential resource check
  clear      - Clear terminal
  sudo       - Try it and see`,
  whoami: 'suhaan',
  skills: `python / c / html / git
ai / data science / web dev
problem solving / caffeine consumption`,
  projects: `[1] 2D Graphics Editor  →  C
[2] Suhaan Portfolio    →  HTML
[3] About-me            →  Web

Type a project number... just kidding, this terminal can't do that yet.`,
  contact: `Email:    suhaanavish08@gmail.com
Phone:    7019533207
GitHub:   github.com/suhaanavish08-lgtm
LinkedIn: linkedin.com/in/suhaan-avish-969181389`,
  coffee: '☕ REQUIRED. CRITICALLY LOW. SEND HELP.',
  clear: '__CLEAR__',
  'sudo become_successful': 'Permission denied.',
  'sudo rm -rf /': 'Nice try.',
  'rm -rf /': 'Absolutely not.',
  sudo: 'Permission denied. Also, what were you planning?',
  ls: 'portfolio/  skills/  projects/  memes/  .secrets/',
  pwd: '/home/suhaan/portfolio',
  date: new Date().toLocaleString(),
  echo: 'echo echo echo...',
  vim: 'How do I exit this?',
  exit: 'There is no escape.',
  hello: 'Hey there! 👋',
  hi: 'Hello, human! 👋',
};
