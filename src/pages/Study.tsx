
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, FileText, Video, BookOpenCheck } from 'lucide-react';

const Study: React.FC = () => {
  const [activeTab, setActiveTab] = useState("conteudo");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Dados de exemplo da sessão de estudo atual
  const currentSession = {
    subject: 'Matemática',
    topic: 'Geometria Analítica',
    duration: 60,
    materials: [
      { id: 1, type: 'reading', title: 'Princípios de Geometria Analítica', icon: <FileText className="h-5 w-5" />, completed: false },
      { id: 2, type: 'video', title: 'Geometria Analítica na prática', icon: <Video className="h-5 w-5" />, completed: false },
      { id: 3, type: 'exercises', title: 'Exercícios de fixação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
    ]
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header com informações da sessão */}
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display">
                  {currentSession.subject}: {currentSession.topic}
                </h1>
                <p className="text-muted-foreground">
                  Duração estimada: {currentSession.duration} minutos
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Card className="border-none bg-primary text-primary-foreground">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-white/10">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tempo de Estudo</p>
                      <p className="text-2xl font-mono">{timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={toggleTimer}
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        {timerActive ? 'Pausar' : 'Iniciar'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={resetTimer}
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        Reiniciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar com materiais */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Materiais de Estudo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSession.materials.map((material) => (
                      <div 
                        key={material.id} 
                        className="flex items-center p-3 rounded-lg border hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className="p-2 rounded-full bg-primary/10 mr-3">
                          {material.icon}
                        </div>
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{material.type}</p>
                        </div>
                        <div className="ml-auto">
                          <CheckCircle className={`h-5 w-5 ${material.completed ? 'text-green-500' : 'text-muted-foreground/30'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Área de conteúdo principal */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-2">
                  <Tabs defaultValue="conteudo" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                      <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
                      <TabsTrigger value="anotacoes">Anotações</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <TabsContent value="conteudo" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Princípios de Geometria Analítica</h2>
                      <p className="text-muted-foreground">
                        A Geometria Analítica é um campo da matemática que une a álgebra e a geometria, 
                        permitindo que problemas geométricos sejam estudados através de equações algébricas.
                      </p>
                      <h3 className="text-lg font-medium mt-4">Principais conceitos:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Plano cartesiano e coordenadas</li>
                        <li>Distância entre dois pontos</li>
                        <li>Equação da reta</li>
                        <li>Equação da circunferência</li>
                        <li>Cônicas: elipse, hipérbole e parábola</li>
                      </ul>
                      <div className="p-4 bg-secondary/50 rounded-lg mt-4">
                        <h4 className="font-medium">Fórmula da distância entre dois pontos:</h4>
                        <p className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                          d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="exercicios" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Exercícios de Geometria Analítica</h2>
                      <div className="space-y-6">
                        <div className="p-4 border rounded-lg">
                          <p className="font-medium">Exercício 1:</p>
                          <p className="mt-2">
                            Calcule a distância entre os pontos A(3, 4) e B(7, 9).
                          </p>
                          <Button className="mt-4" variant="outline" size="sm">Ver resposta</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="font-medium">Exercício 2:</p>
                          <p className="mt-2">
                            Determine a equação da reta que passa pelos pontos P(2, 3) e Q(-1, 5).
                          </p>
                          <Button className="mt-4" variant="outline" size="sm">Ver resposta</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="font-medium">Exercício 3:</p>
                          <p className="mt-2">
                            Verifique se os pontos A(1, 2), B(4, 6) e C(7, 10) são colineares.
                          </p>
                          <Button className="mt-4" variant="outline" size="sm">Ver resposta</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="anotacoes" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Suas Anotações</h2>
                      <div className="p-4 border rounded-lg min-h-[300px]">
                        <textarea 
                          className="w-full h-full min-h-[250px] bg-transparent outline-none resize-none" 
                          placeholder="Digite suas anotações aqui..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button>Salvar Anotações</Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Study;
