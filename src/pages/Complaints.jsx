import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Send, HelpCircle, MessageSquare, ShieldCheck, 
  ChevronDown, Paperclip, AlertCircle, Sparkles,
  Phone, Mail, Clock, MapPin, Search, LifeBuoy,
  Camera, Award, Users, Star, ChefHat, HeartHandshake
} from "lucide-react";
import Footer from "../components/Footer";

// --- Animatsiya variantlari ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Complaints = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "", email: "", category: "general", subject: "", description: "", priority: "medium"
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredFaq, setHoveredFaq] = useState(null);

  // Murakkab Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // --- Ma'lumotlar ---
  const categories = [
    { value: "general", label: t("general"), icon: <MessageSquare size={18} />, color: "blue" },
    { value: "technical", label: t("technicalProblem"), icon: <LifeBuoy size={18} />, color: "indigo" },
    { value: "recipe", label: t("recipeProblem"), icon: <Sparkles size={18} />, color: "orange" },
    { value: "content", label: t("wrongContent"), icon: <AlertCircle size={18} />, color: "red" },
  ];

  const faqItems = [
    { id: 1, question: t("faq.q1"), answer: t("faq.a1"), tags: [t("searchTags.search"), t("searchTags.recipes")] },
    { id: 2, question: t("faq.q2"), answer: t("faq.a2"), tags: [t("searchTags.moderation")] },
    { id: 3, question: t("faq.q3"), answer: t("faq.a3"), tags: [t("searchTags.security")] },
    { id: 4, question: t("faq.q4"), answer: t("faq.a4"), tags: [t("searchTags.payment"), t("searchTags.refund")] },
    { id: 5, question: t("faq.q5"), answer: t("faq.a5"), tags: [t("searchTags.features")] },
    { id: 6, question: t("faq.q6"), answer: t("faq.a6"), tags: [t("searchTags.account")] },
    { id: 7, question: t("faq.q7"), answer: t("faq.a7"), tags: [t("searchTags.business")] },
    { id: 8, question: t("faq.q8"), answer: t("faq.a8"), tags: [t("searchTags.offline")] },
    { id: 9, question: t("faq.q9"), answer: t("faq.a9"), tags: [t("searchTags.verification")] },
    { id: 10, question: t("faq.q10"), answer: t("faq.a10"), tags: [t("searchTags.content")] },
    { id: 11, question: t("faq.q11"), answer: t("faq.a11"), tags: [t("searchTags.mobile")] },
    { id: 12, question: t("faq.q12"), answer: t("faq.a12"), tags: [t("searchTags.community")] },
  ];

  const filteredFaqs = faqItems.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bottom stats data
  const statsData = [
    { icon: <Users size={28} />, value: "50K+", label: t("activeChefs"), color: "from-blue-500 to-cyan-500" },
    { icon: <HeartHandshake size={28} />, value: "99.9%", label: t("satisfiedClients"), color: "from-rose-500 to-pink-500" },
    { icon: <ChefHat size={28} />, value: "15K+", label: t("recipesInDatabase"), color: "from-orange-500 to-red-500" },
    { icon: <Star size={28} />, value: "4.8/5", label: t("averageRating"), color: "from-yellow-500 to-amber-500" },
  ];

  const testimonials = [
    { name: t("testimonials.name1"), text: t("testimonials.text1"), rating: 5, role: t("testimonials.role1") },
    { name: t("testimonials.name2"), text: t("testimonials.text2"), rating: 5, role: t("testimonials.role2") },
    { name: t("testimonials.name3"), text: t("testimonials.text3"), rating: 5, role: t("testimonials.role3") },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", category: "general", subject: "", description: "", priority: "medium" });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen selection:bg-orange-500/30">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 z-[100] origin-left" style={{ scaleX }} />

      {/* Background FX */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Content */}
      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <ShieldCheck className="text-orange-400" size={16} />
            <span className="text-sm font-medium text-slate-300">{t("supportCenter")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            {t("haveQuestions")} <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t("weCreateBest")}
          </motion.p>
        </div>

        {/* Dynamic Tabs Navigation */}
        <div className="max-w-fit mx-auto mb-20 p-2 bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] border border-white/10 flex gap-2">
          {[
            { id: "submit", label: t("leaveComplaint"), icon: <Send size={18} /> },
            { id: "faq", label: t("knowledgeBase"), icon: <HelpCircle size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-bold transition-all duration-500 ${
                activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-[1.5rem] shadow-[0_10px_30px_rgba(234,88,12,0.3)]" />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "submit" ? (
            <motion.section key="form-tab" initial="hidden" animate="visible" exit="hidden" variants={fadeInUp} className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
              
              {/* Form Side */}
              <div className="lg:col-span-7 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <form onSubmit={onFormSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{t("yourName")}</label>
                      <input 
                        type="text" required name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-600"
                        placeholder="Alexander Chef"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{t("email")}</label>
                      <input 
                        type="email" required name="email" value={formData.email} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-600"
                        placeholder="alex@chef.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{t("complaintCategory")}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.value} type="button"
                          onClick={() => setFormData({...formData, category: cat.value})}
                          className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                            formData.category === cat.value 
                            ? "bg-orange-500/10 border-orange-500 text-orange-400" 
                            : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20"
                          }`}
                        >
                          {cat.icon}
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{t("subject")}</label>
                    <input 
                      type="text" required name="subject" value={formData.subject} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{t("situationDescription")}</label>
                    <textarea 
                      required name="description" value={formData.description} onChange={handleInputChange} rows="6"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-all resize-none"
                      placeholder={t("tellUsDetails")}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(234, 88, 12, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl font-black text-lg uppercase tracking-[0.2em] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    {submitted ? t("sent") : t("sendRequest")}
                  </motion.button>
                </form>
              </div>

              {/* Info Side */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <h3 className="text-2xl font-bold mb-4">{t("haveQuestionsShort")}</h3>
                  <p className="text-indigo-100/80 mb-8 leading-relaxed">{t("weReadyAnswer")}</p>
                  <button 
                    onClick={() => setActiveTab('faq')}
                    className="flex items-center gap-3 px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                  >
                    <MessageSquare size={20} />
                    {t("openKnowledgeBase")}
                  </button>
                </div>

                <div className="p-8 bg-slate-900/50 border border-white/10 rounded-[2.5rem] space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">{t("directContacts")}</h4>
                  {[
                    { icon: <Mail />, title: "Email", val: "support@chefbook.com" },
                    { icon: <Phone />, title: "Telefon", val: "+998 71 200 00 00" },
                    { icon: <MapPin />, title: t("office"), val: "Tashkent, IT-Park" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="p-3 bg-white/5 rounded-lg group-hover:bg-orange-500 transition-colors">{item.icon}</div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.title}</p>
                        <p className="text-slate-200 font-medium">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section key="faq-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-12">
              
              {/* FAQ Search */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input 
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 py-6 text-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all backdrop-blur-xl"
                  placeholder={t("searchKnowledgeBase")}
                />
              </div>

              {/* FAQ Grid */}
              <div className="grid gap-6">
                {filteredFaqs.map((faq) => (
                  <motion.div 
                    key={faq.id} layout
                    onMouseEnter={() => setHoveredFaq(faq.id)}
                    onMouseLeave={() => setHoveredFaq(null)}
                    className="relative rounded-[2rem] border border-white/5 bg-slate-900/40 backdrop-blur-sm overflow-hidden hover:border-orange-500/50 transition-all duration-500"
                  >
                    <details className="group/details p-8">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <div className="flex items-center gap-6">
                          <span className="text-4xl font-black text-white/10 group-open:text-orange-500/20 transition-colors">
                            {faq.id < 10 ? `0${faq.id}` : faq.id}
                          </span>
                          <h3 className="text-xl font-bold text-slate-200 group-hover/details:text-white transition-colors">{faq.question}</h3>
                        </div>
                        <div className="p-2 bg-white/5 rounded-full group-open/details:rotate-180 transition-transform duration-500">
                          <ChevronDown size={24} />
                        </div>
                      </summary>
                      <div className="mt-8 pl-[4.5rem]">
                        <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mb-6">{faq.answer}</p>
                        <div className="flex gap-2">
                          {faq.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase rounded-md tracking-widest">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ============= STATS SECTION ============= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mt-32"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
              <Award size={16} />
              {t("ourAchievements")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {t("weInNumbers")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-orange-500/50 transition-all duration-500">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-400"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-slate-400 text-sm mt-2 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto mt-32"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              <HeartHandshake size={16} />
              {t("whatClientsSay")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {t("whatClientsSay")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-purple-500/50 transition-all duration-500 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + i * 0.1 }}
                    >
                      <Star className="fill-yellow-500 text-yellow-500" size={18} />
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Background Visuals */}
        <div className="max-w-7xl mx-auto mt-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Camera size={32} />, title: t("photoRecipes"), desc: t("uploadYourMasterpieces"), color: "from-pink-500 to-rose-500" },
              { icon: <Award size={32} />, title: t("becomeVerified"), desc: t("becomeVerified"), color: "from-yellow-500 to-amber-500" },
              { icon: <Users size={32} />, title: t("communityMessage"), desc: t("communityMessage"), color: "from-green-500 to-emerald-500" },
              { icon: <Sparkles size={32} />, title: t("aiRecipes"), desc: t("artificialIntelligence"), color: "from-purple-500 to-indigo-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative p-6 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-3 rounded-2xl bg-white/10 mb-4"
                  >
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                      {item.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-40 mb-20"
        >
          <div className="relative p-12 text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-white/20 rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-bda9f9f3b2a6?w=600')] bg-cover bg-center opacity-10" />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 w-20 h-20 bg-orange-500/30 rounded-full blur-3xl"
            />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("readyToStartCooking")}</h3>
            <p className="text-slate-300 mb-8">{t("joinChefBookToday")}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/recipes"}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl font-bold text-white shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              {t("startCookingBtn")}
            </motion.button>
          </div>
        </motion.div>

      </main>

      <Footer />

      <style jsx global>{`
        details > summary::-webkit-details-marker { display: none; }
        ::selection { color: white; background: #ea580c; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default Complaints;