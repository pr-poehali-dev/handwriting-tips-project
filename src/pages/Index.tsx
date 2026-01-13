import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Exercise {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  completed: boolean;
}

interface Recommendation {
  id: string;
  title: string;
  content: string;
  icon: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      title: 'Базовые наклонные линии',
      category: 'Основы',
      difficulty: 'easy',
      description: 'Отработка равномерного наклона и интервалов между штрихами',
      completed: true,
    },
    {
      id: '2',
      title: 'Строчные буквы а, о, с',
      category: 'Буквы',
      difficulty: 'easy',
      description: 'Изучение округлых форм в строчных буквах',
      completed: true,
    },
    {
      id: '3',
      title: 'Соединения букв',
      category: 'Буквы',
      difficulty: 'medium',
      description: 'Плавные переходы между буквами в словах',
      completed: false,
    },
    {
      id: '4',
      title: 'Заглавные буквы A, B, C',
      category: 'Буквы',
      difficulty: 'medium',
      description: 'Отработка пропорций и декоративных элементов',
      completed: false,
    },
    {
      id: '5',
      title: 'Короткие фразы',
      category: 'Фразы',
      difficulty: 'hard',
      description: 'Написание коротких предложений с сохранением стиля',
      completed: false,
    },
  ]);

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Правильная посадка',
      content: 'Сидите прямо, спина опирается на спинку стула. Расстояние до бумаги — 30-35 см. Локти не должны висеть в воздухе.',
      icon: 'User',
    },
    {
      id: '2',
      title: 'Положение ручки',
      content: 'Держите ручку под углом 50-60° к бумаге. Захват должен быть расслабленным, на расстоянии 1-1.5 см от кончика.',
      icon: 'Pencil',
    },
    {
      id: '3',
      title: 'Движение руки',
      content: 'Пишите движением всей руки, а не только пальцев. Используйте плечо и предплечье для плавных линий.',
      icon: 'Hand',
    },
    {
      id: '4',
      title: 'Ритм письма',
      content: 'Поддерживайте равномерный темп. Не спешите — качество важнее скорости на этапе обучения.',
      icon: 'Clock',
    },
    {
      id: '5',
      title: 'Регулярная практика',
      content: 'Занимайтесь 15-20 минут ежедневно. Короткие регулярные сессии эффективнее долгих редких занятий.',
      icon: 'Calendar',
    },
    {
      id: '6',
      title: 'Качество инструментов',
      content: 'Используйте качественную бумагу с разметкой и удобную ручку. Хорошие материалы облегчают обучение.',
      icon: 'Package',
    },
  ];

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const totalExercises = exercises.length;
  const progressPercentage = (completedExercises / totalExercises) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'hard': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleExerciseComplete = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="PenTool" className="text-white" size={24} />
            </div>
            <h1 className="text-5xl font-bold font-heading bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Мастерская Почерка
            </h1>
          </div>
          <p className="text-slate-600 text-lg ml-15">
            Развивайте красивый почерк с персональным трекингом прогресса
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-white shadow-sm">
            <TabsTrigger value="home" className="text-base data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="exercises" className="text-base data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Упражнения
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-base data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              <Icon name="Lightbulb" size={18} className="mr-2" />
              Рекомендации
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-3xl font-heading flex items-center gap-3">
                  <Icon name="Target" size={32} />
                  Ваш прогресс
                </CardTitle>
                <CardDescription className="text-indigo-100 text-base">
                  Отслеживайте свои достижения в каллиграфии
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Выполнено упражнений</span>
                    <span className="text-2xl font-bold">{completedExercises} / {totalExercises}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-white/20" />
                  <p className="text-indigo-100 text-sm">
                    {progressPercentage === 100 ? 'Отличная работа! Все упражнения завершены!' : `Осталось ${totalExercises - completedExercises} упражнений`}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <Icon name="Award" size={28} className="mx-auto mb-2" />
                    <div className="text-3xl font-bold">{completedExercises}</div>
                    <div className="text-sm text-indigo-100">Достижений</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <Icon name="TrendingUp" size={28} className="mx-auto mb-2" />
                    <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-indigo-100">Прогресс</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <Icon name="Flame" size={28} className="mx-auto mb-2" />
                    <div className="text-3xl font-bold">7</div>
                    <div className="text-sm text-indigo-100">Дней подряд</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                <Icon name="BookMarked" size={24} className="text-indigo-600" />
                Рекомендованные упражнения
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {exercises.filter(ex => !ex.completed).slice(0, 2).map((exercise, idx) => (
                  <Card key={exercise.id} className="border-none shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty === 'easy' && 'Легко'}
                          {exercise.difficulty === 'medium' && 'Средне'}
                          {exercise.difficulty === 'hard' && 'Сложно'}
                        </Badge>
                        <Badge variant="outline" className="bg-slate-50">
                          {exercise.category}
                        </Badge>
                      </div>
                      <CardTitle className="font-heading">{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-indigo-500 hover:bg-indigo-600" onClick={() => toggleExerciseComplete(exercise.id)}>
                        <Icon name="PlayCircle" size={18} className="mr-2" />
                        Начать упражнение
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-heading font-bold">Все упражнения</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-sm">
                  <Icon name="BookOpen" size={14} className="mr-1" />
                  {totalExercises} упражнений
                </Badge>
              </div>
            </div>

            {['Основы', 'Буквы', 'Фразы'].map(category => {
              const categoryExercises = exercises.filter(ex => ex.category === category);
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-heading font-semibold flex items-center gap-2 text-indigo-600">
                    <Icon name="FolderOpen" size={20} />
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryExercises.map((exercise, idx) => (
                      <Card 
                        key={exercise.id} 
                        className={`border-2 transition-all hover:shadow-lg animate-slide-up ${
                          exercise.completed ? 'border-green-200 bg-green-50/50' : 'border-slate-200 hover:border-indigo-300'
                        }`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getDifficultyColor(exercise.difficulty)}>
                              {exercise.difficulty === 'easy' && 'Легко'}
                              {exercise.difficulty === 'medium' && 'Средне'}
                              {exercise.difficulty === 'hard' && 'Сложно'}
                            </Badge>
                            {exercise.completed && (
                              <Icon name="CheckCircle" className="text-green-600" size={24} />
                            )}
                          </div>
                          <CardTitle className="text-lg font-heading">{exercise.title}</CardTitle>
                          <CardDescription className="text-sm">{exercise.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant={exercise.completed ? "outline" : "default"}
                            className={exercise.completed ? "w-full" : "w-full bg-indigo-500 hover:bg-indigo-600"}
                            onClick={() => toggleExerciseComplete(exercise.id)}
                          >
                            {exercise.completed ? (
                              <>
                                <Icon name="RotateCcw" size={18} className="mr-2" />
                                Повторить
                              </>
                            ) : (
                              <>
                                <Icon name="Play" size={18} className="mr-2" />
                                Начать
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="recommendations" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-3xl font-heading font-bold mb-2">Рекомендации по технике</h2>
              <p className="text-slate-600">Изучите основные принципы красивого письма</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <Card 
                  key={rec.id} 
                  className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Icon name={rec.icon} className="text-white" size={28} />
                    </div>
                    <CardTitle className="font-heading text-xl">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{rec.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-none shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Sparkles" size={28} className="text-purple-600" />
                  Совет дня
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Начинайте каждую тренировку с разминки руки: напишите несколько строк базовых линий и кругов. 
                  Это подготовит мышцы и улучшит контроль над ручкой. Помните: расслабленная рука — это ключ к плавным линиям!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
