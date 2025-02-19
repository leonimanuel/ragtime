import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { C4ContainerDiagramSchema, ContainerSchema } from "@/lib/schemas/c4";
import { z } from "zod";

type ContainerDiagramProps = z.infer<typeof C4ContainerDiagramSchema>;

const ContainerDiagram: React.FC<ContainerDiagramProps> = ({ systemName, containers }) => {
  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold">{systemName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {containers.map((container) => (
          <Card key={container.id} className="w-56 p-4 text-center">
            <CardContent>
              <h3 className="text-lg font-medium">{container.name}</h3>
              <Badge className="my-2">{container.type}</Badge>
              <p className="text-sm text-gray-500">{container.technology}</p>
              {container.description && (
                <p className="text-xs text-gray-400 mt-1">{container.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContainerDiagram;
