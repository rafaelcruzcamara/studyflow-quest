
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const subjects = [
  { id: "math", name: "Matemática", topics: ["Álgebra", "Geometria", "Trigonometria", "Cálculo"] },
  { id: "physics", name: "Física", topics: ["Mecânica", "Eletricidade", "Termodinâmica", "Óptica"] },
  { id: "chemistry", name: "Química", topics: ["Química Orgânica", "Química Inorgânica", "Físico-Química"] },
  { id: "biology", name: "Biologia", topics: ["Genética", "Ecologia", "Fisiologia", "Evolução"] },
  { id: "history", name: "História", topics: ["História Antiga", "História Medieval", "História Moderna", "História Contemporânea"] },
  { id: "geography", name: "Geografia", topics: ["Geografia Física", "Geografia Humana", "Geopolítica"] },
  { id: "literature", name: "Literatura", topics: ["Literatura Brasileira", "Literatura Portuguesa", "Literatura Universal"] },
  { id: "english", name: "Inglês", topics: ["Gramática", "Interpretação de Texto", "Vocabulário"] },
];

const StudyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studyGoal, setStudyGoal] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(item => item !== subject) 
        : [...prev, subject]
    );
  };

  const handleNextStep = () => {
    if (activeTab === "profile") {
      setActiveTab("subjects");
    } else if (activeTab === "subjects") {
      setActiveTab("goals");
    } else if (activeTab === "goals") {
      // Submit or navigate to the next page
      console.log({
        selectedSubjects,
        studyGoal,
        weeklyHours
      });
    }
  };

  const handlePreviousStep = () => {
    if (activeTab === "subjects") {
      setActiveTab("profile");
    } else if (activeTab === "goals") {
      setActiveTab("subjects");
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-sm border-primary/10 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Configurar perfil de estudo</CardTitle>
        <CardDescription>
          Personalize seu plano de estudos para maximizar seu aprendizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="profile" disabled={activeTab !== "profile" && activeTab !== "subjects" && activeTab !== "goals"}>
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">1</span>
                <span className="hidden sm:inline">Perfil</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="subjects" disabled={activeTab !== "subjects" && activeTab !== "goals"}>
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">2</span>
                <span className="hidden sm:inline">Matérias</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="goals" disabled={activeTab !== "goals"}>
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">3</span>
                <span className="hidden sm:inline">Objetivos</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Digite seu nome completo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education-level">Nível de escolaridade</Label>
                  <Select>
                    <SelectTrigger id="education-level">
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="middle-school">Ensino Fundamental</SelectItem>
                      <SelectItem value="high-school">Ensino Médio</SelectItem>
                      <SelectItem value="college">Ensino Superior</SelectItem>
                      <SelectItem value="graduate">Pós-Graduação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="animate-fade-in">
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Selecione as matérias que você deseja estudar:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedSubjects.includes(subject.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleSubjectToggle(subject.id)}
                  >
                    <Checkbox 
                      id={`subject-${subject.id}`} 
                      checked={selectedSubjects.includes(subject.id)}
                      onCheckedChange={() => handleSubjectToggle(subject.id)}
                      className="mt-1"
                    />
                    <div>
                      <Label 
                        htmlFor={`subject-${subject.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {subject.name}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {subject.topics.slice(0, 2).join(", ")}
                        {subject.topics.length > 2 && ` e mais ${subject.topics.length - 2}...`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo principal</Label>
                <Select value={studyGoal} onValueChange={setStudyGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enem">Preparação para o ENEM</SelectItem>
                    <SelectItem value="vestibular">Vestibular específico</SelectItem>
                    <SelectItem value="concurso">Concurso público</SelectItem>
                    <SelectItem value="school">Melhorar desempenho escolar</SelectItem>
                    <SelectItem value="personal">Desenvolvimento pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-hours">Horas de estudo semanais</Label>
                <Select value={weeklyHours} onValueChange={setWeeklyHours}>
                  <SelectTrigger id="weekly-hours">
                    <SelectValue placeholder="Selecione a quantidade de horas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Até 5 horas</SelectItem>
                    <SelectItem value="10">5-10 horas</SelectItem>
                    <SelectItem value="20">10-20 horas</SelectItem>
                    <SelectItem value="30">Mais de 20 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Nível de prioridade por matéria</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Defina a importância de cada matéria selecionada
                </p>
                
                {selectedSubjects.length > 0 ? (
                  <div className="space-y-3">
                    {selectedSubjects.map((subjectId) => {
                      const subject = subjects.find(s => s.id === subjectId);
                      return (
                        <div key={subjectId} className="flex items-center justify-between">
                          <span>{subject?.name}</span>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">
                                <div className="flex items-center">
                                  <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                                  <span>Alta</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="medium">
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                  <span>Média</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="low">
                                <div className="flex items-center">
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                  <span>Baixa</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Nenhuma matéria selecionada
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={activeTab === "profile"}
        >
          Voltar
        </Button>
        <Button onClick={handleNextStep}>
          {activeTab === "goals" ? "Finalizar" : "Próximo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyProfile;
