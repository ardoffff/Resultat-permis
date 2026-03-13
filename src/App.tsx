import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, FileText, LogOut } from 'lucide-react';

const SECRET_CODE = "ETG2026";

const candidateData = {
  name: "AZIALI-MBOUNGOU ABIGAELLE ESTHER LOUANGE",
  score: 37,
  total: 40,
  result: "FAVORABLE",
  themes: [
    { id: "L", name: "Dispositions légales en matière de circulation routière", errors: 0 },
    { id: "C", name: "Le conducteur", errors: 0 },
    { id: "R", name: "La route", errors: 0 },
    { id: "U", name: "Les autres usagers", errors: 1 },
    { id: "D", name: "Réglementation générale et divers", errors: 1 },
    { id: "A", name: "Les premiers secours", errors: 0 },
    { id: "P", name: "Précautions nécessaires à prendre en quittant le véhicule", errors: 1 },
    { id: "M", name: "Eléments mécaniques liés à la sécurité", errors: 0 },
    { id: "S", name: "Equipements de sécurité des véhicules", errors: 0 },
    { id: "E", name: "Règles d'utilisation du véhicule en relation avec le respect de l'environnement", errors: 0 },
  ]
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-white font-dm selection:bg-gold/30">
      {isAuthenticated ? (
        <ResultScreen onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 text-gold mb-6 border border-gold/20">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-playfair text-white mb-3">Accès Sécurisé</h1>
          <p className="text-white/50 text-sm">Veuillez saisir votre code d'accès pour consulter vos résultats d'examen.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="relative">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code secret"
                className={`w-full px-5 py-4 rounded-xl bg-black/40 border focus:outline-none focus:ring-2 transition-all ${
                  error ? 'border-red-500/50 focus:ring-red-500/20 text-red-100' : 'border-white/10 focus:border-gold/50 focus:ring-gold/20 text-white'
                } placeholder:text-white/30 tracking-widest text-center text-lg`}
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-3 text-center font-medium"
              >
                Code incorrect. Veuillez réessayer.
              </motion.p>
            )}
          </motion.div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gold hover:bg-gold-hover text-dark-bg font-bold text-lg transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-[0.98]"
          >
            Consulter mes résultats
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function ResultScreen({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'results' | 'document'>('results');

  const percentage = Math.round((candidateData.score / candidateData.total) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col"
    >
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair text-white">Résultats d'Examen</h1>
          </div>
          <p className="text-white/50 text-sm md:text-base ml-13">Épreuve Théorique Générale du permis de conduire</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Mobile Tabs */}
          <div className="flex md:hidden bg-white/5 p-1 rounded-xl border border-white/10 w-full">
            <button 
              onClick={() => setActiveTab('results')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'results' ? 'bg-gold text-dark-bg shadow-md' : 'text-white/60 hover:text-white'}`}
            >
              Résultats
            </button>
            <button 
              onClick={() => setActiveTab('document')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'document' ? 'bg-gold text-dark-bg shadow-md' : 'text-white/60 hover:text-white'}`}
            >
              Document
            </button>
          </div>

          <button 
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        {/* Left Column - Document */}
        <div className={`md:col-span-5 lg:col-span-6 flex flex-col gap-4 ${activeTab === 'results' ? 'hidden md:flex' : 'flex'}`}>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex-1 flex flex-col min-h-[500px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-playfair text-white/90">
                Document Officiel
              </h2>
            </div>
            
            <div className="flex-1 bg-white rounded-sm border border-white/5 overflow-hidden flex items-start justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <OfficialDocument />
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className={`md:col-span-7 lg:col-span-6 flex flex-col gap-6 ${activeTab === 'document' ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Candidate Info Card */}
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-xs text-gold uppercase tracking-[0.2em] mb-2 font-semibold">Candidat</h3>
              <p className="text-2xl md:text-3xl font-playfair text-white mb-8 leading-tight">
                {candidateData.name}
              </p>
              
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h3 className="text-xs text-white/50 uppercase tracking-[0.1em] mb-2">Score Obtenu</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-playfair text-gold leading-none">{candidateData.score}</span>
                    <span className="text-2xl text-white/30 font-light">/{candidateData.total}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border ${
                    candidateData.result === 'FAVORABLE' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                  }`}>
                    {candidateData.result === 'FAVORABLE' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {candidateData.result}
                  </div>
                  <p className="text-white/40 text-sm mt-3 font-medium">{percentage}% de réussite globale</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-black/50 rounded-full mt-8 overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-gold/80 to-gold rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Themes Table */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 flex-1 flex flex-col">
            <h3 className="text-xl font-playfair text-white/90 mb-6">Détail par thématique</h3>
            
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {candidateData.themes.map((theme, idx) => (
                <motion.div 
                  key={theme.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.05), ease: "easeOut" }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-white/[0.03] hover:border-white/10 hover:bg-white/[0.02] transition-all group"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-gold font-bold text-sm shrink-0 border border-white/5 group-hover:border-gold/30 transition-colors">
                      {theme.id}
                    </span>
                    <span className="text-sm text-white/80 leading-snug">{theme.name}</span>
                  </div>
                  
                  <div className="shrink-0">
                    {theme.errors === 0 ? (
                      <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/10">
                        <CheckCircle2 className="w-4 h-4" />
                        0 erreur
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/10">
                        <XCircle className="w-4 h-4" />
                        {theme.errors} erreur{theme.errors > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile Logout */}
      <div className="md:hidden mt-6 text-center">
        <button 
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </motion.div>
  );
}

function OfficialDocument() {
  return (
    <div className="bg-white text-black p-6 sm:p-8 font-sans text-sm w-full h-full overflow-y-auto">
      <div className="mb-8">
        <p>Identifiant NEPH : <span className="font-bold">210836200230</span></p>
        <p>Date de naissance : <span className="font-bold">28/03/2000</span></p>
      </div>

      <p className="font-bold mb-8 uppercase">AZIALI-MBOUNGOU ABIGAELLE ESTHER LOUANGE,</p>

      <p className="mb-6 leading-relaxed">
        Vous avez passé l'Epreuve Théorique Générale du permis de conduire du 13/03/2026 sur le site de AVENUE GEORGES CLEMENCEAU 77000 VAUX LE PENIL.
      </p>

      <p className="mb-8 leading-relaxed">
        A l'issue de l'épreuve, vos réponses ont été transmises au Ministère de l'Intérieur pour correction. Vous avez obtenu la note de <span className="font-bold">37 sur 40</span>.
      </p>

      <p className="text-center text-lg mb-10">
        Avis : <span className="font-bold text-xl">FAVORABLE</span>
      </p>

      <p className="mb-3">Les thématiques sur lesquelles vous avez fait des erreurs sont les suivantes :</p>

      <table className="w-full border-collapse border border-black text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="border border-black p-2 text-center font-bold">Thématiques concernées</th>
            <th className="border border-black p-2 text-center w-24 sm:w-32 font-normal">Nombre d'erreurs<br/>parmi les 40 questions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• L</span> : Dispositions légales en matière de circulation routière</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• C</span> : Le conducteur</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• R</span> : La route</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• U</span> : Les autres usagers</td><td className="border border-black p-1.5 text-center">01</td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• D</span> : Réglementation générale et divers</td><td className="border border-black p-1.5 text-center">01</td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• A</span> : Les premiers secours</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• P</span> : Précautions nécessaires à prendre en quittant le véhicule</td><td className="border border-black p-1.5 text-center">01</td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• M</span> : Eléments mécaniques liés à la sécurité</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• S</span> : Equipements de sécurité des véhicules</td><td className="border border-black p-1.5 text-center"></td></tr>
          <tr><td className="border border-black p-1.5"><span className="font-bold">• E</span> : Règles d'utilisation du véhicule en relation avec le respect de l'environnement</td><td className="border border-black p-1.5 text-center"></td></tr>
        </tbody>
      </table>
    </div>
  );
}
