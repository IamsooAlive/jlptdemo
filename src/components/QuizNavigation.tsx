import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  hasAnswered,
  isLastQuestion,
  onPrevious,
  onNext,
  onFinish
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="text-sm text-gray-500">
        {currentQuestionIndex + 1} of {totalQuestions}
      </div>

      {isLastQuestion ? (
        <button
          onClick={onFinish}
          disabled={!hasAnswered}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <CheckCircle className="w-4 h-4" />
          Finish Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!hasAnswered}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;