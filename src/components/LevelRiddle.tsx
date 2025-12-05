import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Answer {
  id: number;
  text: string;
  correct: boolean;
  explanation: string;
}

interface RiddleData {
  question: string;
  answers: Answer[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

interface LevelRiddleProps {
  levelId: number;
  onSolved: () => void;
}

const RIDDLES: Record<number, RiddleData> = {
  2: {
    difficulty: 'easy',
    icon: '⚠️',
    question: 'Какая главная угроза для морских птиц в Арктике связана с деятельностью человека?',
    answers: [
      {
        id: 1,
        text: 'Холодный климат',
        correct: false,
        explanation: 'Птицы Арктики адаптированы к холодному климату на протяжении тысячелетий'
      },
      {
        id: 2,
        text: 'Загрязнение океана пластиком и нефтью',
        correct: true,
        explanation: 'Верно! Пластиковый мусор и нефтяные разливы — главные антропогенные угрозы для птиц'
      },
      {
        id: 3,
        text: 'Недостаток пищи в природе',
        correct: false,
        explanation: 'Природный дефицит пищи не является главной проблемой, скорее последствие загрязнения'
      },
      {
        id: 4,
        text: 'Хищники в тундре',
        correct: false,
        explanation: 'Естественные хищники — часть экосистемы, они не представляют критической угрозы'
      }
    ]
  },
  3: {
    difficulty: 'medium',
    icon: '📋',
    question: 'Какой комплексный план будет наиболее эффективным для защиты морских птиц в Арктике?',
    answers: [
      {
        id: 1,
        text: 'Только создание заповедников',
        correct: false,
        explanation: 'Заповедники важны, но недостаточны без решения проблемы загрязнения океана'
      },
      {
        id: 2,
        text: 'Очистка океана + создание заповедников + мониторинг популяции + образование',
        correct: true,
        explanation: 'Отлично! Комплексный подход включает очистку, защиту территорий, контроль и просвещение'
      },
      {
        id: 3,
        text: 'Только запрет рыболовства в Арктике',
        correct: false,
        explanation: 'Полный запрет рыболовства нарушит экономику региона и не решит проблему пластика'
      },
      {
        id: 4,
        text: 'Искусственное разведение птиц в неволе',
        correct: false,
        explanation: 'Разведение в неволе — крайняя мера, не заменяющая восстановление естественной среды'
      }
    ]
  },
  4: {
    difficulty: 'hard',
    icon: '🎯',
    question: 'Вы руководите проектом по спасению морских птиц. Какую последовательность действий выберете?',
    answers: [
      {
        id: 1,
        text: '1) Запустить информационную кампанию → 2) Исследовать места обитания → 3) Создать заповедники → 4) Очистить океан',
        correct: false,
        explanation: 'Информация важна, но сначала нужны научные данные для эффективных действий'
      },
      {
        id: 2,
        text: '1) Исследовать популяцию и угрозы → 2) Разработать план на основе данных → 3) Очистить критические зоны → 4) Создать охраняемые территории → 5) Запустить мониторинг',
        correct: true,
        explanation: 'Превосходно! Научный подход: сбор данных → планирование → действие → защита → контроль'
      },
      {
        id: 3,
        text: '1) Немедленно создать заповедники → 2) Запретить всю хозяйственную деятельность → 3) Переселить птиц',
        correct: false,
        explanation: 'Радикальные меры без исследований могут навредить как экосистеме, так и людям'
      },
      {
        id: 4,
        text: '1) Собрать финансирование → 2) Нанять персонал → 3) Провести конференцию → 4) Начать работу',
        correct: false,
        explanation: 'Бюрократический подход занимает слишком много времени, птицам нужна помощь сейчас'
      }
    ]
  }
};

export default function LevelRiddle({ levelId, onSolved }: LevelRiddleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const riddleData = RIDDLES[levelId];

  if (!riddleData) {
    return null;
  }

  const handleAnswerClick = (answerId: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerId);
    const answer = riddleData.answers.find(a => a.id === answerId);
    
    if (answer?.correct) {
      setIsCorrect(true);
      setShowResult(true);
      setTimeout(() => {
        onSolved();
      }, 2500);
    } else {
      setIsCorrect(false);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 3000);
    }
  };

