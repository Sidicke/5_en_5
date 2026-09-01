export default function ProjectsSection() {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <section id="projets" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Les projets</h2>
          <p className="text-lg text-gray-400">
            Découvrez ici les 5 projets qui seront réalisés pendant le challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {placeholders.map((num) => (
            <div key={num} className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 border-dashed flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group hover:bg-white/10 transition-colors">
              <span className="text-6xl font-black text-white/10 mb-4 group-hover:text-white/20 transition-colors">0{num}</span>
              <h3 className="text-lg font-medium text-white mb-2">Projet {num}</h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">À venir</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
