import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const faqs = [
    {
      q: "How does the pickup scheduling work?",
      a: "Simply head to the 'My Pickups' tab, select your waste category (Dry, Wet, or E-Waste), estimate the weight, and pick a date. One of our verified agents will arrive at your door to collect and verify the waste."
    },
    {
      q: "How are W2W Coins calculated?",
      a: "Coins are calculated automatically by our system based on two factors: the category of the waste and its verified weight in kilograms. E-Waste typically yields the highest coin reward per kg due to its recycling value."
    },
    {
      q: "Where can I spend my W2W Coins?",
      a: "We are currently integrating with major e-commerce platforms like Amazon, Flipkart, and Swiggy. Very soon, you will be able to redeem your W2W balance directly for digital gift cards in the 'Rewards' tab."
    },
    {
      q: "What happens if an Agent rejects my pickup?",
      a: "If the waste does not match the description (e.g., highly contaminated wet waste mixed with dry waste), the agent may mark the pickup as rejected. You will receive a notification and can reschedule a properly segregated pickup."
    },
    {
      q: "Is there a minimum weight for a pickup?",
      a: "Currently, we request a minimum of 1kg for any scheduled pickup to ensure our logistics network remains eco-friendly and carbon-efficient."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 border-b border-emerald-900/30 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wide mb-4">
            <HelpCircle size={16} /> Support Center
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-lg">Everything you need to know about Waste2Worth.</p>
        </div>
        
        {/* Support Contact Box */}
        <div className="bg-[#0f1714]/80 border border-emerald-900/40 p-5 rounded-2xl flex items-center gap-4 shrink-0">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <MessageCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-0.5">Still have questions?</p>
            <p className="text-xs text-slate-400">support@waste2worth.com</p>
          </div>
        </div>
      </motion.div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-[#0f1714]/80 backdrop-blur-md border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.1)]' : 'border-emerald-900/30 hover:border-emerald-500/30'}`}
            >
              {/* Question (Clickable Header) */}
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {faq.q}
                </span>
                <div className={`ml-4 shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#0a0f0d] text-slate-500'}`}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              {/* Answer (Animated Expand/Collapse) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed border-t border-emerald-900/20 mx-6 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default FAQ;