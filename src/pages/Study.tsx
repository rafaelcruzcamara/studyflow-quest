
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, FileText, Video, BookOpenCheck } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Study: React.FC = () => {
  const [activeTab, setActiveTab] = useState("conteudo");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dados de exemplo da sessão de estudo atual
  const currentSession = {
    subject: 'Matemática',
    topic: 'Geometria Analítica',
    duration: 60,
    materials: [
      { id: 1, type: 'reading', title: 'Princípios de Geometria Analítica', icon: <FileText className="h-5 w-5" />, completed: false },
      { id: 2, type: 'video', title: 'Geometria Analítica na prática', icon: <Video className="h-5 w-5" />, completed: false, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 3, type: 'exercises', title: 'Exercícios de fixação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(interval);
            setTimerActive(false);
            toast({
              title: "Tempo finalizado!",
              description: "Sua sessão de estudo foi concluída.",
            });
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerMinutes, timerSeconds, timerActive]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const toggleShowAnswer = (exerciseId: number) => {
    setShowAnswer(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const markMaterialAsCompleted = (materialId: number) => {
    // In a real app, this would update the backend
    toast({
      title: "Material marcado como concluído",
      description: "Seu progresso foi atualizado!",
    });
  };

  const handleSelectMaterial = (id: number) => {
    setSelectedMaterial(id);
    
    // Switch to the appropriate tab based on material type
    const material = currentSession.materials.find(m => m.id === id);
    if (material) {
      if (material.type === 'reading' || material.type === 'video') {
        setActiveTab('conteudo');
      } else if (material.type === 'exercises') {
        setActiveTab('exercicios');
      }
    }
  };

  const renderSelectedContent = () => {
    const material = currentSession.materials.find(m => m.id === selectedMaterial);
    
    if (!material) return null;
    
    if (material.type === 'video' && 'src' in material) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{material.title}</h2>
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            <video 
              ref={videoRef}
              className="w-full h-full" 
              controls
              src={material.src as string}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => markMaterialAsCompleted(material.id)}>
              Marcar como concluído
            </Button>
          </div>
        </div>
      );
    }
    
    return (
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
        <div className="flex justify-end">
          <Button onClick={() => markMaterialAsCompleted(material.id)}>
            Marcar como concluído
          </Button>
        </div>
      </div>
    );
  };

  const renderExercises = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Exercícios de Geometria Analítica</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((exerciseId) => (
            <div key={exerciseId} className="p-4 border rounded-lg">
              <p className="font-medium">Exercício {exerciseId}:</p>
              <p className="mt-2">
                {exerciseId === 1 && "Calcule a distância entre os pontos A(3, 4) e B(7, 9)."}
                {exerciseId === 2 && "Determine a equação da reta que passa pelos pontos P(2, 3) e Q(-1, 5)."}
                {exerciseId === 3 && "Verifique se os pontos A(1, 2), B(4, 6) e C(7, 10) são colineares."}
              </p>
              
              {showAnswer[exerciseId] && (
                <div className="mt-3 p-3 bg-secondary/30 rounded-lg">
                  <p className="font-medium">Resposta:</p>
                  <p>
                    {exerciseId === 1 && "d = √[(7-3)² + (9-4)²] = √[16 + 25] = √41 ≈ 6,40"}
                    {exerciseId === 2 && "Usando a fórmula (y - y₁) = m(x - x₁), onde m = (y₂ - y₁)/(x₂ - x₁) = (5-3)/(-1-2) = 2/(-3) = -2/3. Logo, (y - 3) = -2/3(x - 2), que resulta em y = -2x/3 + 11/3."}
                    {exerciseId === 3 && "Para verificar se os pontos são colineares, calculamos a inclinação entre A e B: (6-2)/(4-1) = 4/3, e entre B e C: (10-6)/(7-4) = 4/3. Como as inclinações são iguais, os pontos são colineares."}
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleShowAnswer(exerciseId)}
                >
                  {showAnswer[exerciseId] ? "Ocultar resposta" : "Ver resposta"}
                </Button>
                <Button size="sm">
                  Enviar minha resposta
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedMaterial === material.id ? 'bg-secondary/70 border-primary/30' : 'hover:bg-secondary/50'}`}
                        onClick={() => handleSelectMaterial(material.id)}
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
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                      <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
                      <TabsTrigger value="anotacoes">Anotações</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} className="w-full">
                    <TabsContent value="conteudo" className="pt-4">
                      {renderSelectedContent()}
                    </TabsContent>
                    <TabsContent value="exercicios" className="pt-4">
                      {renderExercises()}
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
                          <Button onClick={() => toast({
                            title: "Anotações salvas",
                            description: "Suas anotações foram salvas com sucesso!"
                          })}>
                            Salvar Anotações
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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
