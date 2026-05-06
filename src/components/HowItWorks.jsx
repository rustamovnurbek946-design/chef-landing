import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const STEPS = [
  {
    id: "01",
    icon: "🔍",
    titleKey: "chooseRecipe",
    descKey: "chooseRecipeDesc",
    gradient: "from-orange-100 to-orange-50",
  },
  {
    id: "02",
    icon: "🛒",
    titleKey: "gatherIngredients",
    descKey: "gatherIngredientsDesc",
    gradient: "from-red-100 to-red-50",
  },
  {
    id: "03",
    icon: "👨‍🍳",
    titleKey: "startCooking2",
    descKey: "startCookingDesc",
    gradient: "from-green-100 to-green-50",
  },
];

// Animatsiya variantlari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-[#FBFBFF] dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-50 dark:bg-red-900/20 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Sarlavha qismi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <Typography className="text-red-600 dark:text-red-400 font-black uppercase tracking-[0.4em] text-xs mb-4">
            {t("simpleSteps")}
          </Typography>
          <Typography variant="h2" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("howItWorks")}
          </Typography>
          <div className="h-1.5 w-20 bg-red-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Qadamlar Grid-i */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 relative"
        >
          {/* Bog'lovchi chiziq */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent -z-10" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Raqamli Bubble */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center z-20 border border-gray-50 dark:border-gray-700 group-hover:scale-110 group-hover:border-red-100 dark:group-hover:border-red-800 transition-all duration-500">
                <span className="text-2xl font-black bg-gradient-to-br from-red-600 to-red-400 bg-clip-text text-transparent">
                  {step.id}
                </span>
              </div>

              {/* Karta */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-12 pt-16 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white dark:border-gray-700 hover:border-red-100 dark:hover:border-red-800 transition-all duration-500 text-center relative overflow-hidden group-hover:-translate-y-4">

                {/* Kartaning ichidagi gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${step.gradient}`} />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl mb-8 filter drop-shadow-lg inline-block"
                >
                  {step.icon}
                </motion.div>

                {/* Sarlavha va Matn */}
                <Typography variant="h5" className="text-2xl font-black text-gray-900 dark:text-white mb-5 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {t(step.titleKey)}
                </Typography>
                <Typography className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-medium opacity-80">
                  {t(step.descKey)}
                </Typography>

                {/* Pastki bezak chiziqcha */}
                <div className="mt-8 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <div className="w-8 h-1.5 rounded-full bg-red-600" />
                </div>
              </div>

              {/* Strelka (Navbatdagi qadam uchun) */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-gray-300 dark:text-gray-600 text-4xl font-light"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Pastki Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <Link
            to="/recipes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-gray-900 hover:text-white rounded-full font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            {t("startExploring")}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}