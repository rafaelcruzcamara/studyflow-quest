
import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import { Material, StudySession } from './StudyMaterials';

interface MaterialsListProps {
  currentSession: StudySession | null;
  selectedMaterial: number | null;
  handleSelectMaterial: (id: number) => void;
}

const MaterialsList: React.FC<MaterialsListProps> = ({ 
  currentSession, 
  selectedMaterial, 
  handleSelectMaterial 
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
        <CardTitle className="flex items-center text-lg">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Materiais de Estudo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {currentSession ? (
          <div className="space-y-3">
            {currentSession.materials.map((material: Material) => (
              <div 
                key={material.id} 
                className={cn(
                  "flex items-center p-3 rounded-lg border transition-all",
                  selectedMaterial === material.id 
                    ? 'bg-primary/10 border-primary/30 shadow-sm' 
                    : 'hover:bg-secondary/50 cursor-pointer'
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
  );
};

export default MaterialsList;
