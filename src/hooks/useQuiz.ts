import { useState, useCallback, useMemo } from 'react';
import { Question, QuizSession, QuizStats, QuizConfig } from '../types/quiz';

export const useQuiz = (questions: Question[], config: QuizConfig) => {
  const [session, setSession] = useState<QuizSession>(() => {
    const filteredQuestions = questions
      .filter(q => config.categories.includes(q.type))
      .slice(0, config.questionCount);
    
    const shuffledQuestions = config.randomize 
      ? [...filteredQuestions].sort(() => Math.random() - 0.5)
      : filteredQuestions;

    return {
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      score: 0,
      answers: new Array(shuffledQuestions.length).fill(null),
      startTime: new Date(),
      timeLimit: config.timeLimit,
      isCompleted: false
    };
  });

  const currentQuestion = useMemo(() => 
    session.questions[session.currentQuestionIndex] || null,
    [session.questions, session.currentQuestionIndex]
  );

  const progress = useMemo(() => 
    ((session.currentQuestionIndex + 1) / session.questions.length) * 100,
    [session.currentQuestionIndex, session.questions.length]
  );

  const stats = useMemo((): QuizStats => {
    const correctAnswers = session.answers.reduce((count, answer, index) => {
      if (answer === null) return count;
      return answer === session.questions[index].correctAnswer ? count + 1 : count;
    }, 0);

    const categoryBreakdown = session.questions.reduce((breakdown, question, index) => {
      const userAnswer = session.answers[index];
      if (userAnswer !== null) {
        if (!breakdown[question.type]) {
          breakdown[question.type] = { correct: 0, total: 0 };
        }
        breakdown[question.type].total++;
        if (userAnswer === question.correctAnswer) {
          breakdown[question.type].correct++;
        }
      }
      return breakdown;
    }, {} as QuizStats['categoryBreakdown']);

    return {
      totalQuestions: session.questions.length,
      correctAnswers,
      incorrectAnswers: session.answers.filter(a => a !== null).length - correctAnswers,
      accuracy: session.answers.filter(a => a !== null).length > 0 
        ? (correctAnswers / session.answers.filter(a => a !== null).length) * 100 
        : 0,
      timeSpent: (Date.now() - session.startTime.getTime()) / 1000 / 60, // in minutes
      categoryBreakdown
    };
  }, [session]);

  const answerQuestion = useCallback((answerIndex: number) => {
    setSession(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      
      const newScore = answerIndex === prev.questions[prev.currentQuestionIndex].correctAnswer
        ? prev.score + 1
        : prev.score;

      return {
        ...prev,
        answers: newAnswers,
        score: newScore
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setSession(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isCompleted = nextIndex >= prev.questions.length;
      
      return {
        ...prev,
        currentQuestionIndex: isCompleted ? prev.currentQuestionIndex : nextIndex,
        isCompleted
      };
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setSession(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    const filteredQuestions = questions
      .filter(q => config.categories.includes(q.type))
      .slice(0, config.questionCount);
    
    const shuffledQuestions = config.randomize 
      ? [...filteredQuestions].sort(() => Math.random() - 0.5)
      : filteredQuestions;

    setSession({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      score: 0,
      answers: new Array(shuffledQuestions.length).fill(null),
      startTime: new Date(),
      timeLimit: config.timeLimit,
      isCompleted: false
    });
  }, [questions, config]);

  return {
    session,
    currentQuestion,
    progress,
    stats,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    resetQuiz
  };
};