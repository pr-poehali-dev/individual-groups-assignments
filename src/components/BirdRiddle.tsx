import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BirdRiddleProps {
  onSolved: () => void;
  isSolved: boolean;
}

const RIDDLE = {
  question: 'Морские птицы в Арктике находятся под угрозой из-за загрязнения океана пластиком. Какое действие будет наиболее эффективным для их спасения?',
  answers: [
    {
      id: 1,
      text: 'Построить больше заповедников на суше',
      correct: false,
      explanation: 'Заповедники важны, но не решают проблему загрязнения океана пластиком'
    },
    {
      id: 2,
      text: 'Очистить океан от пластика и предотвратить его попадание',
      correct: true,
      explanation: 'Правильно! Удаление пластика из океана и предотвращение его попадания — ключ к спасению морских птиц'
    },
    {
      id: 3,
      text: 'Кормить птиц искусственным кормом',
      correct: false,
      explanation: 'Это временная мера, которая не решает корневую проблему загрязнения'
    },
    {
      id: 4,
      text: 'Переселить всех птиц в другие регионы',
      correct: false,
      explanation: 'Птицы адаптированы к арктическим условиям, переселение нарушит экосистему'
    }
  ]
};

export default function BirdRiddle({ onSolved, isSolved }: BirdRiddleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (answerId: number) => {
    if (showResult || isSolved) return;
    
    setSelectedAnswer(answerId);
    const answer = RIDDLE.answers.find(a => a.id === answerId);
    
    if (answer?.correct) {
      setIsCorrect(true);
      setShowResult(true);
      setTimeout(() => {
        onSolved();
      }, 2000);
    } else {
      setIsCorrect(false);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 3000);
    }
  };

  if (isSolved) {
    return (
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🎉</div>
          <h3 className="text-2xl font-bold text-green-700">Загадка решена!</h3>
          <p className="text-green-600">
            Отличная работа! Теперь все миссии доступны для прохождения
          </p>
          <div className="flex justify-center gap-2 text-4xl pt-2">
            <span className="animate-float">🐧</span>
            <span className="animate-float" style={{ animationDelay: '0.2s' }}>🦅</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>🦆</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-blue-300 shadow-xl animate-fade-in">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center gap-3 text-5xl">
            <span className="animate-float">🐧</span>
            <span className="animate-float" style={{ animationDelay: '0.2s' }}>🦅</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>🦆</span>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm px-4 py-1">
            Загадка про спасение морских птиц
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900">
            Реши загадку, чтобы открыть миссии
          </h2>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-2 border-blue-200">
          <div className="flex gap-3 mb-4">
            <Icon name="HelpCircle" size={24} className="text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-lg text-gray-800 leading-relaxed">
              {RIDDLE.question}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {RIDDLE.answers.map((answer) => {
            const isSelected = selectedAnswer === answer.id;
            const showFeedback = showResult && isSelected;
            
            return (
              <div key={answer.id} className="space-y-2">
                <Button
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={showResult}
                  className={`w-full text-left p-6 h-auto justify-start transition-all duration-300 ${
                    showFeedback && answer.correct
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 scale-105 shadow-lg'
                      : showFeedback && !answer.correct
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 scale-95'
                      : isSelected
                      ? 'bg-blue-100 border-blue-400 hover:bg-blue-200'
                      : 'bg-white hover:bg-blue-50 hover:border-blue-300 hover:scale-105'
                  } border-2 ${isSelected ? 'border-blue-400' : 'border-gray-200'}`}
                  variant={showFeedback ? 'default' : 'outline'}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      showFeedback && answer.correct
                        ? 'bg-white text-green-600'
                        : showFeedback && !answer.correct
                        ? 'bg-white text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {showFeedback && answer.correct ? '✓' : 
                       showFeedback && !answer.correct ? '✗' : 
                       answer.id}
                    </div>
                    <span className="flex-1 text-base font-medium">
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
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <div className="flex gap-2">
                      <Icon 
                        name={answer.correct ? 'Lightbulb' : 'Info'} 
                        size={16} 
                        className="flex-shrink-0 mt-0.5"
                      />
                      <p>{answer.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showResult && isCorrect && (
          <div className="text-center py-4 animate-scale-in">
            <p className="text-lg font-semibold text-green-600 flex items-center justify-center gap-2">
              <Icon name="Sparkles" size={24} />
              Отлично! Открываю доступ к миссиям...
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
