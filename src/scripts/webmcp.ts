import { templates } from '../data/templates';

type ToolInput = Record<string, unknown>;

type ModelContext = {
  registerTool: (tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations: { readOnlyHint: true };
    execute: (input: ToolInput) => Promise<unknown> | unknown;
  }) => Promise<void>;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }

  interface Window {
    languageLayoutsWebMcpRegistered?: boolean;
  }
}

type Audience = 'learner' | 'teacher';
type Need = 'planning' | 'vocabulary' | 'all-in-one';
type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

const catalogue = templates
  .filter((template) => template.link)
  .map((template) => ({
    name: template.name,
    description: template.description,
    audience: template.audience as Audience,
    needs: template.needs as Need[],
    priceUsd: Number(template.price ?? 0),
    isFree: Number(template.price ?? 0) === 0,
    url: template.link,
  }));

function findTemplates(input: ToolInput) {
  const audience = String(input.audience ?? 'any');
  const need = String(input.need ?? 'any');
  const maxPrice = Number(input.max_price);

  const matches = catalogue
    .filter((template) => audience === 'any' || template.audience === audience)
    .filter((template) => need === 'any' || template.needs.includes(need as Need))
    .filter((template) => template.priceUsd <= maxPrice)
    .sort((a, b) => a.priceUsd - b.priceUsd)
    .map((template) => ({
      ...template,
      whyMatched: [
        audience === 'any' ? null : `Made for a ${audience}`,
        need === 'any' ? null : `Supports ${need}`,
        template.isFree ? 'Free' : `$${template.priceUsd} is within the stated budget`,
      ].filter(Boolean),
    }));

  return {
    matches,
    matchCount: matches.length,
    currency: 'USD',
    source: 'Language Layouts public template catalogue',
    verification: 'Check the linked Notion Marketplace page before purchasing; prices and availability can change.',
  };
}

function compareTemplates(input: ToolInput) {
  const requestedNames = Array.isArray(input.template_names)
    ? input.template_names.map(String)
    : [];
  const normalizedNames = new Set(requestedNames.map((name) => name.trim().toLowerCase()));
  const found = catalogue.filter((template) => normalizedNames.has(template.name.toLowerCase()));
  const foundNames = new Set(found.map((template) => template.name.toLowerCase()));
  const unknownNames = requestedNames.filter((name) => !foundNames.has(name.trim().toLowerCase()));

  return {
    templates: found,
    unknownNames,
    comparison: found.length > 0
      ? {
          lowestPriceUsd: Math.min(...found.map((template) => template.priceUsd)),
          freeOptions: found.filter((template) => template.isFree).map((template) => template.name),
          audiences: [...new Set(found.map((template) => template.audience))],
          coveredNeeds: [...new Set(found.flatMap((template) => template.needs))],
        }
      : null,
    currency: 'USD',
    source: 'Language Layouts public template catalogue',
    verification: 'The tool compares public catalogue facts only and does not purchase or duplicate a template.',
  };
}

function buildLessonPlan(input: ToolInput) {
  const level = String(input.level ?? 'B1') as LanguageLevel;
  const lessonMinutes = Math.min(180, Math.max(30, Math.round(Number(input.lesson_minutes) || 60)));
  const studentCount = Math.min(60, Math.max(1, Math.round(Number(input.student_count) || 1)));
  const topic = String(input.topic ?? 'Everyday communication').trim();
  const learningGoal = String(input.learning_goal ?? 'Communicate confidently about the topic').trim();

  const baseMinutes = Math.floor(lessonMinutes / 4);
  const remainder = lessonMinutes - (baseMinutes * 4);
  const strandMinutes = [baseMinutes, baseMinutes, baseMinutes, baseMinutes];
  for (let index = 0; index < remainder; index += 1) strandMinutes[index] += 1;

  const groupFormat = studentCount === 1
    ? 'teacher–student exchange'
    : studentCount <= 4
      ? 'pairs, then whole-group feedback'
      : 'pairs or groups of three, rotating partners once';

  const lessonPlanner = catalogue.find((template) => template.name === 'Lesson Planner');

  return {
    title: `${level} ${topic} lesson`,
    summary: `${lessonMinutes}-minute lesson for ${studentCount} ${studentCount === 1 ? 'student' : 'students'}, designed around the Four Strands.`,
    learningGoal,
    stages: [
      {
        strand: 'Meaning-Focused Input',
        minutes: strandMinutes[0],
        purpose: 'Understand useful ideas and examples before producing language.',
        activity: `Use a short, level-appropriate text, audio, or teacher story about ${topic}. Students identify the main message and two useful details without analysing grammar yet.`,
        evidenceOfLearning: 'Students can explain the main message in their own words.',
      },
      {
        strand: 'Language-Focused Learning',
        minutes: strandMinutes[1],
        purpose: 'Notice and practise language needed for the learning goal.',
        activity: `Select 5–8 words, phrases, or sentence patterns from the input that help students ${learningGoal.toLowerCase()}. Clarify meaning, form, and pronunciation, then run a short controlled practice.`,
        evidenceOfLearning: 'Students accurately use the target language in brief examples.',
      },
      {
        strand: 'Meaning-Focused Output',
        minutes: strandMinutes[2],
        purpose: 'Use language to communicate a real message.',
        activity: `Students complete a ${groupFormat} task about ${topic}. Give each speaker a purpose, a choice to make, or information the other person needs.`,
        evidenceOfLearning: `Students communicate enough information to achieve this goal: ${learningGoal}.`,
      },
      {
        strand: 'Fluency Development',
        minutes: strandMinutes[3],
        purpose: 'Use familiar language more smoothly and confidently.',
        activity: 'Repeat or slightly vary the output task with less preparation and a new partner or time limit. Do not introduce new language during this stage.',
        evidenceOfLearning: 'Students complete the task more smoothly, with fewer pauses or less support.',
      },
    ],
    teacherPreparation: [
      `Choose or create one short ${level}-appropriate input about ${topic}.`,
      'Select only the language students need for the stated goal.',
      'Prepare clear task instructions and an observable success condition.',
    ],
    teacherNote: 'The Four Strands are normally balanced across a course, not necessarily in every individual lesson. This draft uses equal time so the balance is easy to inspect and adapt.',
    recommendedTemplate: lessonPlanner
      ? {
          name: lessonPlanner.name,
          priceUsd: lessonPlanner.priceUsd,
          isFree: lessonPlanner.isFree,
          url: lessonPlanner.url,
          why: 'Use it to save, adapt, and teach this Four Strands lesson plan.',
        }
      : null,
    limitations: 'This is a planning draft. The teacher should adapt the content, input difficulty, accessibility, safeguarding, and assessment to the actual learners.',
  };
}

