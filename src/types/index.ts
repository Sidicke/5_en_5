export type CandidatureStatus =
  | "RECUE"
  | "A_EXAMINER"
  | "EVALUEE"
  | "PRESELECTIONNEE"
  | "SELECTIONNEE"
  | "REFUSEE"
  | "INELIGIBLE"
  | "RETIREE";

export type TypeProjet = "creation" | "refonte";

export type ProjetStatus =
  | "EN_ATTENTE"
  | "EN_COURS"
  | "TERMINE"
  | "LIVRE"
  | "ANNULE";

export interface Candidature {
  id: string;
  created_at: string;
  updated_at: string;
  status: CandidatureStatus;

  // Entreprise
  nom_entreprise: string;
  secteur: string;
  nom_responsable: string;
  email: string;
  telephone: string;

  // Projet
  type_projet: TypeProjet;
  description_besoin: string;

  // Autorisations
  acceptation_conditions: boolean;

  // Admin
  score: number | null;
  note_interne: string | null;
}

export interface Evaluation {
  id: string;
  candidature_id: string;
  besoin_reel: number;
  potentiel_transformation: number;
  potentiel_demonstration: number;
  disponibilite: number;
  clarte_besoin: number;
  contenus_disponibles: number;
  diversite: number;
  score_total: number;
  commentaire: string | null;
  created_at: string;
}

export interface Projet {
  id: string;
  candidature_id: string;
  entreprise: string;
  secteur: string;
  semaine: number;
  status: ProjetStatus;
  description: string;
  image_url: string | null;
  site_url: string | null;
  description_avant: string | null;
  description_apres: string | null;
  created_at: string;
  updated_at: string;
}

export interface CandidatureFormData {
  nom_entreprise: string;
  secteur: string;
  nom_responsable: string;
  email: string;
  telephone: string;
  type_projet: TypeProjet;
  description_besoin: string;
  acceptation_conditions: boolean;
  honeypot: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
