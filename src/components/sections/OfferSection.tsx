import { LayoutTemplate, Briefcase, Image as ImageIcon, Phone, MessageSquare, MapPin, Smartphone, Rocket } from "lucide-react";

export default function OfferSection() {
  const features = [
    { title: "Présentation pro", desc: "Mettez en valeur votre histoire et votre équipe.", icon: <LayoutTemplate className="w-6 h-6 text-indigo-400" /> },
    { title: "Vos services", desc: "Clarté sur ce que vous offrez à vos clients.", icon: <Briefcase className="w-6 h-6 text-indigo-400" /> },
    { title: "Galerie / Portfolio", desc: "Montrez vos réalisations en images.", icon: <ImageIcon className="w-6 h-6 text-indigo-400" /> },
    { title: "Contact facile", desc: "Formulaire de contact et bouton d'appel direct.", icon: <Phone className="w-6 h-6 text-indigo-400" /> },
    { title: "WhatsApp", desc: "Intégration d'un bouton chat WhatsApp.", icon: <MessageSquare className="w-6 h-6 text-indigo-400" /> },
    { title: "Localisation", desc: "Carte interactive pour vous trouver.", icon: <MapPin className="w-6 h-6 text-indigo-400" /> },
    { title: "100% Mobile", desc: "Parfaitement adapté aux smartphones et tablettes.", icon: <Smartphone className="w-6 h-6 text-indigo-400" /> },
    { title: "Mise en ligne", desc: "Déploiement complet sur le web.", icon: <Rocket className="w-6 h-6 text-indigo-400" /> },
  ];

  return (
    <section id="offre" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ce que nous construisons</h2>
          <p className="text-lg text-gray-400">
            Un site vitrine complet, conçu pour convertir vos visiteurs en clients.
            <br />
            <span className="text-sm opacity-70 italic">*Le périmètre final sera adapté selon votre activité.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col gap-3">
              <div className="mb-1">{feat.icon}</div>
              <h3 className="text-lg font-medium text-white">{feat.title}</h3>
              <p className="text-sm text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
