import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Scale, Calendar, Droplets, Package, Cpu, Clock, CheckCircle2, Leaf } from 'lucide-react';
import { api } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Pickups = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    wasteType: 'DRY',
    weight: '',
    address: '',
    pickupDate: '' 
  });

  const wasteCategories = [
    { id: 'DRY', label: 'Dry Waste', desc: 'Paper, Plastic, Glass', icon: <Package size={24} />, activeColor: 'border-blue-500 bg-blue-500/20 text-blue-400', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
    { id: 'WET', label: 'Wet Waste', desc: 'Food, Organic', icon: <Droplets size={24} />, activeColor: 'border-emerald-500 bg-emerald-500/20 text-emerald-400', shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]' },
    { id: 'E_WASTE', label: 'E-Waste', desc: 'Electronics, Batteries', icon: <Cpu size={24} />, activeColor: 'border-purple-500 bg-purple-500/20 text-purple-400', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' }
  ];

  useEffect(() => {
    fetchMyPickups();
  }, []);

  const fetchMyPickups = async () => {
    try {
      const response = await api.get('/pickups'); 
      setPickups(response.data);
    } catch (error) {
      console.error("Could not fetch pickups", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      await api.post('/pickups', formData);
      toast.success("Pickup scheduled successfully! 🌍");
      
      setFormData({ wasteType: 'DRY', weight: '', address: '', pickupDate: '' });
      fetchMyPickups();
    } catch (error) {
      toast.error("Failed to schedule pickup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Max-width container, centrally aligned, vertical flex layout
    <div className="max-w-5xl mx-auto flex flex-col gap-16 pb-12">
      
      {/* --- TOP SECTION: SCHEDULE FORM --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-white mb-2">Schedule Collection</h2>
          <p className="text-slate-400 text-lg">Segregate your waste and book a pickup.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0f1714]/80 backdrop-blur-2xl border border-emerald-900/50 p-8 md:p-10 rounded-[2rem] shadow-[0_0_40px_rgba(52,211,153,0.05)]">
          
          {/* Internal Grid: Left side categories, Right side details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Step 1: Segregation Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">1</span> 
                Select Waste Type
              </label>
              <div className="flex flex-col gap-4">
                {wasteCategories.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => setFormData({...formData, wasteType: cat.id})}
                    className={`cursor-pointer border rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 ${
                      formData.wasteType === cat.id 
                        ? `${cat.activeColor} ${cat.shadow}` 
                        : 'border-emerald-900/40 bg-[#0a0f0d] text-slate-500 hover:border-emerald-500/30 hover:bg-emerald-900/10'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-black/20">{cat.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{cat.label}</h4>
                      <p className="text-xs opacity-70">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Details */}
            <div className="flex flex-col justify-between">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span> 
                  Collection Details
                </label>
                <div className="space-y-5">
                  <div className="relative group">
                    <Scale className="absolute left-4 top-3.5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" size={22} />
                    <input required type="number" min="1" placeholder="Estimated Weight (in kg)" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full bg-[#0a0f0d]/50 border border-emerald-900/40 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  
              <div className="relative group">
                 <Calendar className="absolute left-4 top-3.5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" size={22} />
                 {/* CHANGED type to "date" */}
                 <input required type="date" value={formData.pickupDate} onChange={(e) => setFormData({...formData, pickupDate: e.target.value})} className="w-full bg-[#0a0f0d]/50 border border-emerald-900/40 text-slate-300 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors css-calendar-icon-fix" />
               </div>

                  <div className="relative group">
                    <MapPin className="absolute left-4 top-3.5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" size={22} />
                    <textarea required placeholder="Full Pickup Address" rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-[#0a0f0d]/50 border border-emerald-900/40 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors resize-none"></textarea>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ y: -2, boxShadow: "0 0 20px rgba(52,211,153,0.3)" }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={loading}
                className="w-full py-4 mt-8 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-900 font-extrabold rounded-xl text-lg hover:from-emerald-400 hover:to-teal-300 transition-all flex justify-center items-center gap-2"
              >
                {loading ? "Scheduling..." : "Confirm Pickup"} <CheckCircle2 size={20} />
              </motion.button>
            </div>

          </div>
        </form>
      </motion.div>

      {/* --- BOTTOM SECTION: ACTIVE REQUESTS (Grid Layout) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-between items-end mb-6 border-b border-emerald-900/30 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-1">Active Requests</h2>
            <p className="text-slate-400">Track your pending pickups.</p>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-2">
            <Clock size={16} /> {pickups.length} Pending
          </div>
        </div>

        {pickups.length === 0 ? (
          <div className="bg-[#0f1714]/40 border border-dashed border-emerald-900/50 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
            <Leaf size={56} className="text-emerald-500/30 mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No Active Pickups</h3>
            <p className="text-slate-500 max-w-md text-lg">You are all caught up! Book a new pickup above to start earning W2W coins.</p>
          </div>
        ) : (
          /* Swapped to a responsive grid for the cards! */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pickups.map((pickup, index) => (
              <motion.div 
                key={pickup.id || index}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#0f1714]/80 backdrop-blur-md border border-emerald-900/40 p-6 rounded-2xl flex flex-col gap-4 shadow-lg relative overflow-hidden group"
              >
                {/* Status Glow Bar at the Top instead of Side */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${pickup.status === 'COMPLETED' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]'}`}></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#0a0f0d] border border-emerald-900/50 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                      {pickup.wasteType === 'DRY' ? <Package size={22} /> : pickup.wasteType === 'WET' ? <Droplets size={22} /> : <Cpu size={22} />}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{pickup.wasteType || 'GENERAL'}</h3>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold tracking-widest ${pickup.status === 'COMPLETED' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                    {pickup.status || 'PENDING'}
                  </span>
                </div>

                <div className="bg-[#0a0f0d]/50 rounded-xl p-4 border border-emerald-900/30 flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Weight</span>
                    <span className="flex items-center gap-1.5 text-slate-200 font-semibold"><Scale size={16} className="text-emerald-500" /> {pickup.weight || '0'} kg</span>
                  </div>
                  <div className="w-[1px] h-8 bg-emerald-900/40"></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date</span>
                    <span className="flex items-center gap-1.5 text-slate-200 font-semibold"><Calendar size={16} className="text-emerald-500" /> {pickup.pickupDate ? new Date(pickup.pickupDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Pickups;