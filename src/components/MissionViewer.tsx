import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import LevelRiddle from '@/components/LevelRiddle';

type LevelStatus = 'locked' | 'available' | 'completed';

interface Level {
  id: number;
  title: string;
  description: string;
  status: LevelStatus;
  points: number;
}

interface Mission {
  id: number;
  title: string;
  subject: string;
  description: string;
  icon: string;
  levels: Level[];
  totalLevels: number;
  completedLevels: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  requiredLevel?: number;
}

const initialMissions: Mission[] = [
  {
    id: 1,
    title: 'Спасение морских птиц',
    subject: 'Биология',
    description: 'Изучи экосистему Арктики и помоги защитить морских птиц от загрязнения океана',
    icon: '🐧',
    totalLevels: 4,
    completedLevels: 0,
    status: 'available',
    levels: [
      { id: 1, title: 'Знакомство с морскими птицами', description: 'Изучи основные виды птиц Арктики', status: 'available', points: 10 },
      { id: 2, title: 'Угрозы для птиц', description: 'Узнай о влиянии загрязнения на птиц', status: 'locked', points: 15 },
      { id: 3, title: 'План спасения', description: 'Разработай стратегию защиты', status: 'locked', points: 20 },
      { id: 4, title: 'Реализация проекта', description: 'Примени знания на практике', status: 'locked', points: 25 },
    ],
  },
  {
    id: 2,
    title: 'Тайна северного сияния',
    subject: 'Физика',
    description: 'Раскрой научные секреты полярного сияния и магнитного поля Земли',
    icon: '🌌',
    totalLevels: 3,
    completedLevels: 0,
    status: 'available',
    levels: [
      { id: 1, title: 'Что такое северное сияние?', description: 'Изучи природу явления', status: 'available', points: 10 },
      { id: 2, title: 'Магнитное поле Земли', description: 'Пойми механизм взаимодействия', status: 'locked', points: 20 },
      { id: 3, title: 'Наблюдение и прогноз', description: 'Научись предсказывать сияние', status: 'locked', points: 30 },
    ],
  },
  {
    id: 3,
    title: 'Жизнь коренных народов',
    subject: 'История',
    description: 'Познакомься с культурой и традициями народов Крайнего Севера',
    icon: '🏔️',
    totalLevels: 5,
    completedLevels: 0,
    status: 'locked',
    requiredLevel: 2,
    levels: [
      { id: 1, title: 'Народы Севера', description: 'Изучи основные народности', status: 'locked', points: 10 },
      { id: 2, title: 'Традиции и обычаи', description: 'Узнай о культурном наследии', status: 'locked', points: 15 },
      { id: 3, title: 'Ремесла и промыслы', description: 'Познакомься с традиционными занятиями', status: 'locked', points: 15 },
      { id: 4, title: 'Современная жизнь', description: 'Узнай о жизни сегодня', status: 'locked', points: 20 },
      { id: 5, title: 'Сохранение культуры', description: 'Помоги сохранить наследие', status: 'locked', points: 30 },
    ],
  },
];

interface MissionViewerProps {
  isUnlocked: boolean;
  coins: number;
  onCoinsChange: (coins: number) => void;
}

