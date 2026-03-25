import { motion } from 'framer-motion';
import { Leaf, Mail, MapPin } from 'lucide-react'; 
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
  { icon: <FiTwitter size={20} />, href: "#" },
    { icon: <FiFacebook size={20} />, href: "#" },
    { icon: <FiInstagram size={20} />, href: "#" },
    { icon: <FiLinkedin size={20} />, href: "#" },
  ];

  return (
    <footer className="relative bg-[#050806] border-t border-emerald-900/30 pt-16 pb-8 overflow-hidden z-10">
      {/* Subtle Background Glow for the Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-emerald-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={28} />
              <span className="text-2xl font-bold tracking-widest text-white">W2W</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Empowering communities to turn daily waste into digital wealth. Smart, sustainable, and rewarding.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1, color: "#34d399" }}
                  className="w-10 h-10 rounded-full bg-[#0a0f0d] border border-emerald-900/50 flex items-center justify-center text-slate-400 transition-colors hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'How it Works', 'Rewards Catalog', 'Partner with Us'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sustainability Report'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <Mail className="text-emerald-500 mt-1 shrink-0" size={18} />
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">hello@waste2worth.com</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="text-emerald-500 mt-1 shrink-0" size={18} />
                <span>123 Eco Valley Tech Park,<br />Green City, Earth 40400</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-emerald-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Waste2Worth. All rights reserved.</p>
          <p>Designed with <span className="text-emerald-500 animate-pulse">💚</span> for the planet.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;