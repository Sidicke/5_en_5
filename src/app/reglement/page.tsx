import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Règlement et Conditions | Sidicke Code — 5 EN 5",
  description: "Conditions officielles du challenge Sidicke Code — 5 EN 5.",
};

export default function ReglementPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <article className="prose prose-invert prose-indigo max-w-none">
          <h1 className="text-3xl font-bold text-white mb-8">Règlement et Conditions du Challenge</h1>
          
          <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl mb-10">
            <h2 className="text-xl font-semibold text-white mt-0 mb-4">Concept du challenge</h2>
            <p>
              Sidicke Code accompagne 5 entreprises pendant 5 semaines. Chaque semaine, une entreprise sélectionnée bénéficie de la conception et du développement d'un site vitrine dans le cadre d'une campagne promotionnelle.
            </p>
            <p className="font-medium text-white mb-2">Le challenge concerne UNIQUEMENT les sites vitrines.</p>
            <p>Il ne concerne pas :</p>
            <ul className="mt-2 mb-0">
              <li>les sites e-commerce ;</li>
              <li>les applications web complexes ;</li>
              <li>les marketplaces ;</li>
              <li>les plateformes SaaS ;</li>
              <li>les systèmes nécessitant un développement important ou une infrastructure complexe.</li>
            </ul>
            <p className="mt-4 mb-0">
              L'objectif est de créer ou moderniser un site réellement utile à l'entreprise et destiné à être utilisé après sa livraison.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Conditions pour candidater</h2>
          <p>Une entreprise qui souhaite participer doit :</p>
          <ul>
            <li>avoir une activité réelle et identifiable ;</li>
            <li>avoir un besoin réel de créer ou moderniser sa présence en ligne ;</li>
            <li>avoir l'intention concrète d'utiliser le site une fois livré ;</li>
            <li>être capable d'expliquer pourquoi elle a besoin du site ;</li>
            <li>être prête à collaborer avec Sidicke Code pendant la réalisation ;</li>
            <li>disposer d'un responsable pouvant échanger et prendre les décisions nécessaires ;</li>
            <li>être disposée à fournir les informations et contenus nécessaires si elle est sélectionnée ;</li>
            <li>être prête à prendre en charge les frais externes nécessaires à la mise en ligne du site si elle est sélectionnée ;</li>
            <li>accepter les conditions du challenge.</li>
          </ul>
          <p>L'entreprise doit également être autorisée à représenter la structure pour laquelle elle dépose la candidature.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">2. Utilisation des informations fournies</h2>
          <p>En déposant sa candidature, l'entreprise accepte que les informations fournies puissent être utilisées par Sidicke Code afin :</p>
          <ul>
            <li>d'examiner la candidature et de vérifier l'éligibilité ;</li>
            <li>de vérifier les informations pertinentes concernant l'entreprise ;</li>
            <li>d'évaluer la faisabilité et la pertinence du projet ;</li>
            <li>de comparer les candidatures et de sélectionner les participants.</li>
          </ul>
          <p>
            Sidicke Code peut, lorsque cela est nécessaire, consulter des sources publiques concernant l'entreprise afin de vérifier certains éléments. <strong>Cette utilisation est strictement limitée à l'évaluation et à la gestion du challenge.</strong> Ce n'est en aucun cas une autorisation générale d'utiliser librement les données de l'entreprise.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">3. Ce qui est offert</h2>
          <p>Pour une entreprise sélectionnée, Sidicke Code offre la main-d'œuvre correspondant au périmètre défini du projet. Cela peut comprendre :</p>
          <ul>
            <li>conception de l'interface et développement frontend ;</li>
            <li>intégration des contenus fournis ;</li>
            <li>responsive design et optimisation mobile ;</li>
            <li>intégration des fonctionnalités simples nécessaires au site vitrine ;</li>
            <li>accompagnement pendant la réalisation et mise en ligne.</li>
          </ul>
          <p>Le travail offert correspond <strong>uniquement au périmètre validé</strong> avec l'entreprise. Le challenge ne constitue pas un développement illimité ou une prestation sans limite de fonctionnalités.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">4. Ce qui reste à la charge de l'entreprise</h2>
          <p>L'entreprise sélectionnée prend en charge les frais externes nécessaires à son projet, notamment :</p>
          <ul>
            <li>le nom de domaine et l'hébergement ;</li>
            <li>les services ou licences payantes éventuellement nécessaires ;</li>
            <li>les ressources externes demandées par l'entreprise ;</li>
            <li>le renouvellement futur du domaine et de l'hébergement.</li>
          </ul>
          <p>La main-d'œuvre correspondant au périmètre du challenge est offerte, mais les frais externes ne sont pas considérés comme faisant partie de la promotion.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">5. Contenu fourni par l'entreprise</h2>
          <p>Après sélection, l'entreprise doit fournir les éléments nécessaires à la réalisation du site (textes, images, logo, coordonnées, etc.).</p>
          <p>L'entreprise doit disposer des droits nécessaires sur les contenus qu'elle fournit. Sidicke Code ne sera pas tenu responsable des problèmes liés à des contenus fournis par l'entreprise sans les droits appropriés.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">6. Collaboration et disponibilité</h2>
          <p>Chaque projet est réalisé dans le cadre d'une semaine. L'entreprise doit donc être suffisamment disponible pour répondre aux questions, fournir les contenus, effectuer les validations et prendre rapidement des décisions.</p>
          <p>Si un retard est directement causé par l'absence d'informations ou de validation de l'entreprise, le calendrier peut être décalé. Sidicke Code n'est pas responsable d'un retard causé par l'entreprise.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">7. Périmètre du projet et validation</h2>
          <p>Avant le début du développement, le périmètre du site est défini avec l'entreprise. Les demandes qui dépassent fortement le périmètre initial (e-commerce, espace client, etc.) ne sont pas incluses et peuvent faire l'objet d'une prestation séparée.</p>
          <p>L'entreprise participe à la validation du projet. Les corrections nécessaires pour respecter le périmètre initial sont incluses, mais les nouvelles fonctionnalités demandées après validation ne le sont pas automatiquement.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">8. Utilisation réelle du site</h2>
          <p>Le site réalisé doit avoir une utilité réelle. L'entreprise doit avoir l'intention concrète de le mettre en ligne et de l'utiliser. Le challenge ne doit pas servir simplement à obtenir un site gratuitement sans projet réel derrière.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">9. Sélection, abandon ou indisponibilité</h2>
          <p>La candidature ne garantit pas la sélection. Seulement 5 entreprises seront retenues (une par semaine). La sélection prend en compte l'adéquation au challenge, la réalité du besoin et la disponibilité.</p>
          <p>Une entreprise sélectionnée qui ne peut plus participer doit prévenir Sidicke Code rapidement. Sidicke Code se réserve le droit de retirer une entreprise du challenge si elle ne respecte plus les conditions ou refuse de collaborer.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">10. Présentation des projets</h2>
          <p>Le challenge a pour objectif de documenter les réalisations. L'entreprise sélectionnée accepte que Sidicke Code puisse présenter le travail réalisé (captures, avant/après, étapes de réalisation). Les informations confidentielles ne seront jamais publiées sans autorisation.</p>

          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">11. Après la livraison</h2>
          <p>Le challenge couvre la réalisation du projet dans le périmètre défini. Il ne comprend pas une maintenance gratuite illimitée. Après livraison, la maintenance, le renouvellement de l'hébergement/domaine et les futures évolutions restent à la charge de l'entreprise.</p>
        </article>
      </div>
    </main>
  );
}
