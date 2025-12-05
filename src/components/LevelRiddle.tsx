import { useState, useEffect } from 'react';
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

interface Hint {
  text: string;
  cost: number;
}

interface RiddleData {
  question: string;
  answers: Answer[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  hints: Hint[];
  timeLimit: number; // seconds
  bonusCoins: number;
}

interface LevelRiddleProps {
  levelId: number;
  onSolved: (earnedCoins: number, bonusPoints: number) => void;
  coins: number;
  onCoinsChange: (coins: number) => void;
}

const RIDDLES: Record<number, RiddleData> = {
  2: {
    difficulty: 'easy',
    icon: '⚠️',
    question: 'Какая главная угроза для морских птиц в Арктике связана с деятельностью человека?',
    timeLimit: 60,
    bonusCoins: 10,
    hints: [
      { text: 'Подумай о том, что попадает в океан из-за человеческой деятельности', cost: 5 },
      { text: 'Птицы часто путают этот мусор с пищей', cost: 10 },
      { text: 'Ответ связан с загрязнением воды', cost: 15 }
    ],
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
    timeLimit: 90,
    bonusCoins: 15,
    hints: [
      { text: 'Эффективный план должен включать несколько направлений работы', cost: 5 },
      { text: 'Важно не только чистить, но и предотвращать загрязнение', cost: 10 },
      { text: 'Нужно думать о долгосрочной перспективе: контроль + образование', cost: 15 }
    ],
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
    timeLimit: 120,
    bonusCoins: 20,
    hints: [
      { text: 'Любой научный проект начинается с исследования', cost: 5 },
      { text: 'После сбора данных нужно разработать стратегию', cost: 10 },
      { text: 'Правильная последовательность: изучить → спланировать → действовать → защитить → контролировать', cost: 15 }
    ],
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
  },
  // Миссия 2: Северное сияние - уровни 5, 6, 7
  5: {
    difficulty: 'easy',
    icon: '🌠',
    question: 'Что является причиной появления северного сияния?',
    timeLimit: 60,
    bonusCoins: 10,
    hints: [
      { text: 'Северное сияние связано с космическими явлениями', cost: 5 },
      { text: 'Это происходит из-за взаимодействия частиц с атмосферой', cost: 10 },
      { text: 'Ключевую роль играют заряженные частицы от Солнца', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Отражение света от ледников', correct: false, explanation: 'Свет от ледников не может создать такое яркое явление в атмосфере' },
      { id: 2, text: 'Взаимодействие солнечного ветра с магнитным полем Земли', correct: true, explanation: 'Верно! Заряженные частицы солнечного ветра сталкиваются с атомами в атмосфере, создавая свечение' },
      { id: 3, text: 'Свечение полярного льда', correct: false, explanation: 'Лёд не светится сам по себе таким ярким образом' },
      { id: 4, text: 'Молнии в верхних слоях атмосферы', correct: false, explanation: 'Молнии — другое явление, не связанное с северным сиянием' }
    ]
  },
  6: {
    difficulty: 'medium',
    icon: '🧲',
    question: 'Почему северное сияние чаще всего наблюдается вблизи полюсов?',
    timeLimit: 90,
    bonusCoins: 15,
    hints: [
      { text: 'Это связано с особой формой магнитного поля Земли', cost: 5 },
      { text: 'Заряженные частицы направляются к определённым зонам', cost: 10 },
      { text: 'Линии магнитного поля сходятся у полюсов', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Там холоднее и воздух чище', correct: false, explanation: 'Температура и чистота воздуха не влияют на образование сияния' },
      { id: 2, text: 'Магнитное поле Земли направляет частицы к полюсам', correct: true, explanation: 'Отлично! Линии магнитного поля Земли сходятся у полюсов, направляя туда солнечные частицы' },
      { id: 3, text: 'На полюсах ближе к Солнцу', correct: false, explanation: 'Расстояние до Солнца не зависит от широты таким образом' },
      { id: 4, text: 'Из-за вращения Земли', correct: false, explanation: 'Вращение Земли не является причиной концентрации сияния у полюсов' }
    ]
  },
  7: {
    difficulty: 'hard',
    icon: '🔭',
    question: 'Учёные хотят предсказать появление северного сияния. Какие данные им нужны?',
    timeLimit: 120,
    bonusCoins: 20,
    hints: [
      { text: 'Нужно наблюдать за активностью Солнца', cost: 5 },
      { text: 'Важны данные о солнечных вспышках и выбросах', cost: 10 },
      { text: 'Необходим мониторинг солнечного ветра и магнитной активности', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Только температуру воздуха и облачность', correct: false, explanation: 'Погодные условия влияют лишь на видимость, но не на само явление' },
      { id: 2, text: 'Активность Солнца, скорость солнечного ветра, состояние магнитосферы', correct: true, explanation: 'Превосходно! Комплексный мониторинг космической погоды позволяет прогнозировать сияние' },
      { id: 3, text: 'Только фазы Луны', correct: false, explanation: 'Луна не влияет на северное сияние' },
      { id: 4, text: 'Направление земного ветра', correct: false, explanation: 'Земной ветер не связан с космическими процессами, вызывающими сияние' }
    ]
  },
  // Миссия 3: Коренные народы - уровни 8, 9, 10, 11, 12
  8: {
    difficulty: 'easy',
    icon: '🏕️',
    question: 'Какое традиционное жилище использовали многие народы Крайнего Севера?',
    timeLimit: 60,
    bonusCoins: 10,
    hints: [
      { text: 'Это переносное жилище, подходящее для кочевого образа жизни', cost: 5 },
      { text: 'Оно имеет коническую форму', cost: 10 },
      { text: 'Изготавливается из шкур животных', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Деревянные избы', correct: false, explanation: 'Избы — не традиционное жилище кочевых народов Севера' },
      { id: 2, text: 'Чумы и яранги из шкур', correct: true, explanation: 'Верно! Чумы и яранги — переносные жилища из шкур оленей, идеальные для кочевого быта' },
      { id: 3, text: 'Каменные дома', correct: false, explanation: 'Камень не был доступным материалом для кочевников' },
      { id: 4, text: 'Землянки', correct: false, explanation: 'Землянки не подходят для кочевого образа жизни' }
    ]
  },
  9: {
    difficulty: 'easy',
    icon: '🎨',
    question: 'Какое животное имело наибольшее значение в жизни многих народов Крайнего Севера?',
    timeLimit: 60,
    bonusCoins: 10,
    hints: [
      { text: 'Это копытное животное, адаптированное к холоду', cost: 5 },
      { text: 'Оно давало пищу, одежду, материал для жилищ и транспорт', cost: 10 },
      { text: 'Его одомашнили для помощи в кочевом быте', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Северный олень', correct: true, explanation: 'Абсолютно верно! Олень давал всё необходимое: мясо, шкуры, был транспортом и символом культуры' },
      { id: 2, text: 'Белый медведь', correct: false, explanation: 'Медведь опасен и не приручается, хотя и почитался' },
      { id: 3, text: 'Полярная лиса', correct: false, explanation: 'Лису добывали ради меха, но она не была основой хозяйства' },
      { id: 4, text: 'Морж', correct: false, explanation: 'Морж важен для прибрежных народов, но не для всех северных' }
    ]
  },
  10: {
    difficulty: 'medium',
    icon: '🪡',
    question: 'Как коренные народы Севера адаптировали одежду к экстремальному климату?',
    timeLimit: 90,
    bonusCoins: 15,
    hints: [
      { text: 'Использовались натуральные материалы с отличной теплоизоляцией', cost: 5 },
      { text: 'Одежда шилась из нескольких слоёв', cost: 10 },
      { text: 'Применялись меха с ворсом внутрь и наружу', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Носили хлопковую одежду', correct: false, explanation: 'Хлопок плохо защищает от мороза и быстро намокает' },
      { id: 2, text: 'Многослойная одежда из оленьих шкур мехом внутрь и наружу', correct: true, explanation: 'Точно! Двухслойная меховая одежда создаёт идеальную теплоизоляцию' },
      { id: 3, text: 'Использовали только синтетику', correct: false, explanation: 'Синтетика появилась намного позже, это современный материал' },
      { id: 4, text: 'Просто носили очень толстые шубы', correct: false, explanation: 'Толщина без правильной структуры не обеспечит нужной защиты' }
    ]
  },
  11: {
    difficulty: 'medium',
    icon: '🎭',
    question: 'Какую роль играли шаманы в культуре народов Крайнего Севера?',
    timeLimit: 90,
    bonusCoins: 15,
    hints: [
      { text: 'Они были посредниками между мирами', cost: 5 },
      { text: 'Шаманы лечили, предсказывали, проводили ритуалы', cost: 10 },
      { text: 'Они были духовными лидерами и хранителями знаний', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Только развлекали народ', correct: false, explanation: 'Роль шамана была намного серьёзнее и важнее для выживания' },
      { id: 2, text: 'Духовные лидеры, целители, хранители традиций и связь с духами природы', correct: true, explanation: 'Совершенно верно! Шаманы были центром духовной и культурной жизни' },
      { id: 3, text: 'Просто охотники', correct: false, explanation: 'Шаманы имели особый статус, отличный от обычных охотников' },
      { id: 4, text: 'Военные командиры', correct: false, explanation: 'Их роль была духовной, а не военной' }
    ]
  },
  12: {
    difficulty: 'hard',
    icon: '🌍',
    question: 'Какие современные угрозы стоят перед культурой коренных народов Севера?',
    timeLimit: 120,
    bonusCoins: 20,
    hints: [
      { text: 'Проблемы связаны с изменением окружающей среды и общества', cost: 5 },
      { text: 'Промышленное освоение угрожает традиционному образу жизни', cost: 10 },
      { text: 'Глобализация и климат влияют на культуру и природу', cost: 15 }
    ],
    answers: [
      { id: 1, text: 'Никаких угроз нет', correct: false, explanation: 'К сожалению, существует множество серьёзных вызовов' },
      { id: 2, text: 'Изменение климата, промышленное освоение земель, утрата языка и традиций, урбанизация', correct: true, explanation: 'Именно! Комплекс экологических, экономических и культурных факторов угрожает традиционному образу жизни' },
      { id: 3, text: 'Только нехватка еды', correct: false, explanation: 'Проблема намного шире и сложнее' },
      { id: 4, text: 'Только холодная погода', correct: false, explanation: 'Народы адаптированы к холоду, проблемы совсем в другом' }
    ]
  }
};

export default function LevelRiddle({ levelId, onSolved, coins, onCoinsChange }: LevelRiddleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [usedHints, setUsedHints] = useState<number[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const riddleData = RIDDLES[levelId];

  useEffect(() => {
    if (riddleData) {
      setTimeLeft(riddleData.timeLimit);
      setIsTimerActive(true);
    }
  }, [levelId, riddleData]);

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0 || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, showResult]);

  if (!riddleData) {
    return null;
  }

  const useHint = (hintIndex: number) => {
    const hint = riddleData.hints[hintIndex];
    if (!hint || usedHints.includes(hintIndex) || coins < hint.cost) return;
    
    setUsedHints([...usedHints, hintIndex]);
    onCoinsChange(coins - hint.cost);
  };

  const handleAnswerClick = (answerId: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerId);
    setIsTimerActive(false);
    const answer = riddleData.answers.find(a => a.id === answerId);
    
    if (answer?.correct) {
      setIsCorrect(true);
      setShowResult(true);
      
      // Рассчитываем награду
      let earnedCoins = riddleData.bonusCoins;
      let bonusPoints = 0;
      
      // Бонус за быстрое решение (больше 50% времени осталось)
      if (timeLeft > riddleData.timeLimit * 0.5) {
        earnedCoins += 10;
        bonusPoints = 10;
      } else if (timeLeft > riddleData.timeLimit * 0.3) {
        earnedCoins += 5;
        bonusPoints = 5;
      }
      
      // Вычитаем стоимость использованных подсказок из наград
      const hintsSpent = usedHints.reduce((sum, idx) => sum + riddleData.hints[idx].cost, 0);
      earnedCoins = Math.max(0, earnedCoins - hintsSpent);
      
      onCoinsChange(coins + earnedCoins);
      
      setTimeout(() => {
        onSolved(earnedCoins, bonusPoints);
      }, 2500);
    } else {
      setIsCorrect(false);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setIsTimerActive(true);
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

  const getTimerColor = () => {
    const percentage = (timeLeft / riddleData.timeLimit) * 100;
    if (percentage > 50) return 'text-green-600 bg-green-50';
    if (percentage > 25) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Card className={`p-8 bg-gradient-to-br ${getDifficultyColor()} bg-opacity-10 border-2 animate-fade-in`}>
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="text-6xl animate-bounce">{riddleData.icon}</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge className={`${difficultyBadge.color} text-white text-sm px-4 py-1`}>
              Сложность: {difficultyBadge.text}
            </Badge>
            <Badge className={`${getTimerColor()} border-2 px-4 py-1 text-sm font-bold ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
              <Icon name="Timer" size={16} className="mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge className="bg-amber-500 text-white text-sm px-4 py-1">
              <Icon name="Coins" size={16} className="mr-1" />
              Награда: {riddleData.bonusCoins} монет
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Решите задачу, чтобы пройти уровень
          </h3>
        </div>
        
        {riddleData.hints.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Lightbulb" size={20} className="text-yellow-600" />
              <h4 className="font-semibold text-gray-900">Подсказки</h4>
              <span className="text-sm text-gray-600">({coins} монет)</span>
            </div>
            <div className="space-y-2">
              {riddleData.hints.map((hint, index) => (
                <div key={index} className="flex items-start gap-3">
                  {usedHints.includes(index) ? (
                    <div className="flex-1 text-sm text-gray-700 bg-white rounded p-3 border border-yellow-300">
                      {hint.text}
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => useHint(index)}
                      disabled={coins < hint.cost}
                      className="flex-1 justify-between hover:bg-yellow-100"
                    >
                      <span>Подсказка {index + 1}</span>
                      <Badge variant="secondary" className="bg-amber-500 text-white">
                        {hint.cost} <Icon name="Coins" size={12} className="ml-1" />
                      </Badge>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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