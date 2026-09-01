import { getStats } from "@/app/actions/admin";
import { getCandidaturesStatus } from "@/app/actions/settings";
import ToggleCandidaturesButton from "@/components/admin/ToggleCandidaturesButton";
import Link from "next/link";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getStats();
  if (stats.error) return <div className="p-8 text-red-500 font-bold text-2xl">Erreur Supabase (Dashboard): {stats.error}</div>;
  const candidaturesOuvertes = await getCandidaturesStatus();

  const statCards = [
    { name: "Total Candidatures", value: stats.total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Reçues", value: stats.byStatus["RECUE"] || 0, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Présélectionnées", value: stats.byStatus["PRESELECTIONNEE"] || 0, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Refusées", value: stats.byStatus["REFUSEE"] || 0, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble du challenge 5 EN 5</p>
        </div>
        <Link 
          href="/admin/candidatures"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Voir toutes les candidatures
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#111827] border border-[#1f2937] rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Répartition par statut</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.byStatus).map(([status, count]) => (
            <div key={status} className="bg-[#0a0a0a] p-4 rounded-lg border border-[#1f2937]">
              <p className="text-xs text-gray-400 font-medium mb-1 truncate">{status}</p>
              <p className="text-xl font-bold">{count as number}</p>
            </div>
          ))}
        </div>
      </div>
      
      <ToggleCandidaturesButton initialStatus={candidaturesOuvertes} />
    </div>
  );
}
