import { z } from "zod";

export const ContainerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Container name is required"),
  type: z.enum(["Frontend", "Backend", "Database", "External Service", "Message Queue"]),
  technology: z.string().min(1, "Technology is required"),
  description: z.string().optional(),
  dependsOn: z.array(z.string().uuid()).optional(), // References other containers
});

export const C4ContainerDiagramSchema = z.object({
  systemName: z.string().min(1, "System name is required"),
  containers: z.array(ContainerSchema).min(1, "At least one container is required"),
});