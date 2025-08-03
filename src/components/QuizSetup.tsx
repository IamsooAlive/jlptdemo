import React, { useState } from 'react';
import { Settings, Play } from 'lucide-react';
import { QuizConfig, Question } from '../types/quiz';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
  availableQuestions: Question[];
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz, availableQuestions }) => {
  const [config, setConfig] = useState<QuizConfig>({
    questionCount: 10,
    categories: ['hiragana', 'katakana', 'vocabulary', 'grammar'],
    timeLimit: undefined,
    randomize: true
  });

  const categoryLabels = {
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    vocabulary: 'Vocabulary',
    grammar: 'Grammar'
  };

  const handleCategoryChange = (category: Question['type'], checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.categories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    onStartQuiz(config);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Quiz Setup</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions
            </label>
            <select
              value={config.questionCount}
              onChange={(e) => setConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Question Categories
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const category = key as Question['type'];
                const isChecked = config.categories.includes(category);
                return (
                  <label key={category} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (Optional)
            </label>
            <select
              value={config.timeLimit || ''}
              onChange={(e) => setConfig(prev => ({ 
                ...prev, 
                timeLimit: e.target.value ? parseInt(e.target.value) : undefined 
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">No Time Limit</option>
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
              <option value={20}>20 Minutes</option>
            </select>
          </div>

          {/* Randomize */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="randomize"
              checked={config.randomize}
              onChange={(e) => setConfig(prev => ({ ...prev, randomize: e.target.checked }))}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="randomize" className="ml-3 text-sm font-medium text-gray-700">
              Randomize question order
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizSetup;