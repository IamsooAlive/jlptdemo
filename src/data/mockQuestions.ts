import { Question } from '../types/quiz';

// Mock JLPT N5 quiz questions for demonstration
// In production, this would be fetched from a backend API
export const mockQuestions: Question[] = [
  // Hiragana Questions
  {
    id: 'h1',
    type: 'hiragana',
    question: 'What is the reading of あさ?',
    options: ['asa', 'usa', 'esa', 'isa'],
    correctAnswer: 0,
    explanation: 'あさ (asa) means "morning" in Japanese.',
    difficulty: 'easy'
  },
  {
    id: 'h2',
    type: 'hiragana',
    question: 'What is the reading of すし?',
    options: ['suchi', 'sushi', 'shusi', 'shuchi'],
    correctAnswer: 1,
    explanation: 'すし (sushi) is the traditional Japanese dish.',
    difficulty: 'easy'
  },
  {
    id: 'h3',
    type: 'hiragana',
    question: 'What is the reading of がっこう?',
    options: ['gakko', 'gakkou', 'kakkou', 'kakko'],
    correctAnswer: 1,
    explanation: 'がっこう (gakkou) means "school" in Japanese.',
    difficulty: 'medium'
  },

  // Katakana Questions
  {
    id: 'k1',
    type: 'katakana',
    question: 'What is the reading of コーヒー?',
    options: ['koohii', 'koofii', 'koohee', 'koofee'],
    correctAnswer: 0,
    explanation: 'コーヒー (koohii) means "coffee" in Japanese.',
    difficulty: 'easy'
  },
  {
    id: 'k2',
    type: 'katakana',
    question: 'What is the reading of テレビ?',
    options: ['telebi', 'terebi', 'derevi', 'terevi'],
    correctAnswer: 1,
    explanation: 'テレビ (terebi) means "television" in Japanese.',
    difficulty: 'easy'
  },

  // Vocabulary Questions
  {
    id: 'v1',
    type: 'vocabulary',
    question: 'What does みず mean?',
    options: ['fire', 'water', 'earth', 'air'],
    correctAnswer: 1,
    explanation: 'みず (mizu) means "water" in Japanese.',
    difficulty: 'easy'
  },
  {
    id: 'v2',
    type: 'vocabulary',
    question: 'What does ほん mean?',
    options: ['pen', 'book', 'desk', 'chair'],
    correctAnswer: 1,
    explanation: 'ほん (hon) means "book" in Japanese.',
    difficulty: 'easy'
  },
  {
    id: 'v3',
    type: 'vocabulary',
    question: 'What does たべる mean?',
    options: ['to drink', 'to sleep', 'to eat', 'to walk'],
    correctAnswer: 2,
    explanation: 'たべる (taberu) means "to eat" in Japanese.',
    difficulty: 'medium'
  },

  // Grammar Questions
  {
    id: 'g1',
    type: 'grammar',
    question: 'Complete: わたし___がくせいです。',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 0,
    explanation: 'は (wa) is the topic particle used with わたし (watashi).',
    difficulty: 'medium'
  },
  {
    id: 'g2',
    type: 'grammar',
    question: 'Complete: ほん___よみます。',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 2,
    explanation: 'を (wo) is the direct object particle used with ほん (hon).',
    difficulty: 'medium'
  },
  {
    id: 'g3',
    type: 'grammar',
    question: 'What is the polite form of いく?',
    options: ['いきます', 'いきました', 'いって', 'いかない'],
    correctAnswer: 0,
    explanation: 'いきます (ikimasu) is the polite present form of いく (iku).',
    difficulty: 'hard'
  }
];