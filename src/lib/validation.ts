import { z } from "zod";

export const candidatureSchema = z.object({
  nom_entreprise: z
    .string()
    .min(2, "Le nom de l'entreprise est requis")
    .max(200, "200 caractères maximum"),
  secteur: z
    .string()
    .min(2, "Le secteur d'activité est requis")
    .max(100, "100 caractères maximum"),
  nom_responsable: z
    .string()
    .min(2, "Le nom du responsable est requis")
    .max(200, "200 caractères maximum"),
  email: z
    .string()
    .email("L'adresse email doit être valide"),
  telephone: z
    .string()
    .min(8, "Le numéro de téléphone est requis")
    .max(20, "20 caractères maximum"),
  type_projet: z.enum(["creation", "refonte"], {
    error: "Choisissez le type de projet",
  }),
  description_besoin: z
    .string()
    .min(20, "Décrivez votre besoin (20 caractères minimum)")
    .max(2000, "2000 caractères maximum"),
  acceptation_conditions: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions du challenge",
  }),
  honeypot: z.string().max(0, ""),
});

export type CandidatureInput = z.infer<typeof candidatureSchema>;
