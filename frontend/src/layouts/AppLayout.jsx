import { motion } from 'framer-motion';
import { Home, Trash2, ShieldCheck, HelpCircle, LogIn, Leaf } from 'lucide-react'; // Added Leaf back!
import bgImage from '../assets/background.jpeg'; // Your exact background path

const AppLayout = ({ children }) => {
  const navItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'Services', icon: <Trash2 size={20} /> },
    { name: 'Impact', icon: <ShieldCheck size={20} /> },
    { name: 'FAQ', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div 
      className="flex h-screen text-slate-200 overflow-hidden font-sans relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* The Dark Glass Overlay */}
      <div className="absolute inset-0 bg-[#0a0f0d]/85 backdrop-blur-[2px] z-0"></div>
      
      {/* Left Sidebar - Glassmorphism Style */}
      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-64 border-r border-emerald-900/30 bg-[#0f1714]/60 backdrop-blur-2xl flex flex-col justify-between p-6 z-20"
      >
        <div>
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-12 cursor-pointer group">
            {/* The Rotating Leaf Icon */}
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Leaf className="text-emerald-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent tracking-wide">
              W2W
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            {navItems.map((item) => (
              <motion.li 
                key={item.name}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-3 rounded-xl cursor-pointer text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/40 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-3">
          <motion.button 
            whileHover={{ y: -3, boxShadow: "0px 10px 20px rgba(52, 211, 153, 0.2)" }}
            whileTap={{ y: 0 }}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-900 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all"
          >
            Register
          </motion.button>
          <motion.button 
            whileHover={{ y: -3 }}
            className="w-full py-3 rounded-xl flex justify-center items-center gap-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all backdrop-blur-md"
          >
            <LogIn size={18} /> Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content Canvas */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden z-10">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="p-10 relative z-10">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;