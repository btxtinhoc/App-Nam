export type Language = 'html' | 'css' | 'python' | 'cpp';

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface HtmlCssRule {
  ruleId: string;
  description: string;
  tag?: string;
  attribute?: { name: string; value?: string };
  selector?: string;
  cssProperty?: { prop: string; value?: string };
  textContains?: string;
}

export interface Lesson {
  id: string;
  courseId: Language;
  order: number;
  title: string;
  description: string;
  target: string;
  theory: string;
  examples: {
    title: string;
    code: string;
    explanation?: string;
  }[];
  task: string;
  initialCode: string;
  solutionCode: string;
  hints: string[]; // Hint 1: light, Hint 2: specific, Hint 3: near solution
  advancedChallenge?: string;
  testCases?: TestCase[]; // For Python / C++
  htmlCssRules?: HtmlCssRule[]; // For HTML / CSS
  xpReward: number;
}

export interface Course {
  id: Language;
  name: string;
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export interface StudentProfile {
  name: string;
  studentId: string;
  className: string;
  totalXp: number;
  completedLessons: string[]; // lessonIds
  earnedBadges: string[];
  lastActive: string;
}

export interface SubmissionRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  lessonId: string;
  courseId: Language;
  code: string;
  score: number; // 0 - 100
  totalTests: number;
  passedTests: number;
  timestamp: string;
  isExam?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  requirement: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  courseId: Language;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  description: string;
  requirements: string[];
  initialCode: string;
  solutionCode: string;
  hints: string[];
  xpReward: number;
}

export interface TeacherAssignment {
  id: string;
  title: string;
  className?: string;
  courseId: Language;
  timeLimitMinutes?: number;
  durationMinutes?: number;
  description?: string;
  instructions?: string;
  initialCode?: string;
  testCases: TestCase[];
  htmlCssRules?: HtmlCssRule[];
  isLockedSolution?: boolean;
  isLockedHints?: boolean;
  isExam?: boolean;
  createdAt: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  error?: string;
  compiled?: boolean;
}

export interface GradeResult {
  score: number;
  passedCount: number;
  totalCount: number;
  details: {
    description: string;
    passed: boolean;
    input?: string;
    expected?: string;
    actual?: string;
    error?: string;
  }[];
}
