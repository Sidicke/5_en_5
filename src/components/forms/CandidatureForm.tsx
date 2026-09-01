"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitCandidature } from "@/app/actions/candidature";
import { CandidatureFormData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const ErrorMessage = ({ name, errors }: { name: string, errors: Record<string, string[]> | undefined }) => {
  if (!errors || !errors[name]) return null;
  return (
    <div className="text-red-400 text-xs mt-1">
      {errors[name].map((err, i) => (
        <p key={i}>{err}</p>
      ))}
    </div>
  );
};

export default function CandidatureForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<CandidatureFormData>({
    nom_entreprise: "",
    secteur: "",
    nom_responsable: "",
    email: "",
    telephone: "",
    type_projet: "creation",
    description_besoin: "",
    acceptation_conditions: false,
    honeypot: "",
  });

  const steps = [
    { title: "L'entreprise" },
    { title: "Le projet" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
    
    if (name === "description_besoin") {
      if (typeof finalValue === "string" && finalValue.length > 0 && finalValue.length < 20) {
        setErrors(prev => ({
          ...prev,
          description_besoin: ["Décrivez votre besoin (20 caractères minimum)"]
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.description_besoin;
          return newErrors;
        });
      }
    } else if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string[]> = {};
    
    if (step === 0) {
      if (!formData.nom_entreprise || formData.nom_entreprise.length < 2) {
        newErrors.nom_entreprise = ["Le nom de l'entreprise est requis (2 min)"];
      }
      if (!formData.secteur || formData.secteur.length < 2) {
        newErrors.secteur = ["Le secteur d'activité est requis (2 min)"];
      }
      if (!formData.nom_responsable || formData.nom_responsable.length < 2) {
        newErrors.nom_responsable = ["Le nom du responsable est requis (2 min)"];
      }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = ["L'adresse email doit être valide"];
      }
      if (!formData.telephone || formData.telephone.length < 8) {
        newErrors.telephone = ["Le numéro de téléphone est requis (8 min)"];
      }
    }

    if (step === 1) {
      if (!formData.type_projet) {
        newErrors.type_projet = ["Le type de projet est requis"];
      }
      if (!formData.description_besoin || formData.description_besoin.length < 20) {
        newErrors.description_besoin = ["Décrivez votre besoin (20 caractères minimum)"];
      }
      if (!formData.acceptation_conditions) {
        newErrors.acceptation_conditions = ["Vous devez accepter les conditions du challenge"];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitCandidature(formData);

      if (result.success) {
        router.push("/candidater/confirmation");
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setGlobalError(result.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      setGlobalError("Une erreur inattendue est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/50 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800">
      
      {/* Honeypot field - hidden from users */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="honeypot">Ne pas remplir ce champ si vous êtes humain :</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {globalError && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {globalError}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-xs font-medium ${
                index === currentStep 
                  ? "text-indigo-400" 
                  : index < currentStep 
                    ? "text-gray-300" 
                    : "text-gray-600"
              }`}
            >
              Étape {index + 1}: {step.title}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Étape 1 : L'entreprise */}
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="nom_entreprise" className="block text-sm font-medium text-gray-300 mb-1">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                id="nom_entreprise"
                name="nom_entreprise"
                value={formData.nom_entreprise}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.nom_entreprise ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                placeholder="Ex: Ma Super Boite"
              />
              <ErrorMessage name="nom_entreprise" errors={errors} />
            </div>

            <div>
              <label htmlFor="secteur" className="block text-sm font-medium text-gray-300 mb-1">
                Secteur d'activité *
              </label>
              <input
                type="text"
                id="secteur"
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.secteur ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                placeholder="Ex: Restauration, E-commerce, BTP..."
              />
              <ErrorMessage name="secteur" errors={errors} />
            </div>

            <div>
              <label htmlFor="nom_responsable" className="block text-sm font-medium text-gray-300 mb-1">
                Prénom & Nom du responsable *
              </label>
              <input
                type="text"
                id="nom_responsable"
                name="nom_responsable"
                value={formData.nom_responsable}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.nom_responsable ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                placeholder="Ex: Jean Dupont"
              />
              <ErrorMessage name="nom_responsable" errors={errors} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                  placeholder="jean@masuperboite.com"
                />
                <ErrorMessage name="email" errors={errors} />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-1">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.telephone ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                  placeholder="06 12 34 56 78"
                />
                <ErrorMessage name="telephone" errors={errors} />
              </div>
            </div>
          </motion.div>
        )}

      {/* Étape 2 : Le projet */}
        {currentStep === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type de projet *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${formData.type_projet === 'creation' ? 'bg-indigo-900/30 border-indigo-500' : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'}`}>
                  <input
                    type="radio"
                    name="type_projet"
                    value="creation"
                    checked={formData.type_projet === "creation"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-white">Création</span>
                      <span className="mt-1 flex items-center text-xs text-gray-400">Je n'ai pas encore de site web</span>
                    </span>
                  </span>
                  {formData.type_projet === "creation" && (
                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${formData.type_projet === 'refonte' ? 'bg-indigo-900/30 border-indigo-500' : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'}`}>
                  <input
                    type="radio"
                    name="type_projet"
                    value="refonte"
                    checked={formData.type_projet === "refonte"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-white">Refonte</span>
                      <span className="mt-1 flex items-center text-xs text-gray-400">J'ai un site mais je veux le refaire</span>
                    </span>
                  </span>
                  {formData.type_projet === "refonte" && (
                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              <ErrorMessage name="type_projet" errors={errors} />
            </div>

            <div>
              <label htmlFor="description_besoin" className="block text-sm font-medium text-gray-300 mb-1">
                Description de votre besoin *
              </label>
              <textarea
                id="description_besoin"
                name="description_besoin"
                rows={5}
                value={formData.description_besoin}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-800/50 border ${errors.description_besoin ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-colors`}
                placeholder="Expliquez-nous pourquoi vous avez besoin d'un site web, ce qu'il doit faire..."
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 20 caractères.</p>
              <ErrorMessage name="description_besoin" errors={errors} />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <label className="flex items-start space-x-3 cursor-pointer p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 transition-colors">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="acceptation_conditions"
                    checked={formData.acceptation_conditions}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 bg-gray-900 border-gray-600 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-200">Conditions Générales *</span>
                  <p className="text-gray-400">J'ai lu et j'accepte le <a href="/reglement" target="_blank" className="text-indigo-400 hover:underline">règlement du challenge 5 EN 5</a>.</p>
                  <ErrorMessage name="acceptation_conditions" errors={errors} />
                </div>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation boutons */}
      <div className="pt-6 mt-6 border-t border-gray-800 flex items-center justify-between">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-transparent border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50"
          >
            Précédent
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Soumission...
              </>
            ) : (
              "Soumettre la candidature"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
