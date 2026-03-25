import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/background.jpeg'; 

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the email and password to our AuthContext
    login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans">
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0f0d]/90 backdrop-blur-sm"></div>
      </div>

      {/* Glassmorphism Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-[#0f1714]/80 backdrop-blur-2xl border border-emerald-900/50 rounded-3xl shadow-[0_0_40px_rgba(52,211,153,0.1)]"
      >
        <div className="flex justify-center mb-6">
          <Leaf className="text-emerald-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8">Access your Waste2Worth dashboard</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full bg-[#0a0f0d] border border-emerald-900/30 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input 
              required 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full bg-[#0a0f0d] border border-emerald-900/30 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" 
            />
          </div>

          <div className="flex justify-end">
            <Link to="#" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <motion.button 
            whileHover={{ y: -2, boxShadow: "0 0 20px rgba(52,211,153,0.3)" }} 
            whileTap={{ scale: 0.98 }} 
            type="submit" 
            className="w-full py-3.5 mt-2 bg-emerald-500 text-slate-900 font-bold rounded-xl text-lg hover:bg-emerald-400 transition-all"
          >
            Log In
          </motion.button>
        </form>

        <p className="text-slate-400 text-center mt-8">
          Don't have an account? <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;