import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Coins, Truck, ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import bgImage from '../assets/background.jpeg';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { user ,logout} = useAuth();
  const steps = [
    { icon: <Truck size={32} />, title: "Door-to-Door Pickup", desc: "Schedule a pickup and our team collects your sorted waste directly from your doorstep." },
    { icon: <Recycle size={32} />, title: "Digital Weighing", desc: "Provide the weight of your Dry, Wet, or Electronic waste in kilograms." },
    { icon: <Coins size={32} />, title: "Earn W2W Coins", desc: "Coins are instantly credited to your wallet based on the waste type and total weight." },
    { icon: <Globe2 size={32} />, title: "Redeem & Impact", desc: "Use your coins for exclusive vouchers while contributing to a greener planet." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-slate-200 font-sans selection:bg-emerald-500/30">
      

    {/* --- PUBLIC NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0f0d]/70 backdrop-blur-md border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left Side: Logo & Title ALWAYS visible */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Leaf className="text-emerald-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={28} />
            </motion.div>
            <span className="text-xl font-bold tracking-widest text-white">Waste2Worth</span>
          </div>

          {/* Right Side: Logic based on Auth State */}
          <div className="flex gap-4">
            {user ? (
              // IF LOGGED IN: Show nothing but a subtle Logout button
              <motion.button 
                onClick={logout} 
                whileHover={{ y: -2 }} 
                className="px-6 py-2 text-red-400 font-medium hover:text-red-300 transition-colors text-sm border border-red-500/20 rounded-full hover:bg-red-500/10"
              >
                Logout
              </motion.button>
            ) : (
              // IF NOT LOGGED IN: Show the standard Login / Get Started buttons
              <>
                <Link to="/login">
                  <motion.button whileHover={{ y: -2 }} className="px-6 py-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors text-sm">
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button whileHover={{ y: -2, boxShadow: "0 0 20px rgba(52,211,153,0.4)" }} className="px-6 py-2 bg-emerald-500 text-slate-900 font-bold rounded-full transition-all text-sm">
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with Dark Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="Recycling Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/90 via-[#0a0f0d]/80 to-[#0a0f0d]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 backdrop-blur-md"
          >
            <ShieldCheck size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Smart Waste Management</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Turning Waste into <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              Digital Wealth
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            Confirm disposal, choose your waste type, record the weight, and earn coins instantly. Join us in building a cleaner, greener tomorrow.
          </motion.p>

       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            {user ? (
              <Link to={user.role === 'AGENT' ? '/agent' : '/dashboard'}>
                <button className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-full text-lg hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  Go to Dashboard 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-full text-lg hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  Book a Pickup 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Antigravity Cards) --- */}
      <section className="py-24 relative z-10 bg-[#0a0f0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Daily waste disposal made rewarding and effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }} // Antigravity Hover Effect!
                className="bg-[#0f1714] border border-emerald-900/30 p-8 rounded-3xl relative group overflow-hidden"
              >
                {/* Glowing orb behind the icon */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/40 transition-colors"></div>
                
                <div className="text-emerald-400 mb-6 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Landing;