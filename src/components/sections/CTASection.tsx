import Link from "next/link";

export default function CTASection() {
  return (
    <section id="candidater-section" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-600/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Votre entreprise pourrait être la prochaine.
          </h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            Seulement 5 entreprises seront sélectionnées. Ne manquez pas cette opportunité de transformer votre présence numérique.
          </p>
          
          <Link
            href="/candidater"
            className="inline-block px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold rounded-full transition-transform hover:scale-105 shadow-lg shadow-indigo-600/30"
          >
            Candidater au challenge
          </Link>
          
          <p className="text-sm text-gray-500 mt-6">
            Temps de candidature estimé : 3 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
