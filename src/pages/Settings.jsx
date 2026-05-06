import React, { useEffect, useState } from "react";
import { Card, Typography, Switch, Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [showShortcutHint, setShowShortcutHint] = useState(true);
  const [lastShortcut, setLastShortcut] = useState(null);
  
  // Yangi state'lar
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [animationSpeed, setAnimationSpeed] = useState('normal'); // slow, normal, fast

  useEffect(() => {
    // Check current state from HTML class
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    
    // Load shortcuts preference
    const savedShortcuts = localStorage.getItem("shortcutsEnabled");
    if (savedShortcuts !== null) {
      setShortcutsEnabled(savedShortcuts === "true");
    }
    
    // Load font size preference
    const savedFontSize = localStorage.getItem("fontSize") || "medium";
    setFontSize(savedFontSize);
    applyFontSize(savedFontSize);
    
    // Load animation speed preference
    const savedSpeed = localStorage.getItem("animationSpeed") || "normal";
    setAnimationSpeed(savedSpeed);
    
    // Shortcut hint ni 3 sekunddan keyin yashirish
    const timer = setTimeout(() => setShowShortcutHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Font size apply function
  const applyFontSize = (size) => {
    const root = document.documentElement;
    if (size === 'small') {
      root.style.fontSize = '14px';
    } else if (size === 'medium') {
      root.style.fontSize = '16px';
    } else if (size === 'large') {
      root.style.fontSize = '18px';
    }
  };

  // Handle font size change
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
    applyFontSize(size);
  };

  // Handle animation speed change
  const handleAnimationSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    localStorage.setItem("animationSpeed", speed);
    
    // CSS variable for global animations
    let duration = 0.3;
    if (speed === 'slow') duration = 0.8;
    if (speed === 'fast') duration = 0.15;
    document.documentElement.style.setProperty('--animation-duration', `${duration}s`);
  };

  // Get animation duration based on speed
  const getAnimationDuration = () => {
    if (animationSpeed === 'slow') return 0.8;
    if (animationSpeed === 'fast') return 0.15;
    return 0.5;
  };

  // SHORTCUTS FUNKSIYALARI (faqat yoqilgan bo'lsa)
  useEffect(() => {
    if (!shortcutsEnabled) return;
    
    const handleShortcuts = (e) => {
      
      // Ctrl + D -> Dark Mode toggle
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setLastShortcut(t("darkMode"));
        setTimeout(() => setLastShortcut(null), 1000);
        toggleDark();
      }
      
      // Ctrl + H -> Home
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        setLastShortcut(t("home"));
        setTimeout(() => setLastShortcut(null), 1000);
        window.location.href = "/";
      }
      
      // Ctrl + R -> Recipes
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        setLastShortcut(t("recipes"));
        setTimeout(() => setLastShortcut(null), 1000);
        window.location.href = "/recipes";
      }
      
      // Ctrl + C -> Chef Secrets
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        setLastShortcut(t("chefSecrets"));
        setTimeout(() => setLastShortcut(null), 1000);
        window.location.href = "/chefsecrets";
      }
      
      // Ctrl + M -> Complaints
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        setLastShortcut(t("complaints"));
        setTimeout(() => setLastShortcut(null), 1000);
        window.location.href = "/complaints";
      }
      
      // Ctrl + Number -> Language change
      if (e.ctrlKey) {
        if (e.key === '1') {
          e.preventDefault();
          setLastShortcut("English");
          setTimeout(() => setLastShortcut(null), 1000);
          changeLanguage('en');
        } else if (e.key === '2') {
          e.preventDefault();
          setLastShortcut(t("uzbek"));
          setTimeout(() => setLastShortcut(null), 1000);
          changeLanguage('uz');
        } else if (e.key === '3') {
          e.preventDefault();
          setLastShortcut(t("russian"));
          setTimeout(() => setLastShortcut(null), 1000);
          changeLanguage('ru');
        }
      }
      
      // Ctrl + S -> Settings
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setLastShortcut(t("settings"));
        setTimeout(() => setLastShortcut(null), 1000);
        window.location.href = "/settings";
      }
      
      // ? tugmasi -> Yordam ko'rsatish
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        const shortcutsList = 
          `⌨️ ${t("availableShortcuts")}:\n\n` +
          `Ctrl + H - ${t("home")}\n` +
          `Ctrl + R - ${t("recipes")}\n` +
          `Ctrl + C - ${t("chefSecrets")}\n` +
          `Ctrl + M - ${t("complaints")}\n` +
          `Ctrl + S - ${t("settings")}\n` +
          `Ctrl + D - ${t("darkMode")}\n` +
          `Ctrl + 1 - ${t("english")}\n` +
          `Ctrl + 2 - ${t("uzbek")}\n` +
          `Ctrl + 3 - ${t("russian")}\n` +
          `Ctrl + ? - ${t("help")}`;
        alert(shortcutsList);
      }
    };
    
    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, [shortcutsEnabled, darkMode, i18n.language]);

  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const toggleShortcuts = () => {
    const newState = !shortcutsEnabled;
    setShortcutsEnabled(newState);
    localStorage.setItem("shortcutsEnabled", newState);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: getAnimationDuration() }}
      className="flex items-center justify-center p-6 min-h-screen"
    >
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: getAnimationDuration() }}
        >
          <Typography
            variant="h3"
            className="text-center mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            ⚙️ {t("settings")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: getAnimationDuration() }}
        >
          <Card className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden">
            
            {/* Background Glows with animation (tezlikka qarab) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: animationSpeed === 'slow' ? 5 : animationSpeed === 'fast' ? 2 : 3, 
                repeat: Infinity 
              }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 opacity-20 blur-3xl rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: animationSpeed === 'slow' ? 6 : animationSpeed === 'fast' ? 2.5 : 4, 
                repeat: Infinity, 
                delay: 1 
              }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 opacity-20 blur-3xl rounded-full"
            ></motion.div>

            {/* Last Shortcut Notification */}
            <AnimatePresence>
              {lastShortcut && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: getAnimationDuration() }}
                  className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 font-bold"
                >
                  ✅ {lastShortcut} {t("shortcutActivated")}
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHORTCUTS HINT */}
            <AnimatePresence>
              {showShortcutHint && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: getAnimationDuration() }}
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm z-10"
                >
                  ⌨️ Ctrl + ? → {t("shortcuts")}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FONT SIZE SECTION */}
            <motion.div 
              whileHover={{ scale: animationSpeed === 'fast' ? 1.01 : 1.02 }}
              transition={{ duration: getAnimationDuration() }}
              className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex justify-between items-center mb-4">
                <Typography className="text-gray-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                  🔤 {t("fontSize")}
                </Typography>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-500">
                    {fontSize === 'small' ? '14px' : fontSize === 'medium' ? '16px' : '18px'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                {[
                  { value: 'small', label: t("small"), icon: 'A↓', size: '14px' },
                  { value: 'medium', label: t("medium"), icon: 'A', size: '16px' },
                  { value: 'large', label: t("large"), icon: 'A↑', size: '18px' }
                ].map((size) => (
                  <motion.button
                    key={size.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFontSizeChange(size.value)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm capitalize transition-all ${
                      fontSize === size.value
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/80"
                    }`}
                  >
                    <span style={{ fontSize: size.size }}>{size.icon}</span> {size.label}
                  </motion.button>
                ))}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg"
              >
                <Typography className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  📏 <span>{t("currentFont")}: {fontSize === 'small' ? t("smallSize") : fontSize === 'medium' ? t("mediumSize") : t("largeSize")}</span>
                </Typography>
              </motion.div>
            </motion.div>

            {/* ANIMATION SPEED SECTION */}
            <motion.div 
              whileHover={{ scale: animationSpeed === 'fast' ? 1.01 : 1.02 }}
              transition={{ duration: getAnimationDuration() }}
              className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-200 dark:border-cyan-800"
            >
              <div className="flex justify-between items-center mb-4">
                <Typography className="text-gray-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                  ⚡ {t("animationSpeed")}
                </Typography>
              </div>
              
              <div className="flex gap-3">
                {[
                  { value: 'slow', label: t("slow"), icon: '🐢', duration: '0.8s' },
                  { value: 'normal', label: t("normal"), icon: '⚡', duration: '0.3s' },
                  { value: 'fast', label: t("fast"), icon: '🚀', duration: '0.15s' }
                ].map((speed) => (
                  <motion.button
                    key={speed.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnimationSpeedChange(speed.value)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm capitalize transition-all ${
                      animationSpeed === speed.value
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                        : "bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/80"
                    }`}
                  >
                    {speed.icon} {speed.label}
                  </motion.button>
                ))}
              </div>
              
              <motion.div 
                animate={{ 
                  x: [0, 10, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: animationSpeed === 'slow' ? 2 : animationSpeed === 'fast' ? 0.5 : 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="mt-3 p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg text-center cursor-pointer"
              >
                <Typography className="text-xs text-gray-600 dark:text-gray-400">
                  🎬 {t("animationPreview")}
                </Typography>
              </motion.div>
            </motion.div>

            {/* SHORTCUTS TOGGLE SECTION */}
            <motion.div 
              whileHover={{ scale: animationSpeed === 'fast' ? 1.01 : 1.02 }}
              transition={{ duration: getAnimationDuration() }}
              className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 border border-green-200 dark:border-green-800"
            >
              <div className="flex justify-between items-center mb-4">
                <Typography className="text-gray-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                  ⌨️ {t("shortcutsAndHotkeys")}
                </Typography>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {shortcutsEnabled ? `✅ ${t("enabled")}` : `❌ ${t("disabled")}`}
                  </span>
                  <Switch 
                    checked={shortcutsEnabled}
                    onChange={toggleShortcuts}
                    color="green"
                  />
                </div>
              </div>
              
              {shortcutsEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: getAnimationDuration() }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">🏠 {t("home")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + H</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">📖 {t("recipes")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + R</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">👨‍🍳 {t("chefSecrets")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + C</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">📝 {t("complaints")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + M</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">⚙️ {t("settings")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + S</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">🌙 {t("darkMode")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + D</kbd>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">❓ {t("help")}</span>
                      <kbd className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-mono">Ctrl + ?</kbd>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg"
              >
                <Typography className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  💡 <span>{shortcutsEnabled ? t("shortcutsEnabledMsg") : t("shortcutsDisabledMsg")}</span>
                </Typography>
              </motion.div>
            </motion.div>

            {/* DARK MODE */}
            <motion.div 
              whileHover={{ scale: animationSpeed === 'fast' ? 1.01 : 1.02 }}
              transition={{ duration: getAnimationDuration() }}
              className="flex justify-between items-center p-4 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 shadow-inner"
            >
              <Typography className="text-gray-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                🌙 {t("darkMode")}
              </Typography>
              <Switch 
                id="dark-mode-switch"
                checked={darkMode} 
                onChange={toggleDark} 
                color="orange"
              />
            </motion.div>

            {/* LANGUAGE */}
            <motion.div 
              whileHover={{ scale: animationSpeed === 'fast' ? 1.01 : 1.02 }}
              transition={{ duration: getAnimationDuration() }}
              className="p-4 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 shadow-inner"
            >
              <Typography className="mb-4 text-gray-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                🌐 {t("language")}
              </Typography>

              <div className="flex gap-3">
                {[
                  { code: "en", name: t("english"), flag: "🇬🇧", shortcut: "Ctrl + 1" },
                  { code: "uz", name: t("uzbek"), flag: "🇺🇿", shortcut: "Ctrl + 2" },
                  { code: "ru", name: t("russian"), flag: "🇷🇺", shortcut: "Ctrl + 3" }
                ].map((lang) => (
                  <motion.div key={lang.code} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 relative group
                        ${i18n.language === lang.code
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        }
                      `}
                    >
                      {lang.flag} {lang.name}
                      {shortcutsEnabled && (
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {lang.shortcut}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* NAVIGATION BUTTONS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: t("home"), path: "/", shortcut: "Ctrl + H", color: "from-blue-500 to-cyan-500", icon: "🏠" },
                { name: t("recipes"), path: "/recipes", shortcut: "Ctrl + R", color: "from-green-500 to-emerald-500", icon: "📖" },
                { name: t("chefSecrets"), path: "/chefsecrets", shortcut: "Ctrl + C", color: "from-purple-500 to-pink-500", icon: "👨‍🍳" },
                { name: t("complaints"), path: "/complaints", shortcut: "Ctrl + M", color: "from-red-500 to-orange-500", icon: "📝" },
                { name: t("settings"), path: "/settings", shortcut: "Ctrl + S", color: "from-indigo-500 to-blue-500", icon: "⚙️" },
              ].map((item) => (
                <motion.div key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => window.location.href = item.path}
                    className={`w-full py-2 rounded-xl font-semibold bg-gradient-to-r ${item.color} text-white shadow-lg relative group`}
                  >
                    {item.icon} {item.name}
                    {shortcutsEnabled && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        {item.shortcut}
                      </span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}