
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const StudyNotes: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold">Suas Anotações</h2>
      <div className="p-4 border rounded-lg min-h-[300px] shadow-inner bg-white/50">
        <textarea 
          className="w-full h-full min-h-[250px] bg-transparent outline-none resize-none focus:ring-0 p-2"
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
  );
};

export default StudyNotes;
