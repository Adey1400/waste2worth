import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';

const EarthLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0f0d] text-emerald-400">
      {/* The Antigravity Floating Container */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Glowing Aura */}
        <div className="absolute inset-0 bg-emerald-500 blur-[50px] opacity-30 rounded-full animate-pulse"></div>
        
        {/* The Spinning Earth */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <Globe2 size={120} strokeWidth={1} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        </motion.div>
      </motion.div>
      
      <motion.p 
        initial={{x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-sm font-semibold tracking-[0.2em] uppercase text-emerald-400/80"
      >
        Initializing Waste2Worth...
      </motion.p>
    </div>
  );
};

export default EarthLoader;