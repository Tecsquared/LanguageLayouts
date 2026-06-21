// Brand colours (see BRAND.md)
const TERRA = '#B85C38';      // Free / primary
const MFI_GREEN = '#5A7F6E';  // Meaning-Focused Input + Learner tags
const MFO_PURPLE = '#7A6BA0'; // Meaning-Focused Output + All tags
const LFL_GOLD = '#C49A3C';   // Language-Focused Learning + Paid tags
const FD_BLUE = '#6B8DB5';    // Fluency Development + Teacher tags
const DRIFTWOOD = '#A09889';  // Coming Soon

export const strands = [
  {
    id: 'input',
    name: 'Meaning-Focused Input',
    color: MFI_GREEN,
    description: 'You learn by listening to and reading things you can mostly understand, focusing on the message rather than the language itself.',
  },
  {
    id: 'output',
    name: 'Meaning-Focused Output',
    color: MFO_PURPLE,
    description: 'You grow by speaking and writing to communicate real ideas, not just practising set phrases or filling in blanks.',
  },
  {
    id: 'language',
    name: 'Language-Focused Learning',
    color: LFL_GOLD,
    description: 'You study the building blocks directly — grammar, vocabulary, pronunciation — so you can notice and use them everywhere else.',
  },
  {
    id: 'fluency',
    name: 'Fluency Development',
    color: FD_BLUE,
    description: 'You get faster and smoother with what you already know, turning hesitant knowledge into natural, automatic use.',
  },
];

export const templates = [
  {
    name: 'Language Learning Planner',
    description: 'Plan and track balanced study across all four strands so you always know what to work on next.',
    tags: [
      { text: 'Learner', color: MFI_GREEN },
      { text: 'Free', color: TERRA },
    ],
    image: 'language-learning-planner.png',
    link: 'https://www.notion.com/templates/language-learning-planner-205',
    price: '0',
  },
  {
    name: 'Lesson Planner',
    description: 'Plan four-strand lessons that balance input, output, language focus, and fluency in every class.',
    tags: [
      { text: 'Teacher', color: FD_BLUE },
      { text: 'Free', color: TERRA },
    ],
    image: 'lesson-planner.png',
    link: 'https://www.notion.com/templates/language-layouts-lesson-planner-basic',
    price: '0',
  },
  {
    name: 'Vocab Tracker',
    description: 'Build conversational confidence through word cards, spaced repetition, and context-rich vocabulary learning.',
    tags: [
      { text: 'Learner', color: MFI_GREEN },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'vocab-builder.png',
    link: 'https://www.notion.com/templates/language-layouts-vocabulary',
    price: '10',
  },
  {
    name: 'Language Learning Plus',
    description: 'Everything in the free planner plus vocab recording, language learning resources, and goal setting tools.',
    tags: [
      { text: 'Learner', color: MFI_GREEN },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'language-learner-plus.jpeg',
    link: 'https://www.notion.com/templates/language-layouts-language-learning-plus',
    price: '29',
  },
  {
    name: 'Lesson Planner Plus',
    description: 'A complete teaching workspace for planning, tracking student progress, managing homework, and task management.',
    tags: [
      { text: 'Teacher', color: FD_BLUE },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'lesson-planner-plus.jpeg',
    link: 'https://www.notion.com/templates/language-layouts-lesson-planner-plus',
    price: '10',
  },
  {
    name: 'The Online Language Teacher',
    description: 'The total online language tutor solution.',
    tags: [
      { text: 'Teacher', color: FD_BLUE },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'online-language-teacher.png',
    link: 'https://www.notion.com/templates/the-online-language-teacher-language-layouts',
    price: '49',
  },
];

export const archivedTemplates = [
  {
    name: 'Action Research',
    description: 'Track what works in your classroom with a simple framework for observing, reflecting, and improving.',
    tags: [
      { text: 'Teacher', color: FD_BLUE },
      { text: 'Free', color: TERRA },
      { text: 'Coming Soon', color: DRIFTWOOD },
    ],
    image: 'action-research.png',
  },
  {
    name: 'Memory',
    description: 'Learn memory techniques and how they apply to language learning.',
    tags: [
      { text: 'Learner', color: MFI_GREEN },
      { text: 'Paid', color: LFL_GOLD },
      { text: 'Coming Soon', color: DRIFTWOOD },
    ],
    image: 'memory.png',
  },
  {
    name: 'Language Agent Personalisation',
    description: 'Customise your AI instructions to support your teaching style and your students’ needs.',
    tags: [
      { text: 'Teacher', color: FD_BLUE },
      { text: 'Paid', color: LFL_GOLD },
      { text: 'Coming Soon', color: DRIFTWOOD },
    ],
    image: 'language-agent-personalisation.png',
  },
  {
    name: 'AI Language Learner',
    description: 'A personal AI language space that uses the latest in AI to boost your language skills.',
    tags: [
      { text: 'Learner', color: MFI_GREEN },
      { text: 'Paid', color: LFL_GOLD },
      { text: 'Coming Soon', color: DRIFTWOOD },
    ],
    image: 'ai-language-learner.png',
  },
];

export const services = [
  {
    name: 'One-on-One Coaching',
    description: 'Get personalised guidance on using your template, building better teaching habits, or planning your language learning.',
    tags: [
      { text: 'All', color: MFO_PURPLE },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'coaching-illustration.png',
  },
  {
    name: 'Deep Dive Sessions',
    description: 'Focused problem-solving for adapting your template, or customising your Notion setup.',
    tags: [
      { text: 'All', color: MFO_PURPLE },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'deep-dive-illustration.png',
  },
  {
    name: 'Space Transformation',
    description: 'We design and build a complete Notion workspace tailored to how you learn or teach, from scratch or existing setup.',
    tags: [
      { text: 'All', color: MFO_PURPLE },
      { text: 'Paid', color: LFL_GOLD },
    ],
    image: 'space-transformation-illustration.png',
  },
];

export const connectLinks = [
  {
    icon: 'notion',
    title: 'Notion Marketplace',
    subtitle: 'Get the templates',
    href: 'https://www.notion.com/@languagelayouts',
  },
  {
    icon: 'youtube',
    title: 'YouTube',
    subtitle: 'Notion & Language Tutorials',
    href: 'https://www.youtube.com/@damienherlihy',
  },
  {
    icon: 'newsletter',
    title: 'Newsletter',
    subtitle: 'Stay in Touch',
    href: 'https://dis-aster.vercel.app/',
  },
  {
    icon: 'contact',
    title: 'Contact Me',
    subtitle: 'Say Hello!',
    href: 'mailto:damienmherlihy@gmail.com',
  },
];
