import { z } from "zod";

export const formValidation = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(5, "Title must be at least 5 characters"),

  summary: z
    .string()
    .nonempty("Summary is required")
    .min(20, "Summary must be at least 20 characters"),

  instructions: z
    .string()
    .nonempty("Instructions are required")
    .min(20, "Instructions must be at least 20 characters"),

  creator: z
    .string()
    .nonempty("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  creator_email: z
    .email("Please enter a valid email address")
    .nonempty("Email Address is required"),
});
