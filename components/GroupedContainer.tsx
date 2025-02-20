import React from "react";
// Import shadcn UI components (adjust the import paths as needed)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// Explicit type definitions matching the schema

interface Container {
  name: string;
  type: string;
  technology: string[];
  description: string;
  group: string;
}

interface ContainerGroup {
  groupName: string;
  containers: Container[];
}

export type RelationType = "dependsOn" | "calls" | "uses" | "publishes" | "subscribes";

interface Relationship {
  source: string;
  target: string;
  relationType: RelationType;
}

export interface GroupedContainerProps {
  systemName: string;
  groups?: ContainerGroup[];
  containers?: Container[];
  relationships?: Relationship[];
}

export const GroupedContainer: React.FC<GroupedContainerProps> = ({
  systemName,
  groups,
  containers,
  relationships,
}) => {
  const getContainerRelationships = (containerName: string) => {
    if (!relationships) return { inbound: [], outbound: [] };
    
    const inbound = relationships.filter(rel => rel.target === containerName);
    const outbound = relationships.filter(rel => rel.source === containerName);
    
    return { inbound, outbound };
  };

  const ContainerCard = ({ container }: { container: Container }) => {
    const { inbound, outbound } = getContainerRelationships(container.name);
    const hasDependencies = inbound.length > 0 || outbound.length > 0;
    
    return (
      <Card
        key={container.name}
        className="bg-white/50 backdrop-blur-sm border-gray-100 rounded-xl shadow-sm hover:shadow transition-shadow duration-200"
      >
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">{container.name}</CardTitle>
          <CardDescription className="text-xs text-gray-500 tracking-wide">
            {container.technology && container.technology.length > 0 ? container.technology.map((tech, idx) => (
              <span key={idx}>
                {tech}{idx < container.technology.length - 1 ? " · " : ""}
              </span>
            )) : "No technologies specified"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">{container.description}</p>
          
          {hasDependencies && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-3">DEPENDENCIES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outbound && outbound.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Outbound</p>
                    <div className="space-y-1">
                      {outbound.map((rel, idx) => (
                        <div key={idx} className="text-xs text-gray-600">
                          {rel.target}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {inbound && inbound.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Inbound</p>
                    <div className="space-y-1">
                      {inbound && inbound.map((rel, idx) => (
                        <div key={idx} className="text-xs text-gray-600">
                          {rel.source}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-medium text-gray-800 mb-8">{systemName}</h1>

      {groups ? (
        groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12">
            <h2 className="text-xl font-medium text-gray-700 mb-6">{group.groupName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.containers && group.containers.map((container) => (
                <ContainerCard key={container.name} container={container} />
              ))}
            </div>
          </div>
        ))
      ) : containers ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {containers.map((container) => (
            <ContainerCard key={container.name} container={container} />
          ))}
        </div>
      ) : null}
    </div>
  );
};