export default function MissionViewer({ isUnlocked, coins, onCoinsChange }: MissionViewerProps) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeRiddleLevel, setActiveRiddleLevel] = useState<number | null>(null);

  const openMission = (mission: Mission) => {
    if (mission.status !== 'locked' && isUnlocked) {
      setSelectedMission(mission);
      setIsDialogOpen(true);
    }
  };

  const startLevel = (levelId: number) => {
    // Уровни 2, 3, 4 требуют загадки
    if (levelId >= 2 && levelId <= 4) {
      setActiveRiddleLevel(levelId);
    } else {
      // Уровень 1 проходится без загадки
      completeLevel(selectedMission!.id, levelId);
    }
  };

  const handleRiddleSolved = (earnedCoins: number, bonusPoints: number) => {
    if (activeRiddleLevel && selectedMission) {
      completeLevel(selectedMission.id, activeRiddleLevel);
      setActiveRiddleLevel(null);
      // Здесь можно добавить анимацию или уведомление о наградах
    }
  };

  const completeLevel = (missionId: number, levelId: number) => {
    setMissions(prevMissions =>
      prevMissions.map(mission => {
        if (mission.id === missionId) {
          const updatedLevels = mission.levels.map((level, index) => {
            if (level.id === levelId && level.status === 'available') {
              // Unlock next level
              const nextLevel = mission.levels[index + 1];
              return { ...level, status: 'completed' as LevelStatus };
            }
            if (level.id === levelId + 1 && mission.levels[index - 1].status === 'completed') {
              return { ...level, status: 'available' as LevelStatus };
            }
            return level;
          });

          const completedCount = updatedLevels.filter(l => l.status === 'completed').length;
          const newStatus = completedCount === mission.totalLevels ? 'completed' : 
                           completedCount > 0 ? 'in-progress' : 'available';

          const updatedMission = {
            ...mission,
            levels: updatedLevels,
            completedLevels: completedCount,
            status: newStatus as Mission['status'],
          };

          if (selectedMission?.id === missionId) {
            setSelectedMission(updatedMission);
          }

          return updatedMission;
        }
        return mission;
      })
    );
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'available': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Mission['status']) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'available': return 'Доступно';
      default: return 'Заблокировано';
    }
  };

  if (!isUnlocked) {
    return (
      <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 text-center">
        <div className="space-y-4">
          <div className="text-6xl opacity-50">🔒</div>
          <h3 className="text-2xl font-bold text-gray-700">Миссии заблокированы</h3>
          <p className="text-gray-600">
            Реши загадку про спасение морских птиц, чтобы открыть доступ к миссиям
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission, index) => (
          <Card
            key={mission.id}
            className={`p-6 transition-all duration-300 hover:shadow-xl animate-fade-in cursor-pointer ${
              mission.status === 'locked' || !isUnlocked ? 'opacity-60 cursor-not-allowed' : 'hover-scale'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => openMission(mission)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{mission.icon}</div>
              <Badge className={getStatusColor(mission.status)}>
                {getStatusText(mission.status)}
              </Badge>
            </div>

            <h3 className="text-xl font-bold mb-2 text-gray-900">{mission.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{mission.subject}</p>
            <p className="text-sm text-gray-700 mb-4">{mission.description}</p>

            {mission.status === 'locked' && mission.requiredLevel && (
              <div className="flex items-center gap-2 text-sm text-amber-600 mb-3">
                <Icon name="Lock" size={16} />
                <span>Требуется уровень {mission.requiredLevel}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Прогресс</span>
                <span className="font-semibold text-gray-900">
                  {mission.completedLevels} / {mission.totalLevels}
                </span>
              </div>
              <Progress value={(mission.completedLevels / mission.totalLevels) * 100} className="h-2" />
            </div>

            {mission.status !== 'locked' && isUnlocked && (
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={(e) => {
                  e.stopPropagation();
                  openMission(mission);
                }}
              >
                {mission.status === 'completed' ? 'Повторить' : 'Начать миссию'}
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMission && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-6xl">{selectedMission.icon}</div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedMission.title}</DialogTitle>
                    <Badge className="mt-2">{selectedMission.subject}</Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4">
                <p className="text-gray-700 mb-6">{selectedMission.description}</p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Общий прогресс</span>
                    <span className="text-lg font-bold text-purple-600">
                      {selectedMission.completedLevels} / {selectedMission.totalLevels}
                    </span>
                  </div>
                  <Progress 
                    value={(selectedMission.completedLevels / selectedMission.totalLevels) * 100} 
                    className="h-3"
                  />
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Уровни миссии</h3>
                
                {activeRiddleLevel ? (
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={() => setActiveRiddleLevel(null)}
                      className="mb-4"
                    >
                      <Icon name="ArrowLeft" size={18} className="mr-2" />
                      Вернуться к уровням
                    </Button>
                    <LevelRiddle 
                      levelId={activeRiddleLevel} 
                      onSolved={handleRiddleSolved}
                      coins={coins}
                      onCoinsChange={onCoinsChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedMission.levels.map((level, index) => (
                      <Card
                        key={level.id}
                        className={`p-4 transition-all duration-300 ${
                          level.status === 'locked' 
                            ? 'opacity-50 bg-gray-50' 
                            : level.status === 'completed'
                            ? 'bg-green-50 border-green-300'
                            : 'bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                level.status === 'completed' ? 'bg-green-500 text-white' :
                                level.status === 'available' ? 'bg-blue-500 text-white' :
                                'bg-gray-300 text-gray-600'
                              }`}>
                                {level.status === 'completed' ? '✓' : index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{level.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Icon name="Star" size={14} className="text-amber-500" />
                                  <span>{level.points} баллов</span>
                                  {level.id >= 2 && level.id <= 4 && (
                                    <Badge variant="outline" className="text-xs ml-2">
                                      <Icon name="Brain" size={12} className="mr-1" />
                                      Загадка
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 ml-11">{level.description}</p>
                          </div>

                          {level.status === 'available' && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 animate-pulse"
                              onClick={() => startLevel(level.id)}
                            >
                              Пройти
                            </Button>
                          )}
                          
                          {level.status === 'completed' && (
                            <Badge className="bg-green-500">
                              <Icon name="Check" size={14} className="mr-1" />
                              Пройдено
                            </Badge>
                          )}

                          {level.status === 'locked' && (
                            <Badge variant="outline" className="text-gray-500">
                              <Icon name="Lock" size={14} className="mr-1" />
                              Закрыто
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}