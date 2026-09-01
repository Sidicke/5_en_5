export default function ProcessSection() {
  const steps = [
    { title: "Candidature", desc: "Remplissez le formulaire en quelques minutes." },
    { title: "Sélection", desc: "Nous choisissons les 5 projets les plus impactants." },
    { title: "Cadrage", desc: "Un appel pour définir vos besoins exacts." },
    { title: "Conception", desc: "Création du design et de la structure." },
    { title: "Développement", desc: "Code et intégration de votre site." },
    { title: "Livraison", desc: "Mise en ligne et remise des clés." },
  ];

  return (
    <section id="fonctionnement" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comment ça fonctionne</h2>
          <p className="text-lg text-gray-400">Un processus fluide, de votre candidature jusqu'à la mise en ligne.</p>
        </div>

        <div className="relative">
          {/* Ligne connectrice desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-row lg:flex-col items-center lg:text-center gap-6 lg:gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg border-4 border-[#0a0a0a] shadow-lg shadow-indigo-500/20">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
