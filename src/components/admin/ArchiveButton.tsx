"use client";

import { useState } from "react";
import { archiveAllCandidatures } from "@/app/actions/admin";
import { Archive } from "lucide-react";

export default function ArchiveButton({ candidaturesOuvertes }: { candidaturesOuvertes: boolean }) {
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [semaine, setSemaine] = useState("1");

  const handleArchive = async () => {
    if (candidaturesOuvertes) {
      alert("Vous devez d'abord bloquer les candidatures depuis le tableau de bord.");
      return;
    }
    
    setLoading(true);
    const res = await archiveAllCandidatures(parseInt(semaine, 10));
    if (res.success) {
      alert(res.message);
      setShowPrompt(false);
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  if (showPrompt) {
    return (
      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
        <span className="text-sm text-gray-300">Semaine :</span>
        <input 
          type="number" 
          value={semaine}
          onChange={(e) => setSemaine(e.target.value)}
          className="w-16 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-sm"
          min="1"
        />
        <button 
          onClick={handleArchive}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Confirmer"}
        </button>
        <button 
          onClick={() => setShowPrompt(false)}
          className="text-gray-400 hover:text-white px-2 py-1 text-sm"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        if (candidaturesOuvertes) {
          alert("Vous devez d'abord bloquer les candidatures depuis le tableau de bord (État des inscriptions) avant de pouvoir archiver.");
        } else {
          setShowPrompt(true);
        }
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
        candidaturesOuvertes 
          ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700" 
          : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
      }`}
      title={candidaturesOuvertes ? "Bloquez les candidatures d'abord" : "Archiver toutes les candidatures courantes"}
    >
      <Archive size={16} />
      Archiver la session
    </button>
  );
}