  const getDifficultyColor = () => {
    switch (riddleData.difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-orange-500 to-amber-500';
      case 'hard': return 'from-red-500 to-rose-500';
    }
  };

  const getDifficultyBadge = () => {
    switch (riddleData.difficulty) {
      case 'easy': return { text: 'Лёгкая', color: 'bg-green-500' };
      case 'medium': return { text: 'Средняя', color: 'bg-orange-500' };
      case 'hard': return { text: 'Сложная', color: 'bg-red-500' };
    }
  };

  const difficultyBadge = getDifficultyBadge();

  return (
    <Card className={`p-8 bg-gradient-to-br ${getDifficultyColor()} bg-opacity-10 border-2 animate-fade-in`}>
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="text-6xl animate-bounce">{riddleData.icon}</div>
          <Badge className={`${difficultyBadge.color} text-white text-sm px-4 py-1`}>
            Сложность: {difficultyBadge.text}
          </Badge>
          <h3 className="text-xl font-bold text-gray-900">
            Решите задачу, чтобы пройти уровень
          </h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-2 border-gray-200">
          <div className="flex gap-3 mb-2">
            <Icon name="Brain" size={24} className="text-purple-600 flex-shrink-0 mt-1" />
            <p className="text-base text-gray-800 leading-relaxed font-medium">
              {riddleData.question}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {riddleData.answers.map((answer) => {
            const isSelected = selectedAnswer === answer.id;
            const showFeedback = showResult && isSelected;
            
            return (
              <div key={answer.id} className="space-y-2">
                <Button
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={showResult}
                  className={`w-full text-left p-5 h-auto justify-start transition-all duration-300 ${
                    showFeedback && answer.correct
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 scale-105 shadow-xl'
                      : showFeedback && !answer.correct
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 scale-95'
                      : 'bg-white hover:bg-blue-50 hover:border-blue-300 hover:scale-102'
                  } border-2 ${isSelected && !showFeedback ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  variant={showFeedback ? 'default' : 'outline'}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      showFeedback && answer.correct
                        ? 'bg-white text-green-600'
                        : showFeedback && !answer.correct
                        ? 'bg-white text-red-600'
                        : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {showFeedback && answer.correct ? '✓' : 
                       showFeedback && !answer.correct ? '✗' : 
                       answer.id}
                    </div>
                    <span className="flex-1 text-sm font-medium leading-relaxed">
                      {answer.text}
                    </span>
                    {showFeedback && (
                      <Icon 
                        name={answer.correct ? 'CheckCircle2' : 'XCircle'} 
                        size={24} 
                        className="flex-shrink-0"
                      />
                    )}
                  </div>
                </Button>
                
                {showFeedback && (
                  <div className={`px-6 py-3 rounded-lg text-sm animate-fade-in ${
                    answer.correct 
                      ? 'bg-green-50 text-green-800 border-2 border-green-200' 
                      : 'bg-red-50 text-red-800 border-2 border-red-200'
                  }`}>
                    <div className="flex gap-2">
                      <Icon 
                        name={answer.correct ? 'Lightbulb' : 'Info'} 
                        size={16} 
                        className="flex-shrink-0 mt-0.5"
                      />
                      <p className="leading-relaxed">{answer.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showResult && isCorrect && (
          <div className="text-center py-4 animate-scale-in">
            <div className="text-5xl mb-2 animate-bounce">🎉</div>
            <p className="text-lg font-bold text-green-600 flex items-center justify-center gap-2">
              <Icon name="Sparkles" size={24} />
              Правильно! Открываю следующий уровень...
            </p>
          </div>
        )}

        {showResult && !isCorrect && (
          <div className="text-center py-4 animate-scale-in">
            <div className="text-4xl mb-2">🤔</div>
            <p className="text-base font-semibold text-orange-600">
              Попробуй ещё раз! Подумай внимательнее
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
