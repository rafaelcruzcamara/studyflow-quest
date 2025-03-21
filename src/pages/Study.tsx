
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import study components
import { studyMaterials, StudySession, Material } from '@/components/study/StudyMaterials';
import StudyTimer from '@/components/study/StudyTimer';
import MaterialsList from '@/components/study/MaterialsList';
import ProgressTrack from '@/components/study/ProgressTrack';
import VideoPlayer from '@/components/study/VideoPlayer';
import ReadingContent from '@/components/study/ReadingContent';
import ExerciseContent from '@/components/study/ExerciseContent';
import StudyNotes from '@/components/study/StudyNotes';
import { toast } from "@/components/ui/use-toast";

const Study: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("conteudo");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<StudySession[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  
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

  const markMaterialAsCompleted = (materialId: number) => {
    if (!currentSession) return;
    
    const updatedMaterials = currentSession.materials.map((material: Material) => 
      material.id === materialId ? { ...material, completed: true } : material
    );
    
    setCurrentSession({
      ...currentSession,
      materials: updatedMaterials
    });
    
    toast({
      title: "Material marcado como concluído",
      description: "Seu progresso foi atualizado!",
    });
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    const newSession = availableSubjects.find(s => s.subject === subject);
    setCurrentSession(newSession || null);
    
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
    const material = currentSession.materials.find((m: Material) => m.id === id);
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
    
    const material = currentSession.materials.find((m: Material) => m.id === selectedMaterial);
    
    if (!material) return null;
    
    if (material.type === 'video' && 'src' in material) {
      return (
        <VideoPlayer 
          material={material} 
          markMaterialAsCompleted={markMaterialAsCompleted} 
          currentSession={currentSession} 
        />
      );
    }
    
    if (material.type === 'reading') {
      return (
        <ReadingContent 
          material={material} 
          currentSession={currentSession} 
          markMaterialAsCompleted={markMaterialAsCompleted} 
        />
      );
    }
    
    return null;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Você precisa estar autenticado para acessar este conteúdo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">Faça login ou crie uma conta para continuar.</p>
            <div className="flex gap-4">
              <a href="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Login
              </a>
              <a href="/register" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Cadastrar
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    <SelectTrigger className="w-full md:w-[250px]">
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
                <StudyTimer />
              </div>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar com materiais */}
            <div className="lg:col-span-1">
              <MaterialsList 
                currentSession={currentSession} 
                selectedMaterial={selectedMaterial} 
                handleSelectMaterial={handleSelectMaterial} 
              />
              
              {/* Progresso do Curso */}
              {currentSession && <ProgressTrack />}
            </div>
            
            {/* Área de conteúdo principal */}
            <div className="lg:col-span-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-t-lg">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                      <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
                      <TabsTrigger value="anotacoes">Anotações</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="animate-fade-in">
                    {activeTab === "conteudo" && renderSelectedContent()}
                    {activeTab === "exercicios" && <ExerciseContent currentSession={currentSession as StudySession} />}
                    {activeTab === "anotacoes" && <StudyNotes />}
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
