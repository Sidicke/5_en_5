import FadeIn from "@/components/ui/FadeIn";

export default function ChallengeSection() {
  return (
    <section id="challenge" className="py-24 relative overflow-hidden">
      <FadeIn className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              5 entreprises.<br />
              5 semaines.<br />
              5 transformations.
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Le concept est simple : chaque semaine, nous sélectionnons une entreprise et nous lui créons un site vitrine professionnel, moderne et performant.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Une documentation publique sera partagée pour suivre l'évolution de chaque projet. Une aventure transparente et stimulante.
            </p>
            
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-600">5</span>
                <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">Entreprises</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-cyan-600">5</span>
                <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">Semaines</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">5</span>
                <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">Sites web</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('/images/promotional-poster.jpeg')] bg-cover bg-center transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] z-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
