import { Globe, MonitorOff, Smartphone, TrendingDown } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "Pas de site web",
      description: "Vous perdez des clients potentiels qui vous cherchent sur internet.",
      icon: <Globe className="w-8 h-8 text-indigo-400" />,
    },
    {
      title: "Site vieillissant",
      description: "Votre design actuel ne reflète plus la qualité de vos services.",
      icon: <MonitorOff className="w-8 h-8 text-indigo-400" />,
    },
    {
      title: "Inadapté au mobile",
      description: "Vos visiteurs fuient car la navigation est difficile sur smartphone.",
      icon: <Smartphone className="w-8 h-8 text-indigo-400" />,
    },
    {
      title: "Mauvaise image",
      description: "Une présentation non professionnelle qui freine la confiance.",
      icon: <TrendingDown className="w-8 h-8 text-indigo-400" />,
    },
  ];

  return (
    <section id="probleme" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Votre présence en ligne mérite mieux
          </h2>
          <p className="text-lg text-gray-400">
            De nombreuses entreprises perdent des opportunités chaque jour à cause d'une vitrine numérique inexistante ou inefficace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
