import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudyPlan from '../components/StudyPlan';
import ProgressTracker from '../components/ProgressTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, LightbulbIcon, CalendarDays, BookMarked, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = currentTime.getHours();
      if (hour < 12) {
        setGreeting('Bom dia');
      } else if (hour < 18) {
        setGreeting('Boa tarde');
      } else {
        setGreeting('Boa noite');
      }
    };

    updateGreeting();
  }, [currentTime]);

  const nextSessions = [
    {
      subject: 'Matemática',
      topic: 'Geometria Analítica',
      time: '08:30',
      duration: 60,
    },
    {
      subject: 'Física',
      topic: 'Eletromagnetismo',
      time: '10:00',
      duration: 45,
    },
    {
      subject: 'Química',
      topic: 'Ligações Químicas',
      time: '14:30',
      duration: 60,
    },
  ];

  const recommendedResources = [
    {
      title: 'Fundamentos da Física Vol. 3',
      type: 'Livro',
      subject: 'Física',
      icon: <BookMarked className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: 'Exercícios de Geometria Analítica',
      type: 'Exercícios',
      subject: 'Matemática',
      icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Átomos e Elementos Químicos',
      type: 'Videoaula',
      subject: 'Química',
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 border-green-200',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display">
                  {greeting}, João!
                </h1>
                <p className="text-muted-foreground">
                  {currentTime.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hora atual</p>
                  <p className="text-xl font-bold">{currentTime.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-primary text-primary-foreground border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Próxima Sessão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{nextSessions[0].subject}</h3>
                      <p className="text-primary-foreground/80">{nextSessions[0].topic}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-mono">{nextSessions[0].time}</p>
                      <p className="text-primary-foreground/80">{nextSessions[0].duration} min</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      to="/study" 
                      className="block w-full py-2 text-center bg-white/10 hover:bg-white/20 
                        rounded-md transition-colors text-sm font-medium"
                    >
                      Começar agora
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    Agenda do dia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nextSessions.map((session, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg border bg-card hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-primary/10 mr-3">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{session.subject}</p>
                            <p className="text-sm text-muted-foreground">{session.topic}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono">{session.time}</p>
                          <p className="text-sm text-muted-foreground">{session.duration} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StudyPlan />
            <ProgressTracker />
          </div>
          
          {/* Recommendations */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-display">
                  <LightbulbIcon className="h-5 w-5 mr-2 text-primary" />
                  Recomendações para você
                </CardTitle>
                <CardDescription>
                  Recursos selecionados com base no seu plano de estudos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedResources.map((resource, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg border p-3 cursor-pointer transition-all hover:shadow-md ${resource.color}`}
                    >
                      <div className="flex items-start mb-2">
                        <div className="p-2 rounded-full bg-white/50 mr-3">
                          {resource.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{resource.type}</p>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground">{resource.subject}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t text-center">
                        <Link to="/study" className="text-sm text-primary font-medium">
                          Ver recurso
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
