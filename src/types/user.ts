export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLoginAt: Date;
  studyStreak: number;
  totalQuizzesTaken: number;
  averageAccuracy: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface StudySession {
  id: string;
  userId: string;
  quizId: string;
  completedAt: Date;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number; // in minutes
  categories: string[];
  weakAreas: string[];
  strongAreas: string[];
}

export interface StudyReport {
  userId: string;
  generatedAt: Date;
  overallProgress: {
    totalStudyTime: number; // in hours
    quizzesCompleted: number;
    averageAccuracy: number;
    studyStreak: number;
    currentLevel: 'Beginner' | 'Elementary' | 'Intermediate';
  };
  categoryAnalysis: {
    [category: string]: {
      accuracy: number;
      questionsAnswered: number;
      timeSpent: number;
      improvement: number; // percentage change from last week
      status: 'Needs Work' | 'Good Progress' | 'Mastered';
      recommendations: string[];
    };
  };
  weeklyProgress: {
    date: string;
    accuracy: number;
    questionsAnswered: number;
    timeStudied: number;
  }[];
  recommendations: {
    priority: 'High' | 'Medium' | 'Low';
    category: string;
    suggestion: string;
    estimatedTime: string;
  }[];
  nextGoals: {
    shortTerm: string[];
    longTerm: string[];
  };
}