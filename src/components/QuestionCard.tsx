import React from 'react';
import { Question } from '../types/quiz';
import { Clock, BookOpen, Type, MessageCircle, Zap } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showExplanation?: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showExplanation = false,
  questionNumber,
  totalQuestions
}) => {
  const getCategoryIcon = (type: Question['type']) => {
    switch (type) {
      case 'hiragana':
        return <Type className="w-5 h-5" />;
      case 'katakana':
        return <Type className="w-5 h-5" />;
      case 'vocabulary':
        return <BookOpen className="w-5 h-5" />;
      case 'grammar':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (type: Question['type']) => {
    switch (type) {
      case 'hiragana':
        return 'bg-blue-100 text-blue-800';
      case 'katakana':
        return 'bg-purple-100 text-purple-800';
      case 'vocabulary':
        return 'bg-green-100 text-green-800';
      case 'grammar':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.type)}`}>
            {getCategoryIcon(question.type)}
            {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3 mb-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const isIncorrect = showExplanation && isSelected && !isCorrect;
          const showCorrect = showExplanation && isCorrect;

          let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ';
          
          if (showExplanation) {
            if (showCorrect) {
              buttonClass += 'border-green-500 bg-green-50 text-green-800';
            } else if (isIncorrect) {
              buttonClass += 'border-red-500 bg-red-50 text-red-800';
            } else {
              buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
            }
          } else if (isSelected) {
            buttonClass += 'border-indigo-500 bg-indigo-50 text-indigo-800';
          } else {
            buttonClass += 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700';
          }

          return (
            <button
              key={index}
              onClick={() => !showExplanation && onSelectAnswer(index)}
              disabled={showExplanation}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Explanation</h4>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;