
import React from 'react';
import Navbar from '../components/Navbar';
import StudyProfile from '../components/StudyProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, Award, BookOpen, Brain, Rocket, FileText, Users } from 'lucide-react';

const Profile: React.FC = () => {
  const achievements = [
    {
      title: 'Maratonista',
      description: 'Estudou por 5 dias consecutivos',
      icon: <Rocket className="h-5 w-5 text-amber-500" />,
      date: '10/06/2023',
    },
    {
      title: 'Mestre da Matemática',
      description: 'Completou 100 exercícios de matemática',
      icon: <Brain className="h-5 w-5 text-blue-500" />,
      date: '25/05/2023',
    },
    {
      title: 'Cientista',
      description: 'Completou todas as unidades de química',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      date: '12/04/2023',
    },
    {
      title: 'Primeira Conquista',
      description: 'Criou seu plano de estudos',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      date: '01/04/2023',
    },
  ];

  const groups = [
    {
      name: 'Grupo de Matemática',
      members: 8,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      name: 'Física para ENEM',
      members: 12,
      icon: <Users className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-72 sticky top-24">
              <Card className="border-primary/10">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">JP</span>
                  </div>
                  <CardTitle>João Pedro</CardTitle>
                  <CardDescription>joao.pedro@gmail.com</CardDescription>
                  <div className="mt-2 flex justify-center">
                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary font-medium">
                      Ensino Médio
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Nível</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>65% para nível 9</span>
                      <span>124 XP</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/50">
                      <span className="text-xl font-bold">18</span>
                      <span className="text-xs text-muted-foreground">Dias</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/50">
                      <span className="text-xl font-bold">7</span>
                      <span className="text-xs text-muted-foreground">Matérias</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/50">
                      <span className="text-xl font-bold">4</span>
                      <span className="text-xs text-muted-foreground">Conquistas</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Editar Perfil
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificações
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacidade
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="profile">Perfil de Estudo</TabsTrigger>
                  <TabsTrigger value="achievements">Conquistas</TabsTrigger>
                  <TabsTrigger value="groups">Grupos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="animate-fade-in">
                  <div className="flex justify-center">
                    <StudyProfile />
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="animate-fade-in">
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        Conquistas
                      </CardTitle>
                      <CardDescription>
                        Acompanhe seu progresso e conquistas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                          <div 
                            key={index} 
                            className="p-4 rounded-lg border hover:shadow-sm transition-shadow bg-card"
                          >
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-primary/10 mr-3">
                                {achievement.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Conquistado em {achievement.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Locked achievements */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Próximas conquistas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border bg-secondary/30">
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-secondary mr-3">
                                <Award className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-muted-foreground">Super Estudante</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Estude por 30 dias consecutivos
                                </p>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  18/30 dias completados
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border bg-secondary/30">
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-secondary mr-3">
                                <Award className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-muted-foreground">Físico em Treinamento</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Complete 50 exercícios de física
                                </p>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  40/50 exercícios completados
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="groups" className="animate-fade-in">
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        Grupos de Estudo
                      </CardTitle>
                      <CardDescription>
                        Conecte-se com outros estudantes e colabore
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {groups.map((group, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg border ${group.color} transition-all hover:shadow-md`}
                          >
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-white/50 mr-3">
                                {group.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{group.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {group.members} membros
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-black/10 flex justify-between">
                              <Button variant="outline" size="sm">
                                Visualizar
                              </Button>
                              <Button variant="default" size="sm">
                                Participar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Grupos Recomendados</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-green-100 mr-3">
                                <Users className="h-5 w-5 text-green-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Biologia para Medicina</h3>
                                <p className="text-sm text-muted-foreground">
                                  32 membros
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t flex justify-between">
                              <Button variant="outline" size="sm">
                                Visualizar
                              </Button>
                              <Button variant="default" size="sm">
                                Participar
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-amber-100 mr-3">
                                <Users className="h-5 w-5 text-amber-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold">História do Brasil</h3>
                                <p className="text-sm text-muted-foreground">
                                  24 membros
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t flex justify-between">
                              <Button variant="outline" size="sm">
                                Visualizar
                              </Button>
                              <Button variant="default" size="sm">
                                Participar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <Button className="bg-primary hover:bg-primary/90 shadow-sm hover:shadow transition-all">
                          <Users className="mr-2 h-4 w-4" />
                          Criar novo grupo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
