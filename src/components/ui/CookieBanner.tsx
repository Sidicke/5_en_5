"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pb-20 sm:pb-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="hidden sm:flex shrink-0 w-12 h-12 bg-indigo-900/30 rounded-full items-center justify-center">
            <Cookie className="w-6 h-6 text-indigo-400" />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-white font-medium mb-1">Nous utilisons des cookies 🍪</h3>
            <p className="text-sm text-gray-400">
              Ce site utilise des cookies pour analyser notre trafic et améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies. 
              <Link href="/reglement" className="text-indigo-400 hover:underline ml-1">Voir les conditions</Link>.
            </p>
          </div>
          
          <div className="flex shrink-0 gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <button
              onClick={() => setIsVisible(false)}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
