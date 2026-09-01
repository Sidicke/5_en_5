import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-lg text-white">SIDICKE CODE</span>
          <span className="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} Tous droits réservés.</span>
        </div>
        
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <Link href="#conditions" className="text-sm text-gray-400 hover:text-white transition-colors">
            Conditions du challenge
          </Link>
        </div>
      </div>
    </footer>
  );
}
