
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressTrack: React.FC = () => {
  return (
    <Card className="mt-6 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-t-lg">
        <CardTitle className="text-lg">Seu Progresso</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Progresso geral</span>
              <span>20%</span>
            </div>
            <Progress value={20} className="h-2.5" />
          </div>
          
          <div className="p-4 bg-secondary/40 rounded-lg">
            <p className="text-sm font-medium mb-2">Estatísticas</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Concluídos</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Minutos</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTrack;
