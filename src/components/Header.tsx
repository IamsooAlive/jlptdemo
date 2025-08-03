import React from 'react';
import { BookOpen, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">JLPT N5 Quiz</h1>
              <p className="text-indigo-100 text-sm">Master Japanese fundamentals</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-indigo-100">
            <Globe className="w-4 h-4" />
            <span className="text-sm">日本語</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;