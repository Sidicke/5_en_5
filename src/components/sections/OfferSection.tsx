import { LayoutTemplate, Briefcase, Image as ImageIcon, Phone, MessageSquare, MapPin, Smartphone, Rocket } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function OfferSection() {
  const features = [
    { title: "Présentation pro", desc: "Mettez en valeur votre histoire et votre équipe.", icon: <LayoutTemplate className="w-5 h-5" />, className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-900/40 to-[#0a0a0a]" },
    { title: "Galerie / Portfolio", desc: "Montrez vos réalisations.", icon: <ImageIcon className="w-5 h-5" />, className: "md:col-span-1 md:row-span-1" },
    { title: "100% Mobile", desc: "Adapté aux smartphones.", icon: <Smartphone className="w-5 h-5" />, className: "md:col-span-1 md:row-span-2" },
    { title: "Vos services", desc: "Clarté sur ce que vous offrez.", icon: <Briefcase className="w-5 h-5" />, className: "md:col-span-1 md:row-span-1" },
    { title: "Mise en ligne", desc: "Déploiement complet sur le web.", icon: <Rocket className="w-5 h-5" />, className: "md:col-span-2 md:row-span-1 bg-gradient-to-tr from-cyan-900/20 to-[#0a0a0a]" },
  ];

  return (
    <section id="offre" className="py-24 md:py-32 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)] pointer-events-none" />
      <FadeIn className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 mb-6 uppercase tracking-wider">
            Notre offre
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ce que nous construisons</h2>
          <p className="text-lg md:text-xl text-gray-400">
            Un site vitrine complet, ultra-performant et conçu pour convertir vos visiteurs en clients.
            <br className="hidden md:block" />
            <span className="text-sm opacity-70 italic mt-4 block text-gray-500">*Le périmètre final sera adapté selon votre activité.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className={cn(
                "group relative p-6 md:p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden",
                feat.className
              )}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/5 to-transparent transition-opacity duration-300 pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-300">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
