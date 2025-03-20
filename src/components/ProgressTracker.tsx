
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Target, Activity, BookOpen, Brain, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for the progress charts
const subjectProgress = [
  { subject: 'Matemática', progress: 78 },
  { subject: 'Física', progress: 65 },
  { subject: 'Química', progress: 45 },
  { subject: 'Biologia', progress: 89 },
  { subject: 'História', progress: 72 },
  { subject: 'Geografia', progress: 60 },
  { subject: 'Literatura', progress: 55 },
];

const weeklyActivity = [
  { day: 'Dom', hours: 1.5 },
  { day: 'Seg', hours: 2.8 },
  { day: 'Ter', hours: 1.2 },
  { day: 'Qua', hours: 3.5 },
  { day: 'Qui', hours: 2.0 },
  { day: 'Sex', hours: 1.7 },
  { day: 'Sáb', hours: 4.1 },
];

const studyDistribution = [
  { name: 'Matemática', value: 30 },
  { name: 'Física', value: 20 },
  { name: 'Química', value: 15 },
  { name: 'Biologia', value: 10 },
  { name: 'História', value: 10 },
  { name: 'Geografia', value: 8 },
  { name: 'Literatura', value: 7 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b', '#14b8a6', '#6366f1'];

const ProgressTracker: React.FC = () => {
  const totalStudyHours = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const completedTopics = 23;
  const totalTopics = 48;
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);

  const getProgressColor = (value: number) => {
    if (value < 30) return 'bg-red-500';
    if (value < 60) return 'bg-amber-500';
    if (value < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <Card className="w-full shadow-sm border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-display">
          <BarChart3 className="h-6 w-6 mr-2 text-primary" />
          Progresso
        </CardTitle>
        <CardDescription>
          Acompanhe seu desenvolvimento em cada matéria
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="subjects">Matérias</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in px-4 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tempo de estudo</h3>
                <p className="text-3xl font-bold">{totalStudyHours.toFixed(1)}h</p>
                <p className="text-xs text-muted-foreground">Esta semana</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tópicos concluídos</h3>
                <p className="text-3xl font-bold">{completedTopics}/{totalTopics}</p>
                <p className="text-xs text-muted-foreground">Tópicos totais</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Progresso geral</h3>
                <p className="text-3xl font-bold">{overallProgress}%</p>
                <p className="text-xs text-muted-foreground">Do plano de estudos</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Distribuição de estudos
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {studyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="animate-fade-in px-4 pb-6">
            <div className="mt-6 space-y-5">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <span className="text-sm font-mono">{subject.progress}%</span>
                  </div>
                  <Progress 
                    value={subject.progress} 
                    className={`h-2 ${getProgressColor(subject.progress)}`} 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="animate-fade-in px-4 pb-6">
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Atividade Semanal
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyActivity}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} horas`]} />
                    <Bar
                      dataKey="hours"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Tendências
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Matéria mais estudada</h4>
                  <p className="text-xl font-semibold">Matemática</p>
                  <p className="text-sm text-muted-foreground">8 horas neste mês</p>
                </div>
                
                <div className="p-4 rounded-xl border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Melhor desempenho</h4>
                  <p className="text-xl font-semibold">Biologia</p>
                  <p className="text-sm text-muted-foreground">89% de acerto nos exercícios</p>
                </div>
                
                <div className="p-4 rounded-xl border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Pico de produtividade</h4>
                  <p className="text-xl font-semibold">Sábado</p>
                  <p className="text-sm text-muted-foreground">Média de 3.8 horas</p>
                </div>
                
                <div className="p-4 rounded-xl border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Próxima meta</h4>
                  <p className="text-xl font-semibold">Química</p>
                  <p className="text-sm text-muted-foreground">+15% de progresso necessário</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
