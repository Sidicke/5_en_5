import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Confirmation | Sidicke Code — 5 EN 5",
  description: "Votre candidature a été enregistrée avec succès.",
};

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111827] rounded-xl border border-gray-800 shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <svg className="h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Votre candidature a été enregistrée !
        </h1>
        <p className="text-gray-400 mb-6">
          Nous avons bien reçu votre dossier. Nous allons l'étudier attentivement dans les prochains jours.
        </p>
        <div className="bg-gray-800/50 rounded-lg p-5 mb-8 text-sm text-gray-300 text-left border border-gray-700/50">
          <p className="mb-3 font-semibold text-white">Ce qui va se passer ensuite :</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              Examen approfondi de votre projet
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              Pré-sélection si votre profil correspond
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              Entretien pour valider la faisabilité technique
            </li>
          </ul>
          <p className="mt-5 text-xs italic text-gray-500 text-center">
            * Note : Le dépôt de cette candidature ne garantit pas la sélection pour le challenge.
          </p>
        </div>
        <Link 
          href="/"
          className="inline-flex justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
