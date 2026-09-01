export default function ChallengeSection() {
  return (
    <section id="challenge" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
              <div className="text-[15rem] font-black text-white/5 tracking-tighter leading-none select-none">5</div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
