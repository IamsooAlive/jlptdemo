import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Star,
  BarChart3
} from 'lucide-react';
import { StudyReport as StudyReportType } from '../types/user';

interface StudyReportProps {
  report: StudyReportType;
  onClose: () => void;
}

const StudyReport: React.FC<StudyReportProps> = ({ report, onClose }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Needs Work':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'Good Progress':
        return <TrendingUp className="w-5 h-5 text-yellow-500" />;
      case 'Mastered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Needs Work':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'Good Progress':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'Mastered':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Japanese Study Report</h2>
                <p className="text-gray-600">
                  Generated on {report.generatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overall Progress */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Overall Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-800">
                      {Math.round(report.overallProgress.totalStudyTime)}h
                    </p>
                    <p className="text-sm text-blue-600">Total Study Time</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-800">
                      {report.overallProgress.quizzesCompleted}
                    </p>
                    <p className="text-sm text-green-600">Quizzes Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-800">
                      {Math.round(report.overallProgress.averageAccuracy)}%
                    </p>
                    <p className="text-sm text-purple-600">Average Accuracy</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-800">
                      {report.overallProgress.studyStreak}
                    </p>
                    <p className="text-sm text-orange-600">Day Streak</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="font-semibold text-gray-900">Current Level</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {report.overallProgress.currentLevel}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Category Analysis */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Category Performance Analysis
            </h3>
            <div className="grid gap-4">
              {Object.entries(report.categoryAnalysis).map(([category, analysis]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-gray-900 capitalize">
                        {category}
                      </h4>
                      {getStatusIcon(analysis.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(analysis.status)}`}>
                        {analysis.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(analysis.accuracy)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {analysis.questionsAnswered} questions
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysis.accuracy}%` }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">What to work on:</p>
                    <ul className="space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Progress Chart */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Weekly Progress
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-7 gap-2">
                {report.weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 mb-2">
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                    <div 
                      className="bg-indigo-600 rounded-t mx-auto mb-1"
                      style={{ 
                        height: `${Math.max(day.accuracy / 2, 10)}px`,
                        width: '20px'
                      }}
                    />
                    <div className="text-xs font-medium text-gray-700">
                      {Math.round(day.accuracy)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-indigo-600" />
              Personalized Recommendations
            </h3>
            <div className="space-y-3">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                      <p className="text-gray-700 mt-1">{rec.suggestion}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Estimated time: {rec.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Goals */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-600" />
              Your Learning Goals
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Short-term Goals</h4>
                <ul className="space-y-2">
                  {report.nextGoals.shortTerm.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Long-term Goals</h4>
                <ul className="space-y-2">
                  {report.nextGoals.longTerm.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudyReport;