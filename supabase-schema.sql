-- ============================================
-- SIDICKE CODE — 5 EN 5
-- Schéma de base de données Supabase
-- ============================================

-- Types ENUM
CREATE TYPE candidature_status AS ENUM (
  'RECUE',
  'A_EXAMINER',
  'EVALUEE',
  'PRESELECTIONNEE',
  'SELECTIONNEE',
  'REFUSEE',
  'INELIGIBLE',
  'RETIREE'
);

CREATE TYPE type_projet AS ENUM ('creation', 'refonte');

CREATE TYPE projet_status AS ENUM (
  'EN_ATTENTE',
  'EN_COURS',
  'TERMINE',
  'LIVRE',
  'ANNULE'
);

-- ============================================
-- TABLE : candidatures
-- ============================================
CREATE TABLE candidatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status candidature_status DEFAULT 'RECUE' NOT NULL,

  -- Entreprise
  nom_entreprise TEXT NOT NULL,
  secteur TEXT NOT NULL,
  nom_responsable TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,

  -- Projet
  type_projet type_projet NOT NULL,
  description_besoin TEXT NOT NULL,

  -- Autorisations
  acceptation_conditions BOOLEAN DEFAULT false NOT NULL,

  -- Admin
  score INTEGER,
  note_interne TEXT
);

-- ============================================
-- TABLE : evaluations
-- ============================================
CREATE TABLE evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidature_id UUID REFERENCES candidatures(id) ON DELETE CASCADE NOT NULL,
  besoin_reel INTEGER DEFAULT 0 NOT NULL CHECK (besoin_reel >= 0 AND besoin_reel <= 20),
  potentiel_transformation INTEGER DEFAULT 0 NOT NULL CHECK (potentiel_transformation >= 0 AND potentiel_transformation <= 20),
  potentiel_demonstration INTEGER DEFAULT 0 NOT NULL CHECK (potentiel_demonstration >= 0 AND potentiel_demonstration <= 20),
  disponibilite INTEGER DEFAULT 0 NOT NULL CHECK (disponibilite >= 0 AND disponibilite <= 15),
  clarte_besoin INTEGER DEFAULT 0 NOT NULL CHECK (clarte_besoin >= 0 AND clarte_besoin <= 10),
  contenus_disponibles INTEGER DEFAULT 0 NOT NULL CHECK (contenus_disponibles >= 0 AND contenus_disponibles <= 10),
  diversite INTEGER DEFAULT 0 NOT NULL CHECK (diversite >= 0 AND diversite <= 5),
  score_total INTEGER GENERATED ALWAYS AS (
    besoin_reel + potentiel_transformation + potentiel_demonstration +
    disponibilite + clarte_besoin + contenus_disponibles + diversite
  ) STORED,
  commentaire TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(candidature_id)
);

-- ============================================
-- TABLE : projets
-- ============================================
CREATE TABLE projets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidature_id UUID REFERENCES candidatures(id) ON DELETE SET NULL,
  entreprise TEXT NOT NULL,
  secteur TEXT NOT NULL,
  semaine INTEGER NOT NULL CHECK (semaine >= 1 AND semaine <= 5),
  status projet_status DEFAULT 'EN_ATTENTE' NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  site_url TEXT,
  description_avant TEXT,
  description_apres TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(semaine)
);

-- ============================================
-- Trigger pour updated_at automatique
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER candidatures_updated_at
  BEFORE UPDATE ON candidatures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER projets_updated_at
  BEFORE UPDATE ON projets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projets ENABLE ROW LEVEL SECURITY;

-- Les candidatures ne sont lisibles que par les utilisateurs authentifiés (admin)
CREATE POLICY "Admin peut tout voir sur candidatures"
  ON candidatures FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insertion publique (formulaire de candidature)
CREATE POLICY "Public peut candidater"
  ON candidatures FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin seulement sur évaluations
CREATE POLICY "Admin sur evaluations"
  ON evaluations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Les projets sont lisibles publiquement (affichage landing page)
CREATE POLICY "Public peut voir les projets"
  ON projets FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin sur projets"
  ON projets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_candidatures_status ON candidatures(status);
CREATE INDEX idx_candidatures_created_at ON candidatures(created_at DESC);
CREATE INDEX idx_evaluations_candidature ON evaluations(candidature_id);
CREATE INDEX idx_projets_semaine ON projets(semaine);
