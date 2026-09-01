import { getProjects } from "@/app/actions/admin";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsSection() {
  const projectsData = await getProjects();
  const weeks = [1, 2, 3, 4, 5];

  return (
    <section id="projets" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Les réalisations</h2>
          <p className="text-lg text-gray-400">
            Découvrez ici les 5 projets créés semaine après semaine pendant le challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {weeks.map((week) => {
            const project = projectsData.find((p: any) => p.semaine === week);

            if (project) {
              return (
                <div key={week} className="group relative rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 shadow-lg">
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900 border-b border-white/5">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={`Projet ${project.entreprise}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-2xl">
                        En construction
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                        S{week}
                      </span>
                    </div>
                    {project.status === "LIVRE" && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                          Livré
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{project.entreprise}</h3>
                      <p className="text-sm text-indigo-400/80 font-medium">{project.secteur}</p>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    {/* CTA */}
                    {project.site_url ? (
                      <Link 
                        href={project.site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 text-white font-medium transition-all group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                      >
                        Visiter le site <ExternalLink size={16} className="ml-2" />
                      </Link>
                    ) : (
                      <button disabled className="mt-auto inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-gray-600 font-medium cursor-not-allowed">
                        Site en cours de développement
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={week} className="rounded-3xl bg-white/5 border border-white/10 border-dashed flex flex-col items-center justify-center p-8 text-center relative overflow-hidden min-h-[400px]">
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    S{week}
                  </span>
                </div>
                <span className="text-6xl font-black text-white/5 mb-4">0{week}</span>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Projet {week}</h3>
                <p className="text-sm text-gray-600 uppercase tracking-widest font-semibold">À venir</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
