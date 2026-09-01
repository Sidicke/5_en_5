export default function WhySection() {
  const benefits = [
    { title: "Présence renforcée", desc: "Soyez visible là où vos clients vous cherchent." },
    { title: "Image pro", desc: "Prouvez votre sérieux dès le premier coup d'œil." },
    { title: "Contact facilité", desc: "Ne manquez plus aucune opportunité." },
    { title: "Vitrine 24/7", desc: "Votre entreprise accessible à tout moment." },
    { title: "Évolution", desc: "Une base solide pour développer votre activité." },
  ];

  return (
    <section id="pourquoi" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pourquoi participer ?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Avoir un site internet n'est plus une option, c'est une nécessité. Ce challenge est l'opportunité de franchir le cap avec des professionnels.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-white font-medium mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
