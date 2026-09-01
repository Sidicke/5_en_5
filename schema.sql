-- ==========================================
-- SCRIPT DE MIGRATION SUPABASE - 5 EN 5
-- ==========================================

-- 1. Table des paramètres globaux (Settings)
CREATE TABLE IF NOT EXISTS public.settings (
    id int8 PRIMARY KEY,
    candidatures_ouvertes boolean DEFAULT true NOT NULL
);
INSERT INTO public.settings (id, candidatures_ouvertes) VALUES (1, true) ON CONFLICT (id) DO NOTHING;


-- 2. Table des candidatures
CREATE TABLE IF NOT EXISTS public.candidatures (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    status text DEFAULT 'RECUE' NOT NULL,
    nom_entreprise text NOT NULL,
    secteur text NOT NULL,
    nom_responsable text NOT NULL,
    email text NOT NULL,
    telephone text NOT NULL,
    type_projet text NOT NULL,
    description_besoin text,
    acceptation_conditions boolean DEFAULT false,
    score float8,
    note_interne text,
    archive_semaine integer
);


-- 3. Table des évaluations (Liée aux candidatures)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    candidature_id uuid REFERENCES public.candidatures(id) ON DELETE CASCADE NOT NULL,
    besoin_reel integer DEFAULT 0,
    potentiel_transformation integer DEFAULT 0,
    potentiel_demonstration integer DEFAULT 0,
    disponibilite integer DEFAULT 0,
    clarte_besoin integer DEFAULT 0,
    contenus_disponibles integer DEFAULT 0,
    diversite integer DEFAULT 0,
    score_total integer DEFAULT 0,
    commentaire text,
    created_at timestamptz DEFAULT now() NOT NULL
);


-- 4. Table des projets de la semaine
CREATE TABLE IF NOT EXISTS public.projets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    candidature_id uuid REFERENCES public.candidatures(id) ON DELETE SET NULL,
    entreprise text NOT NULL,
    secteur text NOT NULL,
    semaine integer NOT NULL,
    status text DEFAULT 'EN_ATTENTE' NOT NULL,
    description text NOT NULL,
    image_url text,
    site_url text,
    description_avant text,
    description_apres text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- ==========================================
-- SÉCURITÉ : Row Level Security (RLS)
-- ==========================================
-- Par défaut, tout est bloqué depuis l'extérieur. 
-- Nos Server Actions dans Next.js utilisent le "Service Role Key" (mode admin absolu) 
-- ce qui contourne le RLS. 
-- Pour la sécurité, on active le RLS sur toutes les tables pour empêcher 
-- un accès non autorisé depuis l'API publique de Supabase.

ALTER TABLE public.candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Autoriser la création de candidature depuis le site public (sans être authentifié)
CREATE POLICY "Public can insert candidatures" 
ON public.candidatures FOR INSERT 
TO public 
WITH CHECK (true);

-- Autoriser la lecture publique des projets pour la page d'accueil
CREATE POLICY "Public can view projets" 
ON public.projets FOR SELECT 
TO public 
USING (true);

-- Autoriser la lecture publique des settings pour la page de candidature
CREATE POLICY "Public can view settings" 
ON public.settings FOR SELECT 
TO public 
USING (true);

-- (Toutes les autres actions comme UPDATE, DELETE ou SELECT sur les candidatures 
-- se feront via le serveur Next.js avec la clé Admin sécurisée).
