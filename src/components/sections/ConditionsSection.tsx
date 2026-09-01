export default function ConditionsSection() {
  return (
    <section id="conditions" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Les conditions</h2>
          <p className="text-lg text-gray-400">
            Le challenge est exclusivement réservé à la création de sites vitrines (pas d'e-commerce, pas d'applications web complexes).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ce qui est offert */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-indigo-400">Ce qui est offert</span>
            </h3>
            <ul className="space-y-4">
              {['Conception sur mesure', 'Développement frontend', 'Intégration du contenu', 'Optimisation mobile', 'Accompagnement projet'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ce qui reste à charge */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-gray-400">À votre charge</span>
            </h3>
            <ul className="space-y-4">
              {['Achat du nom de domaine', 'Hébergement web', 'Fourniture des textes initiaux', 'Fourniture des images/logos', 'Maintenance future'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
