import { z } from "zod";

export const formValidation = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  instructions: z
    .string()
    .min(20, "Instructions must be at least 20 characters"),
  creator: z.string().min(2, "Full name must be at least 2 characters"),
  creator_email: z.email("Please enter a valid email address"),
});
