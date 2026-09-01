import { getArchiveWeeks } from "@/app/actions/admin";
import Link from "next/link";
import { FolderArchive } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ArchivesPage() {
  const weeks = await getArchiveWeeks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Archives des sessions</h1>
        <p className="text-gray-400 mt-1">Consultez les candidatures archivées des semaines précédentes.</p>
      </div>

      {weeks.length === 0 ? (
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-12 text-center">
          <FolderArchive className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-300">Aucune archive disponible</h2>
          <p className="text-gray-500 mt-2">Vous n'avez pas encore archivé de candidatures.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((week) => (
            <Link
              key={week}
              href={`/admin/candidatures?status=ARCHIVEE&semaine=${week}`}
              className="bg-[#111827] border border-[#1f2937] hover:border-indigo-500/50 rounded-xl p-6 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                  <FolderArchive size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Semaine {week}</h2>
                  <p className="text-sm text-gray-400">Voir les candidatures</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
