import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Coins, Mail, User, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your account and view your eco-rewards.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Details Card (Spans 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="md:col-span-2 bg-[#0f1714]/80 backdrop-blur-xl border border-emerald-900/50 p-8 rounded-3xl shadow-[0_0_30px_rgba(52,211,153,0.05)] flex flex-col md:flex-row items-center gap-8"
        >
          {/* Avatar Ring */}
          <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-[#0a0f0d] shrink-0 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse"></div>
            <User size={60} className="text-emerald-400 relative z-10" />
          </div>
          
          {/* Info */}
          <div className="space-y-4 text-center md:text-left w-full">
            <div>
              <h2 className="text-3xl font-bold text-white">{user?.firstName} {user?.lastName}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-wide">
                <ShieldCheck size={16} /> {user?.role}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400 bg-[#0a0f0d]/50 p-3 rounded-xl border border-emerald-900/30">
              <Mail size={18} className="text-emerald-500" />
              <span>{user?.email}</span>
            </div>
          </div>
        </motion.div>

        {/* Coins Balance Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-900/40 to-[#0f1714]/80 backdrop-blur-xl border border-emerald-500/30 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(52,211,153,0.15)] relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
          
          <Coins size={56} className="text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] relative z-10" />
          <h3 className="text-emerald-100 text-lg font-medium mb-1 relative z-10">W2W Balance</h3>
          <p className="text-6xl font-extrabold text-white relative z-10">{user?.coins || 0}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;