"use client";
import { Globe, MonitorOff, Smartphone, TrendingDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <section id="probleme" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-[#050505] to-[#050505] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Votre présence en ligne mérite mieux
          </h2>
          <p className="text-lg text-gray-400">
            De nombreuses entreprises perdent des opportunités chaque jour à cause d'une vitrine numérique inexistante ou inefficace.
          </p>
        </FadeIn>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem, idx) => (
            <motion.div 
              variants={itemVariants}
              key={idx} 
              className="group p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-2"
            >
              <div className="mb-6 w-16 h-16 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/20 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
