import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

interface ProcessStep {
  title: string;
  description?: string;
  icon?: unknown;
  number?: string | number;
  status?: 'completed' | 'current' | 'upcoming' | 'disabled';
  badge?: string;
  branches?: ProcessStep[];
}

const processStepSchema: z.ZodType<ProcessStep> = z.lazy(() => z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.any().optional(),
  number: z.union([z.string(), z.number()]).optional(),
  status: z.enum(['completed', 'current', 'upcoming', 'disabled']).optional(),
  badge: z.string().optional(),
  branches: z.array(processStepSchema).optional(),
}));

export const processStepsSchema = baseComponentSchema.extend({
  type: z.literal("ProcessSteps"),
  steps: z.array(processStepSchema),
  variant: z.enum(['horizontal', 'vertical', 'circular', 'cards', 'branching']).optional(),
  currentStep: z.number().optional(),
  completedSteps: z.array(z.number()).optional(),
  showConnectors: z.boolean().optional(),
  connectorStyle: z.enum(['solid', 'dashed', 'arrow']).optional(),
  animated: z.boolean().optional(),
  interactive: z.boolean().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  onStepClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.any().optional(),
});

export type ProcessStepsProps = z.infer<typeof processStepsSchema>;