import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();


export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role, ...userData } = response.data;


      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ role, ...userData }));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ role, ...userData });

      toast.success(`Welcome back, ${userData.firstName}!`);
      

      if (role === 'AGENT') navigate('/agent');
      else navigate('/dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  const register = async (userData) => {
    try {

      const response = await api.post('/auth/register', userData);
      const { token, role, ...newUserData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ role, ...newUserData }));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ role, ...newUserData });

      toast.success("Registration successful! 🌍");
      
      if (role === 'AGENT') navigate('/agent');
      else navigate('/dashboard');

    } catch (error) {
      toast.error("Registration failed. Email might be taken.");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info("Logged out safely.");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);