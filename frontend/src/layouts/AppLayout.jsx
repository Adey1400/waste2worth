import { motion } from "framer-motion";
import {
  Home,
  Trash2,
  ShieldCheck,
  HelpCircle,
  LogOut,
  User,
  Leaf,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/background.jpeg";
// 1. Added useLocation import here
import { Link, useLocation } from "react-router-dom"; 

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // 2. Added paths to Rewards and FAQ so the Link components don't crash
  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'My Pickups', icon: <Trash2 size={20} />, path: '/pickups' },
    { name: "Rewards", icon: <ShieldCheck size={20} />, path: '/rewards' }, 
    { name: "FAQ", icon: <HelpCircle size={20} />, path: '/faq' }, 
  ];

  return (
    <div
      className="flex h-screen text-slate-200 overflow-hidden font-sans relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0a0f0d]/85 backdrop-blur-[2px] z-0"></div>

      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-64 border-r border-emerald-900/30 bg-[#0f1714]/60 backdrop-blur-2xl flex flex-col justify-between p-6 z-20"
      >
        <div>
          {/* 3. Cleaned up the nested logo wrappers */}
          <Link
            to="/"
            className="flex items-center gap-3 mb-12 cursor-pointer group w-fit"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf
                className="text-emerald-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                size={32}
              />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent tracking-wide">
              W2W
            </h1>
          </Link>

          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link to={item.path} key={item.name} className="block">
                  <motion.li 
                    whileHover={{ x: 10, scale: 1.02 }}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors mt-2 ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]' 
                        : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/40 border border-transparent'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </div>

        {/* --- USER PROFILE & LOGOUT SECTION --- */}
     
        <div className="space-y-4">
          {user && (
            <div className="p-4 rounded-xl bg-[#0a0f0d]/50 border border-emerald-900/30 flex items-center gap-3">
           
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 overflow-hidden border border-emerald-500/30">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-emerald-400 uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
            </div>
          )}

          <motion.button
            onClick={logout}
            whileHover={{ y: -2 }}
            className="w-full py-3 rounded-xl flex justify-center items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all backdrop-blur-md"
          >
            <LogOut size={18} /> Logout
          </motion.button>
        </div>
      </motion.nav>

      <main className="flex-1 relative overflow-y-auto overflow-x-hidden z-10 custom-scrollbar">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="p-10 relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;