import { useState ,useRef} from 'react';
import { motion } from 'framer-motion';
import { User, Save, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuth, api } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

//Profile Pictures
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    profilePicture: user?.profilePicture || '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      let finalPayload = { ...formData };
      
      // We check if it exists first to prevent crashes on older accounts without a DP
      if (formData.profilePicture && formData.profilePicture.includes('ui-avatars.com') && 
         (formData.firstName !== user.firstName || formData.lastName !== user.lastName)) {
        finalPayload.profilePicture = `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=10b981&color=fff&rounded=true&bold=true`;
      }


      const response = await api.put('/users/profile', finalPayload);
      
      
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      navigate('/dashboard'); 
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you absolutely sure? This cannot be undone and you will lose all W2W coins.");
    if (isConfirmed) {
      try {
        await api.delete('/users/profile');
        toast.info("Account deleted. We're sad to see you go! 🌍");
        logout(); // Automatically wipes token and routes to login
      } catch (error) {
        toast.error("Failed to delete account.");
      }
    }
  };
const fileInputRef = useRef(null);
const handleFileUpload = async (e) => {
    const file = e.target.files;
    if (!file) return;

    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post('/users/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Tell Spring Boot a file is coming
      });
      
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      

      setFormData(prev => ({ ...prev, profilePicture: updatedUser.profilePicture }));
      toast.success("Profile picture updated perfectly! 📸");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto pb-12">
      
      {/* Header & Back Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mb-6 transition-colors font-medium text-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold text-white mb-2">Edit Profile</h1>
        <p className="text-slate-400">Update your personal details or manage your account status.</p>
      </motion.div>

      {/* --- UPDATE FORM --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-[#0f1714]/80 backdrop-blur-xl border border-emerald-900/50 p-8 rounded-3xl shadow-lg mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="text-emerald-500" size={24} /> Personal Information
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          
     
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[#0a0f0d]/50 rounded-2xl border border-emerald-900/30 mb-6">
            

            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/50 hover:border-emerald-400 flex items-center justify-center shrink-0 overflow-hidden bg-[#0f1714] cursor-pointer group relative transition-all"
            >
               {formData.profilePicture ? (
                 <img src={formData.profilePicture} alt="Preview" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
               ) : (
                 <User size={36} className="text-emerald-500 group-hover:opacity-50 transition-opacity" />
               )}
               

               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase bg-black/60 px-2 py-1 rounded">Upload</span>
               </div>
            </div>

            <div className="w-full text-center md:text-left">
              <h3 className="text-sm font-semibold text-slate-200 mb-1">Upload New Picture</h3>
              <p className="text-xs text-slate-400 mb-4">Click the circle to browse your local device. (Max size 5MB, JPG/PNG)</p>
              

              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden" 
              />
            </div>
          </div>
          {/* --------------------------------------- */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">First Name</label>
              <input 
                required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                className="w-full bg-[#0a0f0d] border border-emerald-900/40 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Last Name</label>
              <input 
                required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                className="w-full bg-[#0a0f0d] border border-emerald-900/40 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            * Note: If you leave the image URL unchanged, your profile picture will automatically regenerate with your initials if you change your name.
          </p>

          <div className="flex justify-end pt-4">
            <motion.button 
              whileHover={{ y: -2, boxShadow: "0 0 15px rgba(52,211,153,0.4)" }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="px-8 py-3.5 bg-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-400 transition-all"
            >
              <Save size={20} /> {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* --- DANGER ZONE --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl"
      >
        <h2 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle size={24} /> Danger Zone
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xl">
          Permanently delete your account and all associated data. This action cannot be undone. You will lose access to all pending pickups and your current W2W coin balance.
        </p>

        <motion.button 
          onClick={handleDelete}
          whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-red-500/10 border border-red-500/50 text-red-400 font-bold rounded-xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
        >
          <Trash2 size={18} /> Delete Account
        </motion.button>
      </motion.div>

    </div>
  );
};

export default EditProfile;