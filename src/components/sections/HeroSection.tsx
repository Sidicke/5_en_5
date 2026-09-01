import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Challenge en cours
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
          SIDICKE CODE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            — 5 EN 5
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl">
          5 entreprises. 5 semaines. 5 sites vitrines. <br className="hidden md:block"/>
          Nous transformons votre présence en ligne, gratuitement.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/candidater"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Candidater au challenge
          </Link>
          <Link
            href="#probleme"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-colors"
          >
            Découvrir le challenge
          </Link>
        </div>
      </div>
    </section>
  );
}
