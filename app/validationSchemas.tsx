import z from "zod";

export const issuesSchema = z.object({
  title: z
    .string({message: "Title is required."})
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot be over 99 characters."),
  description: z
    .string({message: "Description is required."})
    .min(3, "Description must be at least 3 characters."),
});
