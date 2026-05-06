import instance from "../utils/axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, IconButton, Button, Chip, Spinner } from "@material-tailwind/react";
import {
  XMarkIcon,
  ClockIcon,
  UserCircleIcon,
  ChevronRightIcon,
  QueueListIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Recipes() {
  const { t } = useTranslation();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Query orqali backenddan ma'lumot olish
  const { data: recipes, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await instance.get("/recipes");
      return res.data;
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRecipe(null), 300);
  };

  if (isLoading) return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Spinner className="h-12 w-12 text-red-500" />
    </div>
  );

  if (isError) return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">{t('errorLoadingRecipes')}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-gray-950 py-16 px-4 md:px-10 transition-colors duration-500">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <Typography className="text-red-500 font-black uppercase tracking-[0.3em] text-xs mb-3">
            {t('ourCollection')}
          </Typography>
          <Typography variant="h1" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            {t('specialRecipes')} <span className="text-red-500 italic">{t('recipes')}</span>
          </Typography>
          <div className="w-20 h-1.5 bg-red-500 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {recipes?.map((recipe) => (
            <motion.div
              key={recipe._id}
              layoutId={`card-${recipe._id}`}
              onClick={() => { setSelectedRecipe(recipe); setIsModalOpen(true); }}
              whileHover={{ y: -10 }}
              className="cursor-pointer group relative bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={recipe.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-bold flex items-center gap-2">
                    {t('view')} <ChevronRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <Typography variant="h5" className="font-black text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-red-500 transition-colors">
                  {recipe.title}
                </Typography>
                <Typography className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">
                  {recipe.description || t('noDescription')}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to="/all-recipes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-gray-900 hover:text-white rounded-full font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            {t('viewAllRecipes')}
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* PREMIUM DETAIL MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedRecipe && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            />

            <motion.div
              layoutId={`card-${selectedRecipe._id}`}
              className="bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={selectedRecipe.imageUrl}
                  className="w-full h-full object-cover"
                  alt={selectedRecipe.title}
                />
                <div className="absolute top-6 left-6">
                  <Chip value={t('recipe')} className="bg-white/20 backdrop-blur-md rounded-full text-white font-black" />
                </div>
                <IconButton
                  variant="text"
                  onClick={closeModal}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white md:hidden"
                >
                  <XMarkIcon className="h-6 w-6" />
                </IconButton>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-[#FAFAFA] dark:bg-gray-800">
                {/* Fixed Header */}
                <div className="p-8 pb-4 flex justify-between items-start">
                  <div className="flex-1">
                    <Typography variant="h2" className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                      {selectedRecipe.title}
                    </Typography>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <UserCircleIcon className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{t('byChef')}</span>
                    </div>
                  </div>
                  <IconButton
                    variant="text"
                    onClick={closeModal}
                    className="hidden md:flex bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                  </IconButton>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 pt-2 overflow-y-auto custom-scrollbar flex-1">
                  <Typography className="text-gray-600 dark:text-gray-300 text-base leading-loose mb-8 font-medium">
                    {selectedRecipe.description}
                  </Typography>

                  {/* Ingredients Section */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-xl">
                        <QueueListIcon className="h-6 w-6 text-red-500" />
                      </div>
                      <Typography variant="h5" className="font-black text-gray-900 dark:text-white tracking-tight">
                        {t('ingredients')}
                      </Typography>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {Array.isArray(selectedRecipe.ingredients) && selectedRecipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-hover hover:border-red-200 dark:hover:border-red-800">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                        <SparklesIcon className="h-6 w-6 text-orange-500" />
                      </div>
                      <Typography variant="h5" className="font-black text-gray-900 dark:text-white tracking-tight">
                        {t('instructions')}
                      </Typography>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm leading-relaxed text-gray-700 dark:text-gray-300 font-medium whitespace-pre-line">
                      {selectedRecipe.instructions}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4B5563; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6B7280; }
      `}</style>
    </div>
  );
}