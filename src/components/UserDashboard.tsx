import React from 'react';
import { User, LogOut, BarChart3, Calendar, Award, TrendingUp } from 'lucide-react';

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
  onViewReport: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout, onViewReport }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome back, {user.name}!
              </h2>
              <p className="text-sm text-gray-600">
                {user.studyStreak} day streak • {user.totalQuizzesTaken} quizzes completed
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg font-bold">{user.averageAccuracy}%</span>
              </div>
              <p className="text-xs text-gray-600">Avg. Accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-1 text-blue-600">
                <Calendar className="w-4 h-4" />
                <span className="text-lg font-bold">{user.studyStreak}</span>
              </div>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-1 text-purple-600">
                <Award className="w-4 h-4" />
                <span className="text-lg font-bold">{user.totalQuizzesTaken}</span>
              </div>
              <p className="text-xs text-gray-600">Quizzes</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onViewReport}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Study Report</span>
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;