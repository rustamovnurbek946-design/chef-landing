import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Animatsiya konteyneri variantlari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Elementlarning pastdan chiqish varianti
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

// Sarlavha so'zlari uchun variant
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef(null);

  // Scroll orqali parallax effekti uchun
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Sarlavhani so'zlarga bo'lish
  const welcomeText = t("welcomeHero");
  const words = welcomeText.split(" ");

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden  transition-colors duration-500">
      {/* 1. Background */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600"
          alt="Background Cuisine"
          className="w-full h-full object-cover scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95 dark:from-gray-950/90 dark:via-gray-950/70 dark:to-gray-950/95 transition-colors duration-500" />
      </motion.div>

      <div className="container mx-auto px-4 z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Chap tomon - Content */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Kichik chiziqcha va matn */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-red-600"></span>
              <Typography
                variant="small"
                className="text-red-700 dark:text-red-400 font-bold uppercase tracking-[0.25em] text-xs md:text-sm"
              >
                {t("artOfCooking")}
              </Typography>
            </motion.div>

            {/* Sarlavha */}
            <Typography
              variant="h1"
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-gray-950 dark:text-white mb-8 leading-[1.05] tracking-tighter max-w-3xl flex flex-wrap justify-center lg:justify-start gap-x-4"
            >
              {words.map((word, index) => (
                <span key={index} className="relative overflow-hidden inline-block pb-2">
                  <motion.span
                    variants={letterVariants}
                    className={`inline-block ${index === 1 ? "text-red-600 dark:text-red-500" : ""}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </Typography>

            {/* Tavsif matni */}
            <motion.div variants={itemVariants} className="max-w-xl">
              <Typography
                variant="paragraph"
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 font-light leading-relaxed opacity-90"
              >
                {t("heroDescription")}
              </Typography>
            </motion.div>

            {/* Knopkalar guruhi */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full sm:w-auto"
            >
              <Link
                to="/recipes"
                className="group inline-flex items-center justify-center gap-3 bg-gray-950 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-black dark:text-gray-950 hover:text-white font-bold px-10 py-4 rounded-full shadow-2xl shadow-gray-300 dark:shadow-gray-800 transition-all duration-300 hover:-translate-y-1.5 active:scale-95 text-base md:text-lg"
              >
                {t("startCooking")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </Link>
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 text-base md:text-lg"
              >
                {t("ourStory")}
              </Link>
            </motion.div>
          </motion.div>

          {/* O'ng tomon - Glass Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Orqa fondagi yorug'lik effekti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-200 dark:bg-red-900/30 rounded-full blur-[120px] opacity-40" />

            {/* Karta */}
            <div className="relative group w-full max-w-md lg:max-w-none">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-5 rounded-[3rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/50 transition-all duration-500 group-hover:shadow-[0_50px_120px_-20px_rgba(220,38,38,0.15)] group-hover:-translate-y-2">

                {/* Rasm konteyneri */}
                <div className="overflow-hidden rounded-[2.5rem] relative aspect-[5/4]">
                  <img
                    src="https://thatspicychick.com/wp-content/uploads/2019/02/Spicy-Chicken-Penne-Pasta-7_PS.jpg"
                    alt="Spicy Chicken Pasta"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* LIVE belgisi */}
                  <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    {t("trending")}
                  </div>
                </div>

                {/* Karta matni */}
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex text-yellow-500 text-lg">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">(4.9 {t('rating')})</span>
                  </div>

                  <Typography variant="h3" className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-white mb-5 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    {t("spicyChickenPasta")}
                  </Typography>

                  <div className="flex items-center gap-8 mb-8 py-5 border-y border-gray-100/50 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                    <span className="flex items-center gap-2.5 text-base md:text-lg">
                      <span className="text-2xl">⏱</span> 25 {t("min")}
                    </span>
                    <span className="flex items-center gap-2.5 text-base md:text-lg">
                      <span className="text-2xl">🔥</span> {t("easy")}
                    </span>
                    <span className="flex items-center gap-2.5 text-base md:text-lg">
                      <span className="text-2xl">🌶️</span> {t("spicy")}
                    </span>
                  </div>

                  <Link
                    to="/recipes"
                    className="flex items-center justify-center w-full bg-gray-950 dark:bg-white group-hover:bg-red-600 dark:group-hover:bg-red-600 text-white dark:text-gray-950 group-hover:text-white font-bold py-5 rounded-2xl transition-all duration-300 gap-3 text-base md:text-lg"
                  >
                    {t("cookNow")}
                    <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* Qo'shimcha suzuvchi badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-10 bg-white dark:bg-gray-800 p-5 shadow-2xl rounded-3xl flex items-center gap-4 border border-gray-50 dark:border-gray-700 z-20"
              >
                <div className="w-14 h-14 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-3xl">
                  👨‍🍳
                </div>
                <div>
                  <p className="text-xs text-red-600 dark:text-red-400 font-bold leading-none mb-1.5 tracking-wider">{t("chefPick")}</p>
                  <p className="text-base font-extrabold text-gray-950 dark:text-white">{t("guaranteedDelicious")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}