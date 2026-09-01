"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCandidature, updateCandidatureStatus, updateNote, upsertEvaluation } from "@/app/actions/admin";
import { Candidature, Evaluation, CandidatureStatus } from "@/types";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";

export default function CandidatureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [candidature, setCandidature] = useState<Candidature | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [status, setStatus] = useState<CandidatureStatus>("RECUE");
  const [note, setNote] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  
  const [evalScores, setEvalScores] = useState({
    besoin_reel: 0,
    potentiel_transformation: 0,
    potentiel_demonstration: 0,
    disponibilite: 0,
    clarte_besoin: 0,
    contenus_disponibles: 0,
    diversite: 0,
  });
  const [savingEval, setSavingEval] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await getCandidature(id);
      if (result && result.candidature) {
        setCandidature(result.candidature);
        setStatus(result.candidature.status);
        setNote(result.candidature.note_interne || "");
        
        if (result.evaluation) {
          setEvaluation(result.evaluation);
          setEvalScores({
            besoin_reel: result.evaluation.besoin_reel,
            potentiel_transformation: result.evaluation.potentiel_transformation,
            potentiel_demonstration: result.evaluation.potentiel_demonstration,
            disponibilite: result.evaluation.disponibilite,
            clarte_besoin: result.evaluation.clarte_besoin,
            contenus_disponibles: result.evaluation.contenus_disponibles,
            diversite: result.evaluation.diversite,
          });
        }
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleStatusChange = async (newStatus: CandidatureStatus) => {
    setSavingStatus(true);
    setStatus(newStatus);
    await updateCandidatureStatus(id, newStatus);
    setSavingStatus(false);
    router.refresh();
  };

  const handleNoteSave = async () => {
    setSavingNote(true);
    await updateNote(id, note);
    setSavingNote(false);
    router.refresh();
  };

  const handleEvalSave = async () => {
    setSavingEval(true);
    await upsertEvaluation(id, evalScores);
    setSavingEval(false);
    router.refresh();
  };

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Chargement...</div>;
  }

  if (!candidature) {
    return <div>Candidature non trouvée.</div>;
  }

  const totalScore = Object.values(evalScores).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/candidatures" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4">
          <ArrowLeft size={16} className="mr-1" /> Retour aux candidatures
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{candidature.nom_entreprise}</h1>
            <p className="text-gray-400 mt-1">
              Soumise le {new Date(candidature.created_at).toLocaleDateString('fr-FR')} à {new Date(candidature.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
          <span className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-700 bg-gray-800/50">
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Responsable</p>
                <p className="font-medium text-white">{candidature.nom_responsable}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Secteur d'activité</p>
                <p className="font-medium text-white">{candidature.secteur}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium text-white">
                  <a href={`mailto:${candidature.email}`} className="text-indigo-400 hover:underline">{candidature.email}</a>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Téléphone</p>
                <p className="font-medium text-white">
                  <a href={`tel:${candidature.telephone}`} className="text-indigo-400 hover:underline">{candidature.telephone}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Le Projet : {candidature.type_projet === "creation" ? "Création de site" : "Refonte de site"}</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Description du besoin</p>
                <p className="bg-[#0a0a0a] p-4 rounded-lg border border-[#1f2937] whitespace-pre-wrap">{candidature.description_besoin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Eval */}
        <div className="space-y-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 sticky top-6">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-300 mb-2">Statut de la candidature</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as CandidatureStatus)}
                disabled={savingStatus}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-medium disabled:opacity-50"
              >
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

            <hr className="border-[#1f2937] my-6" />

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-300 mb-2">Note interne (confidentiel)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                placeholder="Remarques pour l'équipe..."
              />
              <button
                onClick={handleNoteSave}
                disabled={savingNote}
                className="mt-2 w-full flex items-center justify-center bg-[#1f2937] hover:bg-gray-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                {savingNote ? "Sauvegarde..." : <><Save size={16} className="mr-2" /> Enregistrer la note</>}
              </button>
            </div>

            <hr className="border-[#1f2937] my-6" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-gray-300">Évaluation (/100)</label>
                <span className={`text-xl font-bold ${totalScore >= 70 ? 'text-green-400' : totalScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {totalScore}
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'besoin_reel', label: 'Besoin réel (0-20)', max: 20 },
                  { key: 'potentiel_transformation', label: 'Potentiel transfo (0-20)', max: 20 },
                  { key: 'potentiel_demonstration', label: 'Potentiel démo (0-20)', max: 20 },
                  { key: 'disponibilite', label: 'Disponibilité (0-15)', max: 15 },
                  { key: 'clarte_besoin', label: 'Clarté besoin (0-10)', max: 10 },
                  { key: 'contenus_disponibles', label: 'Contenus (0-10)', max: 10 },
                  { key: 'diversite', label: 'Diversité (0-5)', max: 5 },
                ].map((crit) => (
                  <div key={crit.key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{crit.label}</span>
                      <span className="text-indigo-400 font-medium">{evalScores[crit.key as keyof typeof evalScores]}/{crit.max}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={crit.max}
                      value={evalScores[crit.key as keyof typeof evalScores]}
                      onChange={(e) => setEvalScores({ ...evalScores, [crit.key]: parseInt(e.target.value) })}
                      className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleEvalSave}
                disabled={savingEval}
                className="mt-6 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                {savingEval ? "Enregistrement..." : <><Save size={18} className="mr-2" /> Sauvegarder l'évaluation</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
