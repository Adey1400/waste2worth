import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppLayout from './layouts/AppLayout';
import EarthLoader from './components/EarthLoader';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext';


import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pickups from './pages/Pickup';
import FAQ from './pages/FAQ';
import Rewards from './pages/Rewards';
const AgentDashboard = () => <div className="text-white p-10">Agent Dashboard</div>;

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
       <ToastContainer 
          position="top-right" 
          autoClose={4000}
          theme="dark" 
          toastClassName="!bg-[#0f1714]/80 !backdrop-blur-2xl !border !border-emerald-500/30 !rounded-2xl !shadow-[0_0_30px_rgba(52,211,153,0.2)] !font-sans mt-4"
          bodyClassName="!text-slate-200 !font-medium !text-sm !tracking-wide"
          progressClassName="!bg-gradient-to-r !from-emerald-400 !to-teal-300"
        />

        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* 2. Now these point to your actual component files */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loader" element={<EarthLoader />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/agent" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
          <Route path="/pickups" element={<ProtectedRoute><Pickups /></ProtectedRoute>} />
          
        <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} /> 
<Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} /> {/* <-- ADDED */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;