import React, { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { QuizConfig, Question } from '../types/quiz';
import QuizHeader from './QuizHeader';
import QuestionCard from './QuestionCard';
import QuizNavigation from './QuizNavigation';
import QuizResults from './QuizResults';

interface QuizInterfaceProps {
  questions: Question[];
  config: QuizConfig;
  onBackToSetup: () => void;
  onQuizComplete?: (stats: any, categories: string[], timeSpent: number) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({
  questions,
  config,
  onBackToSetup,
  onQuizComplete
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(new Date());
  const {
    session,
    currentQuestion,
    progress,
    stats,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    resetQuiz
  } = useQuiz(questions, config);

  const handleAnswerSelect = (answerIndex: number) => {
    answerQuestion(answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    nextQuestion();
    setShowExplanation(false);
  };

  const handlePrevious = () => {
    previousQuestion();
    setShowExplanation(session.answers[session.currentQuestionIndex - 1] !== null);
  };

  const handleFinish = () => {
    const timeSpent = (Date.now() - startTime.getTime()) / 1000 / 60; // in minutes
    onQuizComplete?.(stats, config.categories, timeSpent);
    nextQuestion(); // This will mark the quiz as completed
  };

  const handleRestart = () => {
    resetQuiz();
    setShowExplanation(false);
  };

  const handleTimeUp = () => {
    // Auto-finish quiz when time runs out
    handleFinish();
  };

  if (session.isCompleted) {
    return (
      <QuizResults
        stats={stats}
        onRestartQuiz={handleRestart}
        onNewQuiz={onBackToSetup}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">No questions available for the selected categories.</p>
        <button
          onClick={onBackToSetup}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Back to Setup
        </button>
      </div>
    );
  }

  const currentAnswer = session.answers[session.currentQuestionIndex];
  const hasAnswered = currentAnswer !== null;
  const isLastQuestion = session.currentQuestionIndex === session.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <QuizHeader
        progress={progress}
        score={session.score}
        totalQuestions={session.questions.length}
        timeLimit={config.timeLimit}
        onTimeUp={handleTimeUp}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onSelectAnswer={handleAnswerSelect}
        showExplanation={showExplanation}
        questionNumber={session.currentQuestionIndex + 1}
        totalQuestions={session.questions.length}
      />

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <QuizNavigation
          currentQuestionIndex={session.currentQuestionIndex}
          totalQuestions={session.questions.length}
          hasAnswered={hasAnswered}
          isLastQuestion={isLastQuestion}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default QuizInterface;