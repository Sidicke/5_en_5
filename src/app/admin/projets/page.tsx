"use client";

import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, getCandidatures, deleteProject } from "@/app/actions/admin";
import { ProjetStatus } from "@/types";
import { Plus, Edit2, Save, X, ExternalLink, Trash2 } from "lucide-react";

export default function ProjetsPage() {
  const [projets, setProjets] = useState<any[]>([]);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWeek, setEditingWeek] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [projetsData, candsData] = await Promise.all([
      getProjects(),
      getCandidatures("", "SELECTIONNEE", 1) // On récupère celles sélectionnées
    ]);
    setProjets(projetsData);
    setCandidatures(candsData.data);
    setLoading(false);
  };

  const handleEdit = (week: number, existingProject: any) => {
    setEditingWeek(week);
    if (existingProject) {
      setFormData(existingProject);
    } else {
      setFormData({
        semaine: week,
        status: "EN_ATTENTE",
        candidature_id: "",
        entreprise: "",
        secteur: "",
        description: "",
      });
    }
  };

  const handleCandidatureSelect = (id: string) => {
    const cand = candidatures.find(c => c.id === id);
    if (cand) {
      setFormData({
        ...formData,
        candidature_id: cand.id,
        entreprise: cand.nom_entreprise,
        secteur: cand.secteur,
        description: cand.objectif_site,
      });
    }
  };

  const handleSave = async () => {
    if (formData.id) {
      await updateProject(formData.id, formData);
    } else {
      await createProject(formData);
    }
    setEditingWeek(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ? L'entreprise sera retirée de la semaine.")) {
      await deleteProject(id);
      loadData();
    }
  };

  const weeks = [1, 2, 3, 4, 5];

  if (loading) return <div className="p-8 text-center text-gray-400">Chargement...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Projets du challenge</h1>
        <p className="text-gray-400 mt-1">Gestion des 5 projets pour les 5 semaines</p>
      </div>

      <div className="space-y-4">
        {weeks.map(week => {
          const projet = projets.find(p => p.semaine === week);
          const isEditing = editingWeek === week;

          return (
            <div key={week} className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
              <div className="bg-[#0a0a0a] px-6 py-4 border-b border-[#1f2937] flex justify-between items-center">
                <h2 className="font-bold text-lg">Semaine {week}</h2>
                {!isEditing && (
                  <div className="flex gap-4">
                    {projet && (
                      <button 
                        onClick={() => handleDelete(projet.id)}
                        className="text-red-400 hover:text-red-300 flex items-center text-sm font-medium transition-colors"
                      >
                        <Trash2 size={16} className="mr-1" /> Supprimer
                      </button>
                    )}
                    <button 
                      onClick={() => handleEdit(week, projet)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium transition-colors"
                    >
                      {projet ? <><Edit2 size={16} className="mr-1" /> Modifier</> : <><Plus size={16} className="mr-1" /> Assigner</>}
                    </button>
                  </div>
                )}
                {isEditing && (
                  <button 
                    onClick={() => setEditingWeek(null)}
                    className="text-gray-400 hover:text-white flex items-center text-sm font-medium"
                  >
                    <X size={16} className="mr-1" /> Annuler
                  </button>
                )}
              </div>

              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    {!projet && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Sélectionner une candidature</label>
                        <select 
                          value={formData.candidature_id || ""}
                          onChange={(e) => handleCandidatureSelect(e.target.value)}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white"
                        >
                          <option value="">-- Choisir une candidature SÉLECTIONNÉE --</option>
                          {candidatures.map(c => (
                            <option key={c.id} value={c.id}>{c.nom_entreprise} ({c.secteur})</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Entreprise</label>
                        <input 
                          type="text" 
                          value={formData.entreprise || ""}
                          onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Statut du projet</label>
                        <select 
                          value={formData.status || "EN_ATTENTE"}
                          onChange={(e) => setFormData({...formData, status: e.target.value as ProjetStatus})}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white"
                        >
                          <option value="EN_ATTENTE">En attente</option>
                          <option value="EN_COURS">En cours</option>
                          <option value="TERMINE">Terminé</option>
                          <option value="LIVRE">Livré</option>
                          <option value="ANNULE">Annulé</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Description courte</label>
                      <textarea 
                        value={formData.description || ""}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Image de couverture</label>
                        <div className="flex flex-col gap-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const data = new FormData();
                              data.append('file', file);
                              try {
                                const res = await fetch('/api/upload', { method: 'POST', body: data });
                                const json = await res.json();
                                if (json.url) setFormData({...formData, image_url: json.url});
                              } catch (error) {
                                console.error('Erreur upload:', error);
                              }
                            }}
                            className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                          />
                          {formData.image_url && (
                            <div className="text-xs text-green-400 truncate">
                              ✓ Image uploadée ({formData.image_url})
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">URL Site en ligne</label>
                        <input 
                          type="text" 
                          value={formData.site_url || ""}
                          onChange={(e) => setFormData({...formData, site_url: e.target.value})}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={handleSave}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                      >
                        <Save size={18} className="mr-2" /> Enregistrer
                      </button>
                    </div>
                  </div>
                ) : projet ? (
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold">{projet.entreprise}</h3>
                        <p className="text-sm text-gray-400">{projet.secteur}</p>
                      </div>
                      <p className="text-sm">{projet.description}</p>
                      {projet.site_url && (
                        <a href={projet.site_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-400 text-sm hover:underline">
                          <ExternalLink size={14} className="mr-1" /> Visiter le site
                        </a>
                      )}
                    </div>
                    <div className="w-full md:w-48 flex flex-col gap-2 shrink-0">
                      <div className="p-3 bg-[#0a0a0a] border border-[#1f2937] rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1 uppercase font-bold">Statut</p>
                        <span className="text-sm font-medium">{projet.status.replace("_", " ")}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucun projet assigné pour cette semaine.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
