import FadeIn from "@/components/ui/FadeIn";
import { 
  PenTool, 
  Code, 
  Layout, 
  Smartphone, 
  HeartHandshake,
  Globe,
  Server,
  Type,
  Image as ImageIcon,
  Wrench
} from "lucide-react";

export default function ConditionsSection() {
  const offertItems = [
    { text: "Conception sur mesure", icon: <PenTool className="w-5 h-5 text-indigo-400 shrink-0" /> },
    { text: "Développement frontend", icon: <Code className="w-5 h-5 text-indigo-400 shrink-0" /> },
    { text: "Intégration du contenu", icon: <Layout className="w-5 h-5 text-indigo-400 shrink-0" /> },
    { text: "Optimisation mobile", icon: <Smartphone className="w-5 h-5 text-indigo-400 shrink-0" /> },
    { text: "Accompagnement projet", icon: <HeartHandshake className="w-5 h-5 text-indigo-400 shrink-0" /> },
  ];

  const chargeItems = [
    { text: "Achat du nom de domaine", icon: <Globe className="w-5 h-5 text-gray-500 shrink-0" /> },
    { text: "Hébergement web", icon: <Server className="w-5 h-5 text-gray-500 shrink-0" /> },
    { text: "Fourniture des textes initiaux", icon: <Type className="w-5 h-5 text-gray-500 shrink-0" /> },
    { text: "Fourniture des images/logos", icon: <ImageIcon className="w-5 h-5 text-gray-500 shrink-0" /> },
    { text: "Maintenance future", icon: <Wrench className="w-5 h-5 text-gray-500 shrink-0" /> },
  ];

  return (
    <section id="conditions" className="py-24 bg-[#050505]">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Les conditions</h2>
          <p className="text-lg text-gray-400">
            Le challenge est exclusivement réservé à la création de sites vitrines (pas d'e-commerce, pas d'applications web complexes).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ce qui est offert */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ce qui est offert</span>
            </h3>
            <ul className="space-y-5 relative z-10">
              {offertItems.map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ce qui reste à charge */}
          <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="text-gray-400">À votre charge</span>
            </h3>
            <ul className="space-y-5 relative z-10">
              {chargeItems.map((item, i) => (
                <li key={i} className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700/50">
                    {item.icon}
                  </div>
                  <span className="text-gray-400 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
