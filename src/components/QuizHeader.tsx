import React from 'react';
import { Clock, Target, Award } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

interface QuizHeaderProps {
  progress: number;
  score: number;
  totalQuestions: number;
  timeLimit?: number;
  onTimeUp?: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  progress,
  score,
  totalQuestions,
  timeLimit,
  onTimeUp
}) => {
  const timer = useTimer(timeLimit ? timeLimit * 60 : 0, onTimeUp);

  React.useEffect(() => {
    if (timeLimit) {
      timer.start();
    }
  }, [timeLimit, timer]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score */}
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Award className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-green-600 font-medium">Score</p>
            <p className="text-lg font-bold text-green-800">{score}/{totalQuestions}</p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Target className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-600 font-medium">Accuracy</p>
            <p className="text-lg font-bold text-blue-800">
              {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Timer */}
        {timeLimit && (
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600 font-medium">Time Left</p>
              <p className="text-lg font-bold text-orange-800">
                {timer.formatTime(timer.timeRemaining)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;