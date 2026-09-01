import { Metadata } from "next";
import CandidatureForm from "@/components/forms/CandidatureForm";

export const metadata: Metadata = {
  title: "Candidater au challenge | Sidicke Code — 5 EN 5",
  description: "Présentez votre entreprise et votre projet pour participer au challenge 5 EN 5.",
};

export default function CandidaterPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            Candidater au challenge
          </h1>
          <p className="text-xl text-gray-400">
            Présentez votre entreprise et votre projet.
          </p>
        </div>
        
        <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-2xl overflow-hidden p-6 sm:p-8">
          <CandidatureForm />
        </div>
      </div>
    </main>
  );
}
