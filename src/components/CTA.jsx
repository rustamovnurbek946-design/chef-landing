import { Typography, Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative">
        
        {/* Dekorativ elementlar */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"
        />

        {/* Sarlavha - Animatsiya bilan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography 
            variant="h2" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            {t("readyToCook")}{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {t("startCookingNow").split(" ")[0]}
            </span>
          </Typography>
        </motion.div>

        {/* Qisqa tavsif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium">
            {t("ctaSubtitle")}
          </Typography>
        </motion.div>

        {/* Tugma - Animatsiya va hover effektlar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          className="flex justify-center"
        >
          <Link to="/recipes">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-8 md:px-12 py-4 rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 capitalize text-lg flex items-center gap-3"
              >
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                {t("startCookingNow")}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Statistika yoki qo'shimcha ma'lumot (ixtiyoriy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">1000+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('recipes')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">500+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('chefs')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">50k+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('happyUsers')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}