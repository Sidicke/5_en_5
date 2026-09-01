"use client";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function ProcessSection() {
  const steps = [
    { title: "Candidature", desc: "Remplissez le formulaire en quelques minutes." },
    { title: "Sélection", desc: "Chaque semaine, nous choisissons le projet le plus impactant." },
    { title: "Cadrage", desc: "Un appel pour définir vos besoins exacts." },
    { title: "Conception", desc: "Création du design et de la structure." },
    { title: "Développement", desc: "Code et intégration de votre site." },
    { title: "Livraison", desc: "Mise en ligne et remise des clés." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section id="fonctionnement" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comment ça fonctionne</h2>
            <p className="text-lg text-gray-400">Un processus fluide, de votre candidature jusqu'à la mise en ligne.</p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Ligne connectrice desktop */}
          <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-indigo-600/30 -translate-y-1/2" 
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative z-10"
          >
            {steps.map((step, idx) => (
              <motion.div variants={itemVariants} key={idx} className="flex flex-row lg:flex-col items-center lg:text-center gap-6 lg:gap-4 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 shrink-0 rounded-full bg-[#0a0a0a] flex items-center justify-center text-indigo-400 font-bold text-lg border-2 border-indigo-500/50 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-lg shadow-indigo-500/10 transition-colors"
                >
                  {idx + 1}
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
