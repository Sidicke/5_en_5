import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import CandidatureForm from "@/components/forms/CandidatureForm";
import { getCandidaturesStatus } from "@/app/actions/settings";

export const metadata: Metadata = {
  title: "Candidater au challenge | Sidicke Code — 5 EN 5",
  description: "Présentez votre entreprise et votre projet pour participer au challenge 5 EN 5.",
};

export default async function CandidaterPage() {
  const isOpen = await getCandidaturesStatus();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            Candidater au challenge
          </h1>
          <p className="text-xl text-gray-400">
            {isOpen ? "Présentez votre entreprise et votre projet." : "Inscriptions temporairement fermées."}
          </p>
        </div>
        
        <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-2xl overflow-hidden p-6 sm:p-8">
          {isOpen ? (
            <CandidatureForm />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Candidatures bloquées</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Les candidatures sont bloquées pour cette semaine. Veuillez attendre la semaine prochaine et suivez mes pages pour être au courant de la réouverture !
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://www.facebook.com/share/1DRe2KvVhQ/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full sm:w-auto"
                >
                  Me suivre sur Facebook
                </a>
                <a 
                  href="https://tiktok.com/@votreprofil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-medium rounded-lg transition-colors w-full sm:w-auto"
                >
                  Me suivre sur TikTok
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
