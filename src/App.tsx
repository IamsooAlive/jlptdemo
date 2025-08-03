import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useStudyReport } from './hooks/useStudyReport';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import UserDashboard from './components/UserDashboard';
import StudyReport from './components/StudyReport';
import QuizSetup from './components/QuizSetup';
import QuizInterface from './components/QuizInterface';
import { mockQuestions } from './data/mockQuestions';
import { QuizConfig } from './types/quiz';

function App() {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
  const { studyReport, addStudySession } = useStudyReport(user?.id || null);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
  };

  const handleBackToSetup = () => {
    setQuizConfig(null);
  };

  const handleQuizComplete = (stats: any, categories: string[], timeSpent: number) => {
    addStudySession(stats, categories, timeSpent);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} onRegister={register} isLoading={isLoading} />;
  }

  if (showReport && studyReport) {
    return <StudyReport report={studyReport} onClose={() => setShowReport(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header />
      <UserDashboard 
        user={user} 
        onLogout={logout} 
        onViewReport={() => setShowReport(true)} 
      />
      
      <main className="py-8">
        {quizConfig ? (
          <QuizInterface
            questions={mockQuestions}
            config={quizConfig}
            onBackToSetup={handleBackToSetup}
            onQuizComplete={handleQuizComplete}
          />
        ) : (
          <QuizSetup
            onStartQuiz={handleStartQuiz}
            availableQuestions={mockQuestions}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Built for JLPT N5 preparation • Features hiragana, katakana, vocabulary, and grammar practice
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Track your progress, identify weak areas, and get personalized study recommendations
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;