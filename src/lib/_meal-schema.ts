import { z } from "zod";

export const formValidation = z.object({
  title: z.string().min(5, "Title lenght minimum is 5 letters"),
  summary: z.string().min(20, "You need to input at least 20 letters"),
  instructions: z.string().min(20, "Too short"),
  creator: z.string().min(2, "Limit fullname is 2 number"),
  creator_email: z.email(),
});