function buildStudyPlan(input: ToolInput) {
  const level = String(input.level ?? 'B1') as LanguageLevel;
  const targetLanguage = String(input.target_language ?? 'the target language').trim();
  const weeklyMinutes = Math.min(840, Math.max(60, Math.round(Number(input.weekly_minutes) || 120)));
  const daysPerWeek = Math.min(7, Math.max(2, Math.round(Number(input.days_per_week) || 4)));
  const goal = String(input.goal ?? 'communicate more confidently').trim();

  const baseMinutes = Math.floor(weeklyMinutes / 4);
  const remainder = weeklyMinutes - (baseMinutes * 4);
  const strandMinutes = [baseMinutes, baseMinutes, baseMinutes, baseMinutes];
  for (let index = 0; index < remainder; index += 1) strandMinutes[index] += 1;

  const sessionMinutes = Math.round(weeklyMinutes / daysPerWeek);
  const schedulePatterns: Record<number, string[]> = {
    2: ['Input + language focus', 'Output + fluency'],
    3: ['Input + language focus', 'Meaning-focused output', 'Fluency + weekly review'],
    4: ['Meaning-focused input', 'Language-focused learning', 'Meaning-focused output', 'Fluency development'],
    5: ['Meaning-focused input', 'Language-focused learning', 'Meaning-focused output', 'Fluency development', 'Input or output connected to the main goal'],
    6: ['Meaning-focused input', 'Language-focused learning', 'Meaning-focused output', 'Fluency development', 'Additional input', 'Additional output + review'],
    7: ['Meaning-focused input', 'Language-focused learning', 'Meaning-focused output', 'Fluency development', 'Additional input', 'Additional output', 'Light fluency + weekly review'],
  };

  const learningPlanner = catalogue.find((template) => template.name === 'Language Learning Planner');

  return {
    title: `${level} ${targetLanguage} weekly study plan`,
    summary: `${weeklyMinutes} minutes across ${daysPerWeek} days, with roughly ${sessionMinutes} minutes per study day.`,
    goal,
    weeklyStrands: [
      {
        strand: 'Meaning-Focused Input',
        minutes: strandMinutes[0],
        purpose: 'Understand messages that are interesting and mostly comprehensible.',
        suggestedActivities: [
          `Read or listen to ${level}-appropriate material in ${targetLanguage} connected to ${goal}.`,
          'Focus on the message; record only a few genuinely useful unknown items.',
        ],
      },
      {
        strand: 'Language-Focused Learning',
        minutes: strandMinutes[1],
        purpose: 'Deliberately learn language that supports the goal.',
        suggestedActivities: [
          'Review a small set of useful words, phrases, grammar, or pronunciation noticed during input and output.',
          'Practise retrieval with short examples instead of rereading notes only.',
        ],
      },
      {
        strand: 'Meaning-Focused Output',
        minutes: strandMinutes[2],
        purpose: 'Communicate real ideas through speaking or writing.',
        suggestedActivities: [
          `Speak or write in ${targetLanguage} to complete a real task related to ${goal}.`,
          'Use a tutor, partner, community, journal, voice note, or AI conversation where feedback is available.',
        ],
      },
      {
        strand: 'Fluency Development',
        minutes: strandMinutes[3],
        purpose: 'Use familiar language faster, more smoothly, and with less effort.',
        suggestedActivities: [
          'Repeat a familiar reading, listening, speaking, or writing task with a gentle time limit.',
          'Keep the language easy enough that speed and confidence—not new learning—remain the focus.',
        ],
      },
    ],
    exampleSchedule: (schedulePatterns[daysPerWeek] ?? schedulePatterns[4]).map((focus, index) => ({
      day: index + 1,
      focus,
      approximateMinutes: sessionMinutes,
    })),
    weeklyReview: [
      'What became easier or more automatic this week?',
      'Which activity most directly supported the goal?',
      'What should be kept, reduced, or replaced next week?',
    ],
    recommendedTemplate: learningPlanner
      ? {
          name: learningPlanner.name,
          priceUsd: learningPlanner.priceUsd,
          isFree: learningPlanner.isFree,
          url: learningPlanner.url,
          why: 'Use it to schedule and track the four weekly strands without losing sight of the communication goal.',
        }
      : null,
    note: 'The Four Strands are a course-level balance. Adjust individual weeks when real needs require it, then review the balance over time.',
    limitations: 'This is a general study-planning draft. The learner or teacher should adapt difficulty, accessibility, feedback sources, and workload to the actual context.',
  };
}

