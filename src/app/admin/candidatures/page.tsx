import { getCandidatures } from "@/app/actions/admin";
import Link from "next/link";
import { Search } from "lucide-react";
import { getCandidaturesStatus } from "@/app/actions/settings";
import ArchiveButton from "@/components/admin/ArchiveButton";

export const dynamic = "force-dynamic";

export default async function CandidaturesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const status = params.status || "";
  const page = parseInt(params.page || "1", 10);

  const { data: candidatures, count, error } = await getCandidatures(query, status, page);
  const totalPages = Math.ceil(count / 20);
  const isOpen = await getCandidaturesStatus();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Candidatures</h1>
          {error && <p className="text-red-500 font-bold mt-2">ERREUR SUPABASE: {error}</p>}
          <p className="text-gray-400 mt-1">{count} candidatures trouvées</p>
        </div>
        <ArchiveButton candidaturesOuvertes={isOpen} />
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4">
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher une entreprise..."
              className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              name="status"
              defaultValue={status}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
            >
              <option value="">Tous les statuts</option>
              <option value="RECUE">Reçue</option>
              <option value="A_EXAMINER">À examiner</option>
              <option value="EVALUEE">Évaluée</option>
              <option value="PRESELECTIONNEE">Présélectionnée</option>
              <option value="SELECTIONNEE">Sélectionnée</option>
              <option value="REFUSEE">Refusée</option>
              <option value="INELIGIBLE">Inéligible</option>
              <option value="RETIREE">Retirée</option>
              <option value="ARCHIVEE">Archivée</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
          >
            Filtrer
          </button>
        </form>
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0a0a0a] text-gray-400 uppercase font-medium border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4">Entreprise</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {candidatures.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Aucune candidature trouvée.
                  </td>
                </tr>
              ) : (
                candidatures.map((cand: any) => (
                  <tr key={cand.id} className="hover:bg-[#1f2937]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{cand.nom_entreprise}</div>
                      <div className="text-gray-400 text-xs mt-1">{cand.secteur}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs capitalize">
                        {cand.type_projet}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-700 bg-gray-800/50">
                          {cand.status}
                        </span>
                        {cand.status === "ARCHIVEE" && cand.archive_semaine && (
                          <span className="text-xs font-medium text-gray-400">
                            Semaine {cand.archive_semaine}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {cand.score !== null ? (
                        <span className={cand.score >= 70 ? "text-green-400" : cand.score >= 50 ? "text-yellow-400" : "text-red-400"}>
                          {cand.score}/100
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(cand.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/candidatures/${cand.id}`}
                        className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#1f2937] flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <Link
                  key={p}
                  href={`/admin/candidatures?q=${query}&status=${status}&page=${p}`}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                    p === page
                      ? "bg-indigo-600 text-white"
                      : "bg-[#0a0a0a] border border-[#1f2937] text-gray-400 hover:bg-[#1f2937] hover:text-white"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
