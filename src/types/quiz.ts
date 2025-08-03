// Quiz data types and interfaces
export interface Question {
  id: string;
  type: 'hiragana' | 'katakana' | 'vocabulary' | 'grammar';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizSession {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  startTime: Date;
  timeLimit?: number; // in minutes
  isCompleted: boolean;
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeSpent: number;
  categoryBreakdown: {
    [key in Question['type']]: {
      correct: number;
      total: number;
    };
  };
}

export interface QuizConfig {
  questionCount: number;
  categories: Question['type'][];
  timeLimit?: number;
  randomize: boolean;
}