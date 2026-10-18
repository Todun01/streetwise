import { z } from "zod";

/** Used by BOTH the form (instant feedback) and the API route (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "That name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(254),
  phone: z
    .string()
    .trim()
    .max(25, "That number is too long")
    .regex(/^[+()\-\s\d]*$/, "Use digits, spaces, + or - only")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(2000, "Please keep it under 2,000 characters"),
  website: z.string().max(200).optional(), // honeypot: real people never see or fill this
});

export type ContactValues = z.infer<typeof contactSchema>;