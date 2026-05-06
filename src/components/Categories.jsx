import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: 1,
    name: "breakfast",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500",
  },
  {
    id: 2,
    name: "lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    id: 3,
    name: "dinner",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfiHezXeBnqO642pY_ghBgMLJXuACqtBX-A&s",
  },
  {
    id: 4,
    name: "desserts",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500",
  },
];

// Animatsiya variantlari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export default function Categories() {
  const { t } = useTranslation();

  return (
    <section className="py-24  overflow-hidden text-[#1d1d1f] dark:text-white transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        {/* Sarlavha - Apple Style Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Typography className="text-4xl md:text-5xl font-semibold tracking-tight dark:text-white">
            {t("exploreCategories")}
          </Typography>
          <Typography className="mt-4 text-xl text-gray-500 dark:text-gray-400 font-normal">
            {t("categoriesSubtitle")}
          </Typography>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
            >
              <div className="relative h-[400px] w-full rounded-[32px] overflow-hidden bg-white dark:bg-gray-800 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
                
                {/* Rasm - Parallax effekt bilan */}
                <img
                  src={category.image}
                  alt={t(category.name)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay - Apple Style Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Kontent rasm ustida */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Typography className="text-white text-2xl font-semibold mb-1">
                      {t(category.name)}
                    </Typography>
                    
                    <Link to={`/recipes?category=${category.name}`}>
                      <div className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {t('viewAll')}
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}