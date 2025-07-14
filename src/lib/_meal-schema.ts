import { z } from "zod";

export const mealSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  summary: z.string().min(20, "Summary must be at least 20 letters"),
  instructions: z
    .string()
    .min(20, "Instructions must be at least 20 characters"),
  creator: z.string().min(2, "Name is required"),
  creator_email: z.string().email("Invalid email address"),
});
