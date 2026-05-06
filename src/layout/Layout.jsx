import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  GlobeAltIcon,
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  SparklesIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
];

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const navItems = [
    { path: "/", label: t("home"), icon: HomeIcon, color: "from-blue-500 to-cyan-500" },
    { path: "/recipes", label: t("Recipes"), icon: BookOpenIcon, color: "from-green-500 to-emerald-500" },
    { path: "/complaints", label: t("complaints"), icon: ChatBubbleLeftRightIcon, color: "from-red-500 to-orange-500" },
    { path: "/chefsecrets", label: t("chefsecrets"), icon: SparklesIcon, color: "from-purple-500 to-pink-500" },
    { path: "/settings", label: t("settings"), icon: Cog6ToothIcon, color: "from-indigo-500 to-blue-500" },
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-1">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <motion.li
            key={item.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="list-none"
          >
            <Link
              to={item.path}
              onClick={() => setOpenNav(false)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-xl
                transition-all duration-300 ease-out font-medium
                hover:shadow-lg hover:-translate-y-0.5
                ${isActive 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-md` 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  // Theme options
  const themeOptions = [
    { mode: "light", icon: SunIcon, label: "Light", color: "from-yellow-400 to-orange-500" },
    { mode: "dark", icon: MoonIcon, label: "Dark", color: "from-indigo-500 to-purple-500" },
    { mode: "system", icon: ComputerDesktopIcon, label: "System", color: "from-gray-500 to-gray-700" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <Navbar 
        className={`
          sticky top-0 z-50 h-max max-w-full rounded-none border-none
          px-4 py-2 lg:px-8 lg:py-3
          transition-all duration-500 ease-in-out
          ${scrolled 
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl" 
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          }
        `}
      >
        <div className="flex items-center justify-between text-blue-gray-900 dark:text-white">
          <Link to="/" className="mr-4 cursor-pointer py-1.5 group">
            <div className="flex items-center gap-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
              </motion.div>
              <Typography 
                variant="h4" 
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold"
              >
                Chef-Book
              </Typography>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <div className="mr-2">{navList}</div>
            
            {/* Dark Mode Toggle Button */}
            <Menu>
              <MenuHandler>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  {darkMode ? (
                    <MoonIcon className="h-5 w-5 text-indigo-400" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-orange-500" />
                  )}
                </motion.button>
              </MenuHandler>
              <MenuList className="dark:bg-gray-800 dark:border-gray-700 min-w-[160px]">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <MenuItem 
                      key={option.mode} 
                      onClick={() => {
                        if (option.mode === "light") setDarkMode(false);
                        else if (option.mode === "dark") setDarkMode(true);
                        else if (option.mode === "system") {
                          const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                          setDarkMode(systemDark);
                        }
                      }}
                      className="flex items-center gap-3 dark:text-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-700"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            {/* Language Menu */}
            <Menu>
              <MenuHandler>
                <Button 
                  variant="outlined" 
                  className="flex items-center gap-2 rounded-full px-4 py-2 border-2 transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: "var(--primary)", 
                    color: "var(--primary)",
                  }}
                >
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="font-medium hidden sm:inline">{currentLanguage.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </MenuHandler>
              <MenuList className="dark:bg-gray-800 dark:border-gray-700">
                {languages.map((lang) => (
                  <MenuItem 
                    key={lang.code} 
                    onClick={() => changeLanguage(lang.code)} 
                    className="flex items-center gap-3 dark:text-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-700 transition-all"
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {i18n.language === lang.code && (
                      <span className="ml-auto text-green-500">✓</span>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <MoonIcon className="h-5 w-5 text-indigo-400" />
              ) : (
                <SunIcon className="h-5 w-5 text-orange-500" />
              )}
            </motion.button>
            
            <IconButton variant="text" onClick={() => setOpenNav(!openNav)}>
              {openNav ? 
                <XMarkIcon className="h-6 w-6 text-orange-500" /> : 
                <Bars3Icon className="h-6 w-6 text-orange-500" />
              }
            </IconButton>
          </div>
        </div>

        <AnimatePresence>
          {openNav && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden"
            >
              <div className="py-4">{navList}</div>
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Typography className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Language
                </Typography>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setOpenNav(false);
                      }}
                      className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-all
                        ${i18n.language === lang.code 
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Navbar>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 relative z-10"
      >
        {children}
      </motion.main>

      <style jsx global>{`
        :root {
          --primary: #ff6b35;
          --primary-light: #ff8c5a;
          --primary-dark: #e55a2b;
        }
        
        * {
          transition-property: background-color, border-color, color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ff6b35, #e55a2b);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e55a2b, #ff6b35);
        }
        
        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        /* Smooth transitions */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        
        .page-transition-exit {
          opacity: 1;
          transform: translateY(0);
        }
        
        .page-transition-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 300ms, transform 300ms;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        /* Glass morphism effect for cards */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}