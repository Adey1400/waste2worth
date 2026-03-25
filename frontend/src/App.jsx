import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppLayout from './layouts/AppLayout';
import EarthLoader from './components/EarthLoader';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext';

// 1. IMPORT YOUR NEW PAGES HERE!
import Login from './pages/Login';
import Register from './pages/Register';

// We will leave the dashboards as placeholders until we build them next
const Dashboard = () => <div className="text-white p-10 h-[200vh]">Customer Dashboard</div>;
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
          theme="dark" 
          toastProps={{ style: { background: 'rgba(15, 23, 20, 0.9)', border: '1px solid rgba(52, 211, 153, 0.3)', backdropFilter: 'blur(10px)' } }} 
        />

        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* 2. Now these point to your actual component files */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loader" element={<EarthLoader />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/agent" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;