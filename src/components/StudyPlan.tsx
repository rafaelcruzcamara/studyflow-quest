
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock, BookOpen, CheckCircle2, Brain, Award } from 'lucide-react';

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

type StudySession = {
  id: string;
  subject: string;
  topic: string;
  day: string;
  startTime: string;
  duration: number;
  completed: boolean;
};

// Sample data for the weekly plan
const sampleSessions: StudySession[] = [
  {
    id: '1',
    subject: 'Matemática',
    topic: 'Funções do 2º grau',
    day: 'Segunda',
    startTime: '08:00',
    duration: 60,
    completed: false,
  },
  {
    id: '2',
    subject: 'Física',
    topic: 'Leis de Newton',
    day: 'Segunda',
    startTime: '10:00',
    duration: 45,
    completed: false,
  },
  {
    id: '3',
    subject: 'Química',
    topic: 'Reações Químicas',
    day: 'Terça',
    startTime: '09:00',
    duration: 60,
    completed: false,
  },
  {
    id: '4',
    subject: 'Biologia',
    topic: 'Genética',
    day: 'Quarta',
    startTime: '08:00',
    duration: 90,
    completed: false,
  },
  {
    id: '5',
    subject: 'História',
    topic: 'Revolução Francesa',
    day: 'Quinta',
    startTime: '14:00',
    duration: 60,
    completed: false,
  },
  {
    id: '6',
    subject: 'Geografia',
    topic: 'Geopolítica',
    day: 'Sexta',
    startTime: '10:00',
    duration: 45,
    completed: false,
  },
  {
    id: '7',
    subject: 'Literatura',
    topic: 'Modernismo Brasileiro',
    day: 'Sábado',
    startTime: '09:00',
    duration: 120,
    completed: false,
  },
];

// Custom color mapping for subjects
const subjectColors: Record<string, string> = {
  'Matemática': 'bg-blue-100 border-blue-300 text-blue-700',
  'Física': 'bg-purple-100 border-purple-300 text-purple-700',
  'Química': 'bg-green-100 border-green-300 text-green-700',
  'Biologia': 'bg-red-100 border-red-300 text-red-700',
  'História': 'bg-amber-100 border-amber-300 text-amber-700',
  'Geografia': 'bg-teal-100 border-teal-300 text-teal-700',
  'Literatura': 'bg-indigo-100 border-indigo-300 text-indigo-700',
  'Inglês': 'bg-pink-100 border-pink-300 text-pink-700',
};

const StudyPlan: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [studySessions, setStudySessions] = useState<StudySession[]>(sampleSessions);
  
  const toggleSessionCompletion = (sessionId: string) => {
    setStudySessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, completed: !session.completed } 
          : session
      )
    );
  };

  const getSubjectColor = (subject: string) => {
    return subjectColors[subject] || 'bg-gray-100 border-gray-300 text-gray-700';
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const calculateTotalStudyTime = () => {
    return studySessions.reduce((total, session) => total + session.duration, 0);
  };

  const getTodaySessions = () => {
    const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0];
    return studySessions.filter(
      session => session.day.toLowerCase() === today.toLowerCase()
    );
  };

  const todaySessions = getTodaySessions();
  
  return (
    <Card className="w-full shadow-sm border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-display">
          <CalendarDays className="h-6 w-6 mr-2 text-primary" />
          Plano de Estudos
        </CardTitle>
        <CardDescription>
          Cronograma personalizado baseado nos seus objetivos
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none">
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="animate-fade-in">
            <div className="px-4 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
                {weekDays.map((day) => {
                  const daySessions = studySessions.filter(session => session.day === day);
                  
                  return (
                    <div key={day} className="flex flex-col">
                      <h3 className="text-sm font-medium mb-2 text-center py-1 bg-secondary rounded-md">
                        {day}
                      </h3>
                      <div className="flex-1 space-y-2">
                        {daySessions.length > 0 ? (
                          daySessions.map((session) => (
                            <div 
                              key={session.id} 
                              className={`p-2 rounded-md border ${getSubjectColor(session.subject)} transition-all ${
                                session.completed ? 'opacity-50' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium">{session.subject}</span>
                                <span className="text-xs flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(session.startTime)}
                                </span>
                              </div>
                              <p className="text-xs mb-2 truncate" title={session.topic}>
                                {session.topic}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">{session.duration} min</span>
                                <button 
                                  onClick={() => toggleSessionCompletion(session.id)}
                                  className={`p-1 rounded-full transition-colors ${
                                    session.completed 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                  }`}
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-xs text-muted-foreground">
                            Nenhuma sessão
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-4 p-3 rounded-xl bg-secondary/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tempo total</p>
                    <p className="text-2xl font-bold">{calculateTotalStudyTime()} min</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 rounded-xl bg-secondary/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Matérias</p>
                    <p className="text-2xl font-bold">
                      {new Set(studySessions.map(s => s.subject)).size}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 rounded-xl bg-secondary/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tópicos</p>
                    <p className="text-2xl font-bold">{studySessions.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="today" className="animate-fade-in px-4 pb-6">
            <div className="mt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  Hoje
                </h3>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              
              {todaySessions.length > 0 ? (
                <div className="space-y-3">
                  {todaySessions.map((session) => (
                    <div 
                      key={session.id} 
                      className={`p-4 rounded-lg border ${getSubjectColor(session.subject)} transition-all ${
                        session.completed ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{session.subject}</span>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          {formatTime(session.startTime)}
                        </span>
                      </div>
                      <p className="text-sm mb-3">
                        {session.topic}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{session.duration} minutos</span>
                        <Button 
                          variant={session.completed ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSessionCompletion(session.id)}
                          className={session.completed ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {session.completed ? "Concluído" : "Concluir"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Nenhuma sessão hoje</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Você não possui sessões de estudo programadas para hoje.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fade-in px-4 pb-6">
            <div className="flex justify-center mt-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between px-6 py-4 border-t">
        <Button variant="outline">Editar Plano</Button>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Começar a Estudar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlan;
