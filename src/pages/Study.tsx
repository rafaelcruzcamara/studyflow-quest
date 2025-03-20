
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, FileText, Video, BookOpenCheck, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Expanded data structure with educational grade level filtering
const studyMaterials = {
  fundamental: {
    '1': [
      {
        subject: 'Matemática',
        topic: 'Adição e Subtração',
        materials: [
          { id: 1, type: 'reading', title: 'Aprendendo a Somar e Subtrair', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Vídeo: Números e Operações', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/SnBKlm-Qn2E", 
            description: "Este vídeo ensina os conceitos básicos de adição e subtração para crianças, usando exemplos visuais e divertidos." },
          { id: 3, type: 'exercises', title: 'Exercícios de Adição e Subtração', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Português',
        topic: 'Alfabetização',
        materials: [
          { id: 4, type: 'reading', title: 'Vogais e Consoantes', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Alfabeto Completo', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/hzmcUTWym6A", 
            description: "Aula completa sobre o alfabeto, com pronúncia e exemplos de palavras para cada letra." },
          { id: 6, type: 'exercises', title: 'Atividades de Alfabetização', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    // Additional grades can be added similarly
  },
  medio: {
    '1': [
      {
        subject: 'Matemática',
        topic: 'Geometria Analítica',
        materials: [
          { id: 1, type: 'reading', title: 'Princípios de Geometria Analítica', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Geometria Analítica na prática', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/q2vqE4Sv7-8", 
            description: "Esta aula aborda os conceitos fundamentais da geometria analítica, incluindo coordenadas cartesianas, equações de retas e cônicas." },
          { id: 3, type: 'exercises', title: 'Exercícios de fixação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Física',
        topic: 'Cinemática',
        materials: [
          { id: 4, type: 'reading', title: 'Movimento Retilíneo Uniforme', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Conceitos de Cinemática', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/7K0ylbgQtV8", 
            description: "Aula completa sobre os princípios da cinemática, com exemplos práticos de movimento retilíneo uniforme e uniformemente variado." },
          { id: 6, type: 'exercises', title: 'Problemas de Cinemática', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    // Additional grades can be added similarly
  },
  superior: {
    '1': [
      {
        subject: 'Cálculo',
        topic: 'Limites e Derivadas',
        materials: [
          { id: 1, type: 'reading', title: 'Introdução ao Cálculo Diferencial', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Vídeo: Limites e Continuidade', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/riXcZT2ICjA", 
            description: "Esta aula aborda os conceitos fundamentais de limites, continuidade e introdução às derivadas no cálculo diferencial." },
          { id: 3, type: 'exercises', title: 'Exercícios de Derivadas', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Programação',
        topic: 'Algoritmos e Estruturas de Dados',
        materials: [
          { id: 4, type: 'reading', title: 'Algoritmos Básicos', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Introdução à Programação', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/8mei6uVttho", 
            description: "Aula introdutória sobre algoritmos e lógica de programação, abordando conceitos fundamentais para iniciantes." },
          { id: 6, type: 'exercises', title: 'Desafios de Programação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    // Additional grades can be added similarly
  }
};

const Study: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("conteudo");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  
  // Get user's education level and grade from auth context
  const userLevel = user?.educationLevel || 'medio';  // Default to 'medio' if not set
  const userGrade = user?.grade || '1';  // Default to '1' if not set

  useEffect(() => {
    // Initialize available subjects based on user's education level and grade
    if (userLevel && userGrade && studyMaterials[userLevel as keyof typeof studyMaterials]?.[userGrade as any]) {
      const subjects = studyMaterials[userLevel as keyof typeof studyMaterials][userGrade as any];
      setAvailableSubjects(subjects);
      
      // Select first subject by default
      if (subjects.length > 0 && !selectedSubject) {
        setSelectedSubject(subjects[0].subject);
        setCurrentSession(subjects[0]);
        
        // Select first material by default
        if (subjects[0].materials.length > 0) {
          setSelectedMaterial(subjects[0].materials[0].id);
        }
      }
    }
  }, [userLevel, userGrade, selectedSubject]);

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
    toast({
      title: "Material marcado como concluído",
      description: "Seu progresso foi atualizado!",
    });
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    const newSession = availableSubjects.find(s => s.subject === subject);
    setCurrentSession(newSession);
    
    // Select first material by default
    if (newSession && newSession.materials.length > 0) {
      setSelectedMaterial(newSession.materials[0].id);
      
      // Switch to the appropriate tab based on material type
      if (newSession.materials[0].type === 'reading' || newSession.materials[0].type === 'video') {
        setActiveTab('conteudo');
      } else if (newSession.materials[0].type === 'exercises') {
        setActiveTab('exercicios');
      }
    }
  };

  const handleSelectMaterial = (id: number) => {
    setSelectedMaterial(id);
    
    if (!currentSession) return;
    
    // Switch to the appropriate tab based on material type
    const material = currentSession.materials.find((m: any) => m.id === id);
    if (material) {
      if (material.type === 'reading' || material.type === 'video') {
        setActiveTab('conteudo');
      } else if (material.type === 'exercises') {
        setActiveTab('exercicios');
      }
    }
  };

  const renderSelectedContent = () => {
    if (!currentSession) return null;
    
    const material = currentSession.materials.find((m: any) => m.id === selectedMaterial);
    
    if (!material) return null;
    
    if (material.type === 'video' && 'src' in material) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{material.title}</h2>
          
          {material.description && (
            <p className="text-muted-foreground mb-4">{material.description}</p>
          )}
          
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            <iframe 
              ref={videoRef}
              className="w-full h-full" 
              src={material.src}
              title={material.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Sobre este vídeo</h3>
            <p className="text-muted-foreground">
              Este vídeo faz parte do curso de {currentSession.subject} sobre {currentSession.topic}.
              Assista com atenção e faça anotações para melhor compreensão do conteúdo.
            </p>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h4 className="font-medium mb-2">Pontos importantes:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Preste atenção aos conceitos fundamentais apresentados</li>
                <li>Pause o vídeo para fazer anotações quando necessário</li>
                <li>Tente resolver os exemplos antes de ver a solução</li>
                <li>Após assistir, faça os exercícios relacionados para fixação</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => markMaterialAsCompleted(material.id)}>
              Marcar como concluído
            </Button>
          </div>
        </div>
      );
    }
    
    if (material.type === 'reading') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {currentSession.subject}: {currentSession.topic}
          </h2>
          
          {currentSession.subject === 'Matemática' && currentSession.topic === 'Geometria Analítica' && (
            <>
              <p className="text-muted-foreground">
                A Geometria Analítica é um campo da matemática que une a álgebra e a geometria, 
                permitindo que problemas geométricos sejam estudados através de equações algébricas.
              </p>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Objetivos de Aprendizagem</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Compreender o sistema de coordenadas cartesianas</li>
                  <li>Aprender a representar pontos, retas e figuras no plano</li>
                  <li>Aplicar fórmulas para calcular distâncias e áreas</li>
                  <li>Resolver problemas envolvendo equações de retas e cônicas</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Sistema de Coordenadas Cartesianas</h3>
              <p>
                O sistema de coordenadas cartesianas consiste em dois eixos perpendiculares:
                o eixo horizontal (eixo x) e o eixo vertical (eixo y). Qualquer ponto no plano
                pode ser localizado através de um par ordenado de números (x, y).
              </p>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-4">
                <h4 className="font-medium">Exemplo:</h4>
                <p className="mt-2">
                  O ponto A tem coordenadas (3, 4), significando que está localizado
                  3 unidades à direita da origem no eixo x e 4 unidades acima no eixo y.
                </p>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Distância entre dois pontos</h3>
              <p>
                Para calcular a distância entre dois pontos A(x₁, y₁) e B(x₂, y₂),
                utilizamos a fórmula:
              </p>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-2">
                <h4 className="font-medium">Fórmula da distância:</h4>
                <p className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                  d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                </p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mt-4">
                <h4 className="font-medium mb-2">Exemplo resolvido:</h4>
                <p>Calcular a distância entre os pontos P(2, 3) e Q(5, 7):</p>
                <p className="font-mono mt-2">
                  d = √[(5 - 2)² + (7 - 3)²]<br/>
                  d = √[9 + 16]<br/>
                  d = √25<br/>
                  d = 5
                </p>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Equação da Reta</h3>
              <p>
                A equação geral da reta é dada por: ax + by + c = 0. Existem várias formas de
                representar uma reta, como:
              </p>
              
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Forma reduzida:</strong> y = mx + n, onde m é o coeficiente angular (inclinação) e n é o coeficiente linear</li>
                <li><strong>Equação segmentária:</strong> x/a + y/b = 1, onde a e b são os interceptos nos eixos x e y</li>
                <li><strong>Equação paramétrica:</strong> x = x₀ + tv₁, y = y₀ + tv₂, onde (x₀, y₀) é um ponto da reta e v = (v₁, v₂) é um vetor diretor</li>
              </ul>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-4">
                <h4 className="font-medium">Coeficiente Angular (m):</h4>
                <p className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                  m = (y₂ - y₁) / (x₂ - x₁)
                </p>
                <p className="mt-2 text-sm">
                  O coeficiente angular representa a inclinação da reta em relação ao eixo x.
                </p>
              </div>
            </>
          )}
          
          {currentSession.subject === 'Português' && currentSession.topic === 'Alfabetização' && (
            <>
              <p className="text-muted-foreground">
                A alfabetização é o processo de aprendizagem onde se desenvolve a habilidade de ler e escrever.
                É uma das etapas mais importantes na educação de uma criança.
              </p>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Objetivos de Aprendizagem</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Conhecer todas as letras do alfabeto</li>
                  <li>Compreender a diferença entre vogais e consoantes</li>
                  <li>Formar sílabas e palavras simples</li>
                  <li>Desenvolver a leitura de pequenos textos</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-medium mt-6">O Alfabeto</h3>
              <p>
                O alfabeto da língua portuguesa é composto por 26 letras:
              </p>
              
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
                  <div key={letter} className="flex items-center justify-center h-10 rounded-md bg-secondary/50 font-bold">
                    {letter}
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium mt-6">Vogais e Consoantes</h3>
              <p>
                As letras do alfabeto são divididas em vogais e consoantes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 bg-blue-100/50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Vogais</h4>
                  <div className="flex justify-between">
                    {['A', 'E', 'I', 'O', 'U'].map((letter) => (
                      <div key={letter} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 font-bold text-blue-800">
                        {letter}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm">
                    Vogais são os sons produzidos sem obstrução da passagem de ar pela boca.
                  </p>
                </div>
                
                <div className="p-4 bg-green-100/50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Consoantes</h4>
                  <p className="text-sm">
                    As consoantes são todas as outras letras do alfabeto que não são vogais.
                    Elas são produzidas com alguma obstrução da passagem de ar.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Formação de Sílabas</h3>
              <p>
                Sílabas são unidades fonológicas que compõem as palavras. A maioria das sílabas
                em português é formada por uma consoante seguida de uma vogal (CV).
              </p>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-3">
                <h4 className="font-medium mb-2">Exemplos de sílabas:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['BA', 'BE', 'BI', 'BO', 'BU', 'CA', 'CE', 'CI', 'CO', 'CU', 'DA', 'DE', 'DI', 'DO', 'DU', 'FA'].map((syllable) => (
                    <div key={syllable} className="flex items-center justify-center h-10 rounded-md bg-white/70 font-bold">
                      {syllable}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-end">
            <Button onClick={() => markMaterialAsCompleted(material.id)}>
              Marcar como concluído
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderExercises = () => {
    if (!currentSession) return null;
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Exercícios de {currentSession.topic}</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((exerciseId) => (
            <div key={exerciseId} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Exercício {exerciseId}:</p>
                <span className="px-2 py-1 bg-secondary/70 text-xs rounded-full">
                  {currentSession.subject}
                </span>
              </div>
              
              <p className="mt-2">
                {currentSession.subject === 'Matemática' && exerciseId === 1 && "Calcule a distância entre os pontos A(3, 4) e B(7, 9)."}
                {currentSession.subject === 'Matemática' && exerciseId === 2 && "Determine a equação da reta que passa pelos pontos P(2, 3) e Q(-1, 5)."}
                {currentSession.subject === 'Matemática' && exerciseId === 3 && "Verifique se os pontos A(1, 2), B(4, 6) e C(7, 10) são colineares."}
                
                {currentSession.subject === 'Português' && exerciseId === 1 && "Separe as sílabas das palavras: casa, escola, professor, livro."}
                {currentSession.subject === 'Português' && exerciseId === 2 && "Circule as vogais nas palavras: computador, biblioteca, estudante."}
                {currentSession.subject === 'Português' && exerciseId === 3 && "Forme palavras com as sílabas: CA, SA, ME, NI, NO, LA."}
                
                {currentSession.subject === 'Física' && exerciseId === 1 && "Um carro viaja a 72 km/h. Calcule essa velocidade em m/s."}
                {currentSession.subject === 'Física' && exerciseId === 2 && "Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Desprezando a resistência do ar e considerando g = 10 m/s², calcule a altura máxima atingida pelo objeto."}
                {currentSession.subject === 'Física' && exerciseId === 3 && "Um móvel parte do repouso e atinge a velocidade de 108 km/h em 15 segundos. Determine a aceleração do móvel em m/s²."}
              </p>
              
              {showAnswer[exerciseId] && (
                <div className="mt-3 p-3 bg-secondary/30 rounded-lg">
                  <p className="font-medium">Resposta:</p>
                  <p>
                    {currentSession.subject === 'Matemática' && exerciseId === 1 && "d = √[(7-3)² + (9-4)²] = √[16 + 25] = √41 ≈ 6,40"}
                    {currentSession.subject === 'Matemática' && exerciseId === 2 && "Usando a fórmula (y - y₁) = m(x - x₁), onde m = (y₂ - y₁)/(x₂ - x₁) = (5-3)/(-1-2) = 2/(-3) = -2/3. Logo, (y - 3) = -2/3(x - 2), que resulta em y = -2x/3 + 11/3."}
                    {currentSession.subject === 'Matemática' && exerciseId === 3 && "Para verificar se os pontos são colineares, calculamos a inclinação entre A e B: (6-2)/(4-1) = 4/3, e entre B e C: (10-6)/(7-4) = 4/3. Como as inclinações são iguais, os pontos são colineares."}
                    
                    {currentSession.subject === 'Português' && exerciseId === 1 && "ca-sa, es-co-la, pro-fes-sor, li-vro"}
                    {currentSession.subject === 'Português' && exerciseId === 2 && "cOmputAdOr, bIblIOtEcA, EstUdAntE"}
                    {currentSession.subject === 'Português' && exerciseId === 3 && "CASA, CANO, MENO, MELA, SALA, CAMELO, CAMISA, MENINO"}
                    
                    {currentSession.subject === 'Física' && exerciseId === 1 && "72 km/h = 72 × (1000/3600) = 20 m/s"}
                    {currentSession.subject === 'Física' && exerciseId === 2 && "Usando a equação v² = v₀² - 2gh, temos: 0 = 20² - 2×10×h → h = 400/20 = 20 metros"}
                    {currentSession.subject === 'Física' && exerciseId === 3 && "a = (vf - v0)/t = (108 km/h - 0)/15s = (108 × 1000/3600)/15 = 30/15 = 2 m/s²"}
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
                <div className="mb-4">
                  <Select value={selectedSubject || ''} onValueChange={handleSubjectChange}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Selecione a matéria" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((subject) => (
                        <SelectItem key={subject.subject} value={subject.subject}>
                          {subject.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {currentSession && (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">
                      {currentSession.subject}: {currentSession.topic}
                    </h1>
                    <p className="text-muted-foreground">
                      Conteúdo para {userLevel === 'fundamental' ? 'Ensino Fundamental' : 
                                     userLevel === 'medio' ? 'Ensino Médio' : 'Ensino Superior'} - 
                      {userLevel === 'superior' ? ` ${userGrade}º Período` : ` ${userGrade}º Ano`}
                    </p>
                  </>
                )}
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
                  {currentSession ? (
                    <div className="space-y-4">
                      {currentSession.materials.map((material: any) => (
                        <div 
                          key={material.id} 
                          className={cn(
                            "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                            selectedMaterial === material.id ? 'bg-secondary/70 border-primary/30' : 'hover:bg-secondary/50'
                          )}
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
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Selecione uma matéria para ver os materiais disponíveis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Progresso do Curso */}
              {currentSession && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Seu Progresso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Progresso geral</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      
                      <div className="p-3 bg-secondary/40 rounded-lg">
                        <p className="text-sm font-medium mb-1">Estatísticas</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-2xl font-bold">1</p>
                            <p className="text-xs text-muted-foreground">Concluídos</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-xs text-muted-foreground">Em andamento</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-xs text-muted-foreground">Minutos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
                  <div className="mt-4">
                    {activeTab === "conteudo" && renderSelectedContent()}
                    {activeTab === "exercicios" && renderExercises()}
                    {activeTab === "anotacoes" && (
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
                    )}
                  </div>
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
