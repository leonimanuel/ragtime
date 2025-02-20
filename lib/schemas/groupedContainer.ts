import { z } from "zod";

// Explicit Container Schema with clear error messages
const ContainerSchema = z.object({
  name: z.string({
    required_error: "Container name is required",
  }).min(1, "Container name cannot be empty"),
  type: z.string({
    required_error: "Container type is required",
  }).min(1, "Container type cannot be empty"),
  technology: z.array(z.string({
    required_error: "Container technology is required",
  }).min(1, "Container technology cannot be empty"))
    .min(1, "At least one technology is required")
    .max(3, "Maximum of three technologies allowed"),
  description: z.string({
    required_error: "Container description is required",
  }).min(1, "Container description cannot be empty"),
  group: z.string({
    required_error: "Container group is required",
  }).min(1, "Container group cannot be empty"),
});

// Explicit Container Group Schema
const ContainerGroupSchema = z.object({
  groupName: z.string({
    required_error: "Group name is required",
  }).min(1, "Group name cannot be empty"),
  containers: z.array(ContainerSchema).min(1, "A group must contain at least one container"),
});

// Relationship type as an explicit enum
const RelationTypeSchema = z.enum(["dependsOn", "calls", "uses", "publishes", "subscribes"]);

// Explicit Relationship Schema
const RelationshipSchema = z.object({
  source: z.string({
    required_error: "Relationship source is required",
  }).min(1, "Relationship source cannot be empty"),
  target: z.string({
    required_error: "Relationship target is required",
  }).min(1, "Relationship target cannot be empty"),
  relationType: RelationTypeSchema,
});

// Complex diagram schema that accepts either grouped or flat containers
export const GroupedContainerSchema = z.object({
  systemName: z.string({
    required_error: "System name is required",
  })
    .min(3, "System name must be at least 3 characters long")
    .max(100, "System name should not exceed 100 characters"),
  groups: z.array(ContainerGroupSchema).optional(),
  containers: z.array(ContainerSchema).optional(),
  relationships: z.array(RelationshipSchema).optional(),
});
