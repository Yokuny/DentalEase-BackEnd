import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const idSchema = z.object({
  id: z.string().refine(validObjectID, objectIdMessage()),
});

export const idSchemaOptional = z.object({
  id: z.string().refine(validObjectID, objectIdMessage()).optional(),
});