async function registerLanguageLayoutsTools() {
  if (window.languageLayoutsWebMcpRegistered) return;
  if (typeof document.modelContext?.registerTool !== 'function') return;

  const registrations = await Promise.allSettled([
    document.modelContext.registerTool({
      name: 'language_layouts_find_templates',
      description: 'Find public Language Layouts Notion templates by audience, practical need, and maximum price. Use this to recommend a transparent shortlist; it cannot purchase or duplicate a template.',
      inputSchema: {
        type: 'object',
        properties: {
          audience: {
            type: 'string',
            enum: ['learner', 'teacher', 'any'],
            description: 'Who will use the template.',
          },
          need: {
            type: 'string',
            enum: ['planning', 'vocabulary', 'all-in-one', 'any'],
            description: 'The main job the user wants the template to do.',
          },
          max_price: {
            type: 'number',
            minimum: 0,
            maximum: 49,
            description: 'Maximum budget in US dollars. Use 0 for free templates only.',
          },
        },
        required: ['audience', 'need', 'max_price'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: findTemplates,
    }),
    document.modelContext.registerTool({
      name: 'language_layouts_compare_templates',
      description: 'Compare two or three named Language Layouts templates using public catalogue facts including audience, needs, price, description, and destination URL. It cannot purchase or duplicate a template.',
      inputSchema: {
        type: 'object',
        properties: {
          template_names: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            minItems: 2,
            maxItems: 3,
            uniqueItems: true,
            description: 'Exact template names from the Language Layouts catalogue.',
          },
        },
        required: ['template_names'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: compareTemplates,
    }),
    document.modelContext.registerTool({
      name: 'language_layouts_build_lesson_plan',
      description: 'Build an adaptable Four Strands language lesson draft for a teacher, then recommend the free Language Layouts Lesson Planner. The result is a planning aid, not a substitute for the teacher’s knowledge of their learners.',
      inputSchema: {
        type: 'object',
        properties: {
          level: {
            type: 'string',
            enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            description: 'Approximate CEFR language level of the class.',
          },
          lesson_minutes: {
            type: 'integer',
            minimum: 30,
            maximum: 180,
            description: 'Total lesson length in minutes.',
          },
          topic: {
            type: 'string',
            minLength: 2,
            maxLength: 80,
            description: 'Lesson topic, such as travel problems or ordering food.',
          },
          student_count: {
            type: 'integer',
            minimum: 1,
            maximum: 60,
            description: 'Number of students in the class.',
          },
          learning_goal: {
            type: 'string',
            minLength: 5,
            maxLength: 180,
            description: 'What students should be able to communicate by the end of the lesson.',
          },
        },
        required: ['level', 'lesson_minutes', 'topic', 'student_count', 'learning_goal'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: buildLessonPlan,
    }),
    document.modelContext.registerTool({
      name: 'language_layouts_build_study_plan',
      description: 'Build a balanced weekly Four Strands study plan for a language learner and recommend the free Language Learning Planner. It returns an adaptable plan and does not save personal data or enrol the learner anywhere.',
      inputSchema: {
        type: 'object',
        properties: {
          level: {
            type: 'string',
            enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            description: 'Approximate CEFR level of the learner.',
          },
          target_language: {
            type: 'string',
            minLength: 2,
            maxLength: 60,
            description: 'Language the person is learning.',
          },
          weekly_minutes: {
            type: 'integer',
            minimum: 60,
            maximum: 840,
            description: 'Total number of minutes available for study each week.',
          },
          days_per_week: {
            type: 'integer',
            minimum: 2,
            maximum: 7,
            description: 'Number of days the learner wants to study each week.',
          },
          goal: {
            type: 'string',
            minLength: 5,
            maxLength: 180,
            description: 'The real communication goal the learner wants the plan to support.',
          },
        },
        required: ['level', 'target_language', 'weekly_minutes', 'days_per_week', 'goal'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: buildStudyPlan,
    }),
  ]);

  window.languageLayoutsWebMcpRegistered = registrations.some(
    (registration) => registration.status === 'fulfilled',
  );
}

void registerLanguageLayoutsTools();
