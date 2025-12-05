import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import MissionViewer from '@/components/MissionViewer';
import BirdRiddle from '@/components/BirdRiddle';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

interface Mission {
  id: string;
  title: string;
  subject: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'locked';
  xp: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Первооткрыватель',
    description: 'Завершил первую миссию',
    icon: '🏆',
    unlocked: true
  },
  {
    id: '2',
    title: 'Картограф',
    description: 'Создал 5 тепловых карт',
    icon: '🗺️',
    unlocked: true,
    progress: 100
  },
  {
    id: '3',
    title: 'Защитник природы',
    description: 'Спас 10 видов животных',
    icon: '🐧',
    unlocked: false,
    progress: 70
  },
  {
    id: '4',
    title: 'Учёный',
    description: 'Провёл 20 экспериментов',
    icon: '🔬',
    unlocked: false,
    progress: 45
  },
  {
    id: '5',
    title: 'Командир',
    description: 'Возглавил 5 командных миссий',
    icon: '⭐',
    unlocked: false,
    progress: 20
  },
  {
    id: '6',
    title: 'Эксперт Арктики',
    description: 'Достиг 10 уровня',
    icon: '❄️',
    unlocked: false,
    progress: 30
  }
];

const MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Картографирование айсбергов',
    subject: 'География',
    progress: 100,
    status: 'completed',
    xp: 200
  },
  {
    id: '2',
    title: 'Построение тепловой карты',
    subject: 'География',
    progress: 100,
    status: 'completed',
    xp: 150
  },
  {
    id: '3',
    title: 'Спасение морских птиц',
    subject: 'Экология',
    progress: 60,
    status: 'in_progress',
    xp: 150
  },
  {
    id: '4',
    title: 'Восстановление пищевой цепи',
    subject: 'Экология',
    progress: 0,
    status: 'locked',
    xp: 250
  },
  {
    id: '5',
    title: 'Эксперимент: таяние льда',
    subject: 'Физика',
    progress: 0,
    status: 'locked',
    xp: 300
  }
];

const STATS = {
  level: 3,
  currentXP: 2840,
  nextLevelXP: 3000,
  totalMissions: 45,
  completedMissions: 12,
  achievements: 6,
  unlockedAchievements: 2,
  rank: 'Исследователь'
};

const SUBJECTS = [
  { name: 'География', progress: 75, color: 'bg-blue-500' },
  { name: 'Экология', progress: 60, color: 'bg-green-500' },
  { name: 'Физика', progress: 40, color: 'bg-purple-500' },
  { name: 'Химия', progress: 30, color: 'bg-orange-500' }
];

export default function StudentDashboard() {
  const [riddleSolved, setRiddleSolved] = useState(false);
  const [coins, setCoins] = useState(100); // Стартовые монеты
  const xpProgress = (STATS.currentXP / STATS.nextLevelXP) * 100;
  const missionProgress = (STATS.completedMissions / STATS.totalMissions) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Мой прогресс</h1>
          <p className="text-gray-600 mt-1">Отслеживай свои достижения и развитие</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 text-lg animate-scale-in shadow-lg">
            <Icon name="Coins" size={20} className="mr-2" />
            {coins} монет
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-lg animate-scale-in">
            {STATS.rank}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Zap" size={24} />
              Уровень и опыт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{STATS.level}</span>
                <span className="text-blue-100">уровень</span>
              </div>
              <Progress value={xpProgress} className="h-3 bg-blue-300" />
              <p className="text-sm text-blue-100">
                {STATS.currentXP} / {STATS.nextLevelXP} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Target" size={24} />
              Миссии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{STATS.completedMissions}</span>
                <span className="text-green-100">из {STATS.totalMissions}</span>
              </div>
              <Progress value={missionProgress} className="h-3 bg-green-300" />
              <p className="text-sm text-green-100">
                {Math.round(missionProgress)}% выполнено
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Award" size={24} />
              Достижения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{STATS.unlockedAchievements}</span>
                <span className="text-purple-100">из {STATS.achievements}</span>
              </div>
              <Progress 
                value={(STATS.unlockedAchievements / STATS.achievements) * 100} 
                className="h-3 bg-purple-300"
              />
              <p className="text-sm text-purple-100">
                {Math.round((STATS.unlockedAchievements / STATS.achievements) * 100)}% разблокировано
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="missions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-100">
          <TabsTrigger value="missions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Миссии
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Достижения
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Предметы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-6 mt-6">
          <BirdRiddle onSolved={() => setRiddleSolved(true)} isSolved={riddleSolved} />
          <MissionViewer isUnlocked={riddleSolved} coins={coins} onCoinsChange={setCoins} />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-md' 
                    : 'bg-gray-50 border-gray-200 opacity-75'
                } hover:shadow-lg transition-all`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-6xl mb-3 ${achievement.unlocked ? 'animate-float' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  {achievement.unlocked ? (
                    <Badge className="bg-green-500 text-white">
                      <Icon name="Check" size={14} className="mr-1" />
                      Разблокировано
                    </Badge>
                  ) : (
                    <>
                      {achievement.progress && (
                        <div className="space-y-1">
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="text-xs text-gray-500">{achievement.progress}%</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4 mt-6">
          {SUBJECTS.map((subject) => (
            <Card key={subject.name} className="hover:shadow-lg transition-all border-2 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{subject.name}</h3>
                  <span className="text-2xl font-bold text-blue-600">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  Продолжай изучать {subject.name.toLowerCase()} для повышения уровня!
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}