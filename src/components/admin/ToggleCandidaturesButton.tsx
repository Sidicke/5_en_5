"use client";

import { useState } from "react";
import { toggleCandidaturesStatus } from "@/app/actions/settings";
import { Lock, Unlock } from "lucide-react";

export default function ToggleCandidaturesButton({ initialStatus }: { initialStatus: boolean }) {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = !isOpen;
    const res = await toggleCandidaturesStatus(newStatus);
    if (res.success) {
      setIsOpen(newStatus);
    } else {
      alert("Erreur: " + res.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 flex items-center justify-between mt-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">État des inscriptions</h2>
        <p className="text-sm text-gray-400">Bloquez ou débloquez le formulaire de candidature public.</p>
      </div>
      
      <button 
        onClick={handleToggle}
        disabled={loading}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
          isOpen 
            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20" 
            : "bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20"
        }`}
      >
        {loading ? (
          "Patientez..."
        ) : isOpen ? (
          <><Lock size={18} /> Bloquer les inscriptions</>
        ) : (
          <><Unlock size={18} /> Rouvrir les inscriptions</>
        )}
      </button>
    </div>
  );
}
