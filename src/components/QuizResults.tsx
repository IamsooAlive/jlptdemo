import React from 'react';
import { Trophy, RotateCcw, TrendingUp, Clock, Target } from 'lucide-react';
import { QuizStats, Question } from '../types/quiz';

interface QuizResultsProps {
  stats: QuizStats;
  onRestartQuiz: () => void;
  onNewQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  stats,
  onRestartQuiz,
  onNewQuiz
}) => {
  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
    if (accuracy >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (accuracy >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (accuracy >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const gradeInfo = getGrade(stats.accuracy);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full ${gradeInfo.bg} flex items-center justify-center`}>
              <Trophy className={`w-10 h-10 ${gradeInfo.color}`} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${gradeInfo.bg}`}>
            <span className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
            <span className={`text-lg ${gradeInfo.color}`}>({Math.round(stats.accuracy)}%)</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">{stats.correctAnswers}</p>
            <p className="text-sm text-blue-600">Correct</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Target className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-800">{stats.incorrectAnswers}</p>
            <p className="text-sm text-red-600">Incorrect</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">{Math.round(stats.accuracy)}%</p>
            <p className="text-sm text-green-600">Accuracy</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">{Math.round(stats.timeSpent)}</p>
            <p className="text-sm text-purple-600">Minutes</p>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(stats.categoryBreakdown).length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
            <div className="space-y-3">
              {Object.entries(stats.categoryBreakdown).map(([category, data]) => {
                const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                return (
                  <div key={category} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                      {category}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{data.correct}/{data.total}</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestartQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Same Quiz
          </button>
          
          <button
            onClick={onNewQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            New Quiz Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;