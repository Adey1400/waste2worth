import { motion } from 'framer-motion';
import { Gift, Lock, ShoppingBag, Coffee, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Rewards = () => {
  const { user } = useAuth();

  const brands = [
    { name: "Amazon", icon: <ShoppingBag size={18} />, color: "from-orange-500 to-yellow-400" },
    { name: "Flipkart", icon: <Smartphone size={18} />, color: "from-blue-500 to-sky-400" },
    { name: "Swiggy", icon: <Coffee size={18} />, color: "from-orange-600 to-red-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center pb-12">
      
      {/* Floating Hero Graphic */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
        <motion.div 
          animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-40 h-40 bg-gradient-to-br from-[#0f1714] to-[#0a0f0d] border border-emerald-500/30 rounded-full shadow-[0_0_50px_rgba(52,211,153,0.2)] flex items-center justify-center"
        >
          <Gift size={64} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#0a0f0d] border border-emerald-900/50 rounded-full flex items-center justify-center shadow-lg">
            <Lock size={24} className="text-slate-400" />
          </div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          The <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Rewards Vault</span> is opening soon.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          We are finalizing exclusive partnerships with your favorite brands. Soon, you will be able to convert your W2W coins directly into gift cards and vouchers.
        </p>
      </motion.div>

      {/* User Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-[#0f1714]/80 backdrop-blur-xl border border-emerald-900/50 p-6 rounded-3xl flex items-center gap-6 mb-12 shadow-lg"
      >
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <Sparkles className="text-emerald-400" size={28} />
        </div>
        <div className="text-left pr-8 border-r border-emerald-900/40">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Current Balance</p>
          <p className="text-3xl font-extrabold text-white">{user?.coins || 0} <span className="text-emerald-500 text-lg">W2W</span></p>
        </div>
        <div className="pl-4 text-left">
          <p className="text-sm text-slate-400">Keep recycling!</p>
          <p className="text-sm text-slate-400">Your coins are safely stored.</p>
        </div>
      </motion.div>

      {/* Floating Brand Pills */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-xl"
      >
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Partnering With</p>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand, i) => (
            <motion.div 
              key={brand.name}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0f0d] border border-emerald-900/30 rounded-full text-slate-300 shadow-md cursor-default transition-colors hover:border-emerald-500/30"
            >
              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${brand.color}`}>
                {brand.icon}
              </div>
              <span className="font-bold tracking-wide">{brand.name}</span>
            </motion.div>
          ))}
          <motion.div 
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0f0d] border border-emerald-900/30 rounded-full text-slate-500 shadow-md cursor-default"
          >
            <span className="font-bold tracking-wide">...and many more</span>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default Rewards;