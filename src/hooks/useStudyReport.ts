import { useState, useEffect, useMemo } from 'react';
import { StudyReport, StudySession } from '../types/user';
import { QuizStats } from '../types/quiz';

// Mock study sessions data
const mockStudySessions: StudySession[] = [
  {
    id: '1',
    userId: '1',
    quizId: 'quiz1',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    score: 8,
    totalQuestions: 10,
    accuracy: 80,
    timeSpent: 12,
    categories: ['hiragana', 'vocabulary'],
    weakAreas: ['hiragana'],
    strongAreas: ['vocabulary']
  },
  {
    id: '2',
    userId: '1',
    quizId: 'quiz2',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    score: 6,
    totalQuestions: 10,
    accuracy: 60,
    timeSpent: 15,
    categories: ['katakana', 'grammar'],
    weakAreas: ['katakana', 'grammar'],
    strongAreas: []
  },
  {
    id: '3',
    userId: '1',
    quizId: 'quiz3',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: 9,
    totalQuestions: 10,
    accuracy: 90,
    timeSpent: 10,
    categories: ['vocabulary', 'grammar'],
    weakAreas: [],
    strongAreas: ['vocabulary', 'grammar']
  }
];

export const useStudyReport = (userId: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    if (userId) {
      // Simulate API call to fetch user's study sessions
      setTimeout(() => {
        setSessions(mockStudySessions.filter(s => s.userId === userId));
        setIsLoading(false);
      }, 1000);
    } else {
      setSessions([]);
      setIsLoading(false);
    }
  }, [userId]);

  const addStudySession = (stats: QuizStats, categories: string[], timeSpent: number) => {
    if (!userId) return;

    const newSession: StudySession = {
      id: Date.now().toString(),
      userId,
      quizId: `quiz_${Date.now()}`,
      completedAt: new Date(),
      score: stats.correctAnswers,
      totalQuestions: stats.totalQuestions,
      accuracy: stats.accuracy,
      timeSpent,
      categories,
      weakAreas: Object.entries(stats.categoryBreakdown)
        .filter(([_, data]) => data.total > 0 && (data.correct / data.total) < 0.7)
        .map(([category]) => category),
      strongAreas: Object.entries(stats.categoryBreakdown)
        .filter(([_, data]) => data.total > 0 && (data.correct / data.total) >= 0.8)
        .map(([category]) => category)
    };

    setSessions(prev => [newSession, ...prev]);
  };

  const studyReport = useMemo((): StudyReport | null => {
    if (!userId || sessions.length === 0) return null;

    const totalStudyTime = sessions.reduce((sum, s) => sum + s.timeSpent, 0) / 60; // hours
    const averageAccuracy = sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length;
    
    // Calculate category analysis
    const categoryStats: { [key: string]: { correct: number; total: number; time: number } } = {};
    sessions.forEach(session => {
      session.categories.forEach(category => {
        if (!categoryStats[category]) {
          categoryStats[category] = { correct: 0, total: 0, time: 0 };
        }
        categoryStats[category].correct += session.score * (session.categories.length > 1 ? 0.5 : 1);
        categoryStats[category].total += session.totalQuestions * (session.categories.length > 1 ? 0.5 : 1);
        categoryStats[category].time += session.timeSpent / session.categories.length;
      });
    });

    const categoryAnalysis: StudyReport['categoryAnalysis'] = {};
    Object.entries(categoryStats).forEach(([category, stats]) => {
      const accuracy = (stats.correct / stats.total) * 100;
      let status: 'Needs Work' | 'Good Progress' | 'Mastered';
      let recommendations: string[] = [];

      if (accuracy < 60) {
        status = 'Needs Work';
        recommendations = [
          `Focus on basic ${category} characters and their readings`,
          `Practice ${category} daily for 15-20 minutes`,
          `Use flashcards for repetitive learning`
        ];
      } else if (accuracy < 80) {
        status = 'Good Progress';
        recommendations = [
          `Continue practicing ${category} with varied question types`,
          `Focus on speed and accuracy improvement`
        ];
      } else {
        status = 'Mastered';
        recommendations = [
          `Maintain proficiency with periodic review`,
          `Challenge yourself with advanced ${category} concepts`
        ];
      }

      categoryAnalysis[category] = {
        accuracy,
        questionsAnswered: Math.round(stats.total),
        timeSpent: stats.time,
        improvement: Math.random() * 20 - 10, // Mock improvement data
        status,
        recommendations
      };
    });

    // Generate weekly progress (mock data)
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      accuracy: Math.random() * 40 + 60,
      questionsAnswered: Math.floor(Math.random() * 20) + 5,
      timeStudied: Math.random() * 60 + 15
    })).reverse();

    // Generate recommendations
    const recommendations = [
      {
        priority: 'High' as const,
        category: 'Hiragana',
        suggestion: 'Focus on dakuten and handakuten characters (が, ざ, ぱ)',
        estimatedTime: '30 minutes daily'
      },
      {
        priority: 'Medium' as const,
        category: 'Grammar',
        suggestion: 'Practice particle usage (は, が, を, に)',
        estimatedTime: '20 minutes daily'
      },
      {
        priority: 'Low' as const,
        category: 'Vocabulary',
        suggestion: 'Expand daily vocabulary with common N5 words',
        estimatedTime: '15 minutes daily'
      }
    ];

    return {
      userId,
      generatedAt: new Date(),
      overallProgress: {
        totalStudyTime,
        quizzesCompleted: sessions.length,
        averageAccuracy,
        studyStreak: 7, // Mock data
        currentLevel: averageAccuracy > 80 ? 'Intermediate' : averageAccuracy > 60 ? 'Elementary' : 'Beginner'
      },
      categoryAnalysis,
      weeklyProgress,
      recommendations,
      nextGoals: {
        shortTerm: [
          'Achieve 85% accuracy in hiragana quizzes',
          'Complete 5 grammar-focused practice sessions',
          'Learn 20 new N5 vocabulary words'
        ],
        longTerm: [
          'Master all N5 hiragana and katakana',
          'Understand basic Japanese sentence structure',
          'Build a vocabulary of 500+ N5 words'
        ]
      }
    };
  }, [userId, sessions]);

  return {
    studyReport,
    sessions,
    isLoading,
    addStudySession
  };
};