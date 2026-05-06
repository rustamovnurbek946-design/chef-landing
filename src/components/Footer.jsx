import { Typography, IconButton } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { 
  HeartIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  GlobeAltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#", color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: "📷", href: "#", color: "hover:bg-[#E4405F]" },
    { name: "Twitter", icon: "🐦", href: "#", color: "hover:bg-[#1DA1F2]" },
    { name: "YouTube", icon: "▶️", href: "#", color: "hover:bg-[#FF0000]" },
    { name: "Telegram", icon: "📱", href: "#", color: "hover:bg-[#26A5E4]" },
  ];

  const footerLinks = {
    company: [
      { name: t("aboutUs"), href: "/about" },
      { name: t("careers"), href: "/careers" },
      { name: t("blog"), href: "/blog" },
      { name: t("press"), href: "/press" },
    ],
    resources: [
      { name: t("helpCenter"), href: "/help" },
      { name: t("contactSupport"), href: "/contact" },
      { name: t("community"), href: "/community" },
      { name: t("faq"), href: "/faq" },
    ],
    legal: [
      { name: t("privacyPolicy"), href: "/privacy" },
      { name: t("termsOfService"), href: "/terms" },
      { name: t("cookiePolicy"), href: "/cookies" },
      { name: t("accessibility"), href: "/accessibility" },
    ],
  };

  const contactInfo = [
    { icon: EnvelopeIcon, text: "support@chef-book.com", link: "mailto:support@chef-book.com" },
    { icon: PhoneIcon, text: "+998 (71) 123-45-67", link: "tel:+998711234567" },
    { icon: MapPinIcon, text: t("address"), link: "#" },
    { icon: ClockIcon, text: t("workingHours"), link: "#" },
  ];

  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      <footer className="relative  from-gray-950 via-gray-900 to-gray-950 text-white pt-20 pb-8 mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="h-6 w-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Footer Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-black">👨‍🍳</span>
                </motion.div>
                <Typography variant="h3" className="font-black text-3xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Chef<span className="text-red-500">Book</span>
                </Typography>
              </div>
              
              <Typography className="text-gray-400 leading-relaxed max-w-md">
                {t("footerDesc")}
              </Typography>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl transition-all duration-300 ${social.color} hover:scale-110 hover:text-white hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <Typography className="font-bold text-lg mb-4 text-gray-400 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-red-500 rounded-full"></span>
                  {t("company")}
                </Typography>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography className="font-bold text-lg mb-4 text-gray-400 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-red-500 rounded-full"></span>
                  {t("resources")}
                </Typography>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography className="font-bold text-lg mb-4 text-gray-400 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-red-500 rounded-full"></span>
                  {t("legal")}
                </Typography>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Info Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="border-t border-white/10 pt-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-center gap-3 group hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                    <info.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-400 group-hover:text-white transition-colors">
                      {info.text}
                    </Typography>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="border-t border-white/10 pt-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <Typography className="text-sm text-gray-500 text-center lg:text-left">
                © {currentYear} ChefBook. {t("allRightsReserved")}
              </Typography>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                  <ShieldCheckIcon className="h-4 w-4" />
                  {t("privacyPolicy")}
                </a>
                <a href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                  <DocumentTextIcon className="h-4 w-4" />
                  {t("termsOfService")}
                </a>
                <a href="/cookies" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                  <GlobeAltIcon className="h-4 w-4" />
                  {t("cookies")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Made with love */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 pt-8 border-t border-white/5"
          >
            <Typography className="text-xs text-gray-600 flex items-center justify-center gap-1">
              {t("madeWith")}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <HeartIcon className="h-3 w-3 text-red-500" />
              </motion.span>
              {t("byChefBook")}
            </Typography>
          </motion.div>
        </div>
      </footer>
    </>
  );
}