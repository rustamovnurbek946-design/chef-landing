import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const storedLang = localStorage.getItem("lang");
const defaultLang = storedLang || "en";

const resources = {
  en: {
    translation: {
      //Categories
      exploreCategories: "Explore Categories",
      categoriesSubtitle: "Healthy and delicious life starts here.",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      desserts: "Desserts",
      viewAll: "View All",

      //CTA
      readyToCook: "Ready to Cook?",
      startCookingNow: "Start Cooking Now",
      ctaSubtitle:
        "Thousands of delicious recipes and cooking secrets are waiting for you. Start your journey now.",
      chefs: "Chefs",
      happyUsers: "Happy Users",

      //Footer
      aboutUs: "About Us",
      careers: "Careers",
      blog: "Blog",
      press: "Press",
      helpCenter: "Help Center",
      contactSupport: "Contact Support",
      community: "Community",
      faq: "FAQ",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      accessibility: "Accessibility",
      address: "Tashkent, Uzbekistan",
      workingHours: "Monday - Friday: 9:00 - 18:00",
      footerDesc:
        "Learn cooking secrets from professional chefs. The best recipes and kitchen techniques.",
      company: "Company",
      resources: "Resources",
      legal: "Legal",
      allRightsReserved: "All rights reserved.",
      cookies: "Cookie Settings",
      securePayment: "Secure Payment",
      madeWith: "Made with",
      byChefBook: "by ChefBook Team",

      //Hero
      welcomeHero: "Welcome to Premium Recipes",
      artOfCooking: "The Art of Cooking",
      heroDescription:
        "Discover thousands of delicious recipes from professional chefs around the world. Start your culinary journey today!",
      ourStory: "Our Story",
      trending: "TRENDING",
      rating: "rating",
      spicyChickenPasta: "Spicy Chicken Pasta",
      spicy: "Spicy",
      chefPick: "CHEF PICK",
      guaranteedDelicious: "Guaranteed Delicious",

      //HowItWorks
      simpleSteps: "Simple Steps",
      howItWorks: "How It Works",
      chooseRecipe: "Choose Recipe",
      chooseRecipeDesc:
        "Browse through thousands of delicious recipes from around the world. Find your perfect meal.",
      gatherIngredients: "Gather Ingredients",
      gatherIngredientsDesc:
        "Get fresh ingredients from local markets. We provide shopping lists for each recipe.",
      startCooking2: "Start Cooking",
      startCookingDesc:
        "Follow our step-by-step instructions with photos and videos. Cook like a pro!",
      startExploring: "Start Exploring",

      //Recipes
      ourCollection: "Our Collection",
      specialRecipes: "Special",
      noDescription: "Description for this recipe has not been added yet.",
      viewAllRecipes: "View All Recipes",
      byChef: "by Chef",
      recipe: "Recipe",

      //Layout
      home: "Home",
      Recipes: "Recipes",
      complaints: "Complaints",
      chefsecrets: "Chef Secrets",
      settings: "Settings",
      Language: "Language",

      Light: "Light",
      Dark: "Dark",
      System: "System",

      //ChefSecrets
      chefSecrets: "Chef Secrets",
      professionalMasterclass: "Professional Chef Masterclass",
      cookingSecrets: "Cooking Secrets",
      readMore: "Read More",
      save: "Save",
      saved: "Saved",
      like: "Like",
      unlike: "Unlike",
      share: "Share",
      search: "Search secrets...",
      noResults: "No results found",
      clearFilters: "Clear filters",
      subscribe: "Subscribe",
      emailPlaceholder: "Your email address",
      noSpam: "No spam. Only useful content. You can unsubscribe anytime.",
      stats: "My Stats",
      myActivity: "My Activity",
      likes: "Likes",
      savedItems: "Saved Items",
      readItems: "Read Items",
      comments: "Comments",
      writeComment: "Write a comment...",
      beFirst: "Be the first to comment!",
      send: "Send",
      close: "Close",
      shareLink: "Share link copied!",
      subscribed: "Subscribed successfully!",
      invalidEmail: "Please enter a valid email",
      featured: "FEATURED",
      allArticles: "All Articles",
      found: "articles found",
      savedOnly: "Saved Only",
      backToTop: "Back to Top",
      content: "Content",
      company: "Company",
      aboutUs: "About Us",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      terms: "Terms of Service",
      allRightsReserved: "ALL RIGHTS RESERVED",
      dataSaved: "All data is saved in LocalStorage",

      categories: {
        all: "All",
        technique: "Technique",
        meat: "Meat",
        spices: "Spices",
        vegetables: "Vegetables",
      },

      posts: {
        knifeSharpening: "Professional Knife Sharpening Secrets",
        knifeDesc:
          "A guide on how to keep your most important kitchen tool razor sharp.",
        meatSoftening: "3 Ways to Cook Meat Tender Like Cotton",
        meatDesc:
          "Why does meat sometimes become tough? We look at this from a scientific and practical perspective.",
        spicesChemistry: "Spice Chemistry: When to Add to Food?",
        spicesDesc:
          "Learn the right timing to maximize the aroma and taste of spices.",
        vegetableVitamins: "Preserving Vitamins in Vegetables",
        vegetableDesc:
          "Frying or steaming? Secrets to preserving the nutritional properties of vegetables.",
        sauceTechnique: "Perfecting Sauce Consistency",
        sauceDesc: "Special sauce-making techniques from professional chefs.",
        bbqMarinade: "Secret BBQ Marinade Formulas",
        bbqDesc: "The best marinade recipes for the BBQ season.",
        breadSecrets: "Baking Secrets: Crispy Crust & Soft Interior",
        breadDesc: "Professional bakers' techniques for perfect bread.",
      },

      tags: {
        knife: "Knife",
        technique: "Technician",
        masterclass: "Masterclass",
        meat: "Meat",
        secrets: "Secrets",
        marinade: "Marinade",
        spices: "Spices",
        taste: "Taste",
        knowledge: "Knowledge",
        health: "Health",
        veggie: "Veggie",
        sauce: "Sauce",
        professional: "Professional",
        barbecue: "Barbecue",
        bread: "Bread",
        dough: "Dough",
      },

      hero: {
        title: "Culinary",
        subtitle: "Secrets",
        description:
          "Special blog collecting years of experience from professional chefs, cooking techniques, and kitchen secrets.",
        readers: "Readers",
        articles: "Articles",
        experts: "Experts",
      },

      newsletter: {
        title: "Be the first to know about new secrets",
        description:
          "Receive exclusive cooking lessons and tips in your inbox every week.",
        button: "SUBSCRIBE",
        benefit: "No spam. Only useful content. You can unsubscribe anytime.",
      },

      footer: {
        tagline:
          "Your closest friend in the kitchen. Learn cooking secrets from professional chefs.",
        recipes: "Recipes",
        equipment: "Kitchen Equipment",
      },
    },

    //Complaints
    general: "General",
    technicalProblem: "Technical Problem",
    recipeProblem: "Recipe Problem",
    wrongContent: "Wrong Content",
    supportCenter: "Support Center",
    haveQuestions: "Have questions?",
    weCreateBest:
      "We create the best culinary experience. If something goes wrong, our team is ready to help you 24/7.",
    leaveComplaint: "Leave a complaint",
    knowledgeBase: "Knowledge Base",
    yourName: "Your Name",
    email: "Email",
    complaintCategory: "Complaint Category",
    subject: "Subject",
    situationDescription: "Situation Description",
    tellUsDetails: "Tell us in detail...",
    sendRequest: "Send Request",
    sent: "Sent!",
    haveQuestionsShort: "Have questions?",
    weReadyAnswer:
      "We are ready to answer all your questions in a place called the knowledge base",
    openKnowledgeBase: "Open Knowledge Base",
    directContacts: "Direct Contacts",
    office: "Office",
    searchKnowledgeBase: "Search knowledge base...",
    ourAchievements: "Our Achievements",
    weInNumbers: "We in numbers",
    activeChefs: "Active Chefs",
    satisfiedClients: "Satisfied Clients",
    recipesInDatabase: "Recipes in Database",
    averageRating: "Average Rating",
    whatClientsSay: "What our clients say",
    photoRecipes: "Photo Recipes",
    uploadYourMasterpieces: "Upload your masterpieces",
    becomeVerified: "Become verified",
    communityMessage: "Connect with like-minded people",
    aiRecipes: "AI Recipes",
    artificialIntelligence: "Artificial Intelligence",
    readyToStartCooking: "Ready to start cooking?",
    joinChefBookToday: "Join the ChefBook community today",
    startCookingBtn: "Start Cooking →",

    faq: {
      answer1:
        "Our algorithm selects recipes based on your preferences. Use advanced filters to search by ingredients, cooking time, and difficulty.",
      answer2:
        "Verification usually takes 2 to 24 hours. Our experts check gram accuracy and photo quality to maintain the community's high standards.",
      answer3:
        "We use end-to-end encryption and TLS 1.3 protocols. Your data is never shared with third parties without your explicit consent.",
      answer4:
        "If the transaction fails, check your card limits or try an alternative payment method (Google Pay/Apple Pay). Refunds are possible within 14 days.",
      answer5:
        "Yes! Inside each recipe there is an 'Export' button that allows you to send the ingredient list to Telegram, WhatsApp, or save as PDF.",
      answer6:
        "Go to 'My Recipes', select the one you want and click the archive icon. Complete deletion is available through the privacy settings menu.",
      answer7:
        "We are always open to partnerships. Write to us at business@chefbook.com with the subject 'Partnership', and our manager will contact you.",
      answer8:
        "Favorite recipes are saved in your device's cache. You can view cooking steps even without internet access.",
      answer9:
        "You need to publish at least 15 unique recipes with a rating above 4.5 stars. After that, an application button will appear.",
      answer10:
        "All unpublished recipes are automatically saved in the cloud and are available in the 'Drafts' section of your personal account.",
      answer11:
        "Yes, we are available on the App Store and Google Play. The mobile version supports push notifications about new comments on your dishes.",
      answer12:
        "Click the three dots next to the comment and select 'Report'. Our team will review the complaint as a priority.",
    },

    searchTags: {
      search: "Search",
      recipes: "Recipes",
      moderation: "Moderation",
      security: "Security",
      payment: "Payment",
      refund: "Refund",
      features: "Features",
      account: "Account",
      business: "Business",
      offline: "Offline",
      verification: "Verification",
      content: "Content",
      mobile: "Mobile",
      community: "Community",
    },

    //Settings
    fontSize: "Font Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    smallSize: "Small (14px)",
    mediumSize: "Medium (16px)",
    largeSize: "Large (18px)",
    currentFont: "Current font",
    animationSpeed: "Animation Speed",
    slow: "Slow",
    normal: "Normal",
    fast: "Fast",
    animationPreview: "Animation preview (moving)",
    shortcutsAndHotkeys: "Keyboard Shortcuts & Hotkeys",
    shortcuts: "Shortcuts",
    shortcutActivated: "shortcut activated!",
    enabled: "Enabled",
    disabled: "Disabled",
    shortcutsEnabledMsg:
      "Shortcuts are enabled. Click the switch to disable them!",
    shortcutsDisabledMsg:
      "Shortcuts are disabled. Click the switch to enable them!",
    availableShortcuts: "Available Shortcuts",
    english: "English",
    uzbek: "Uzbek",
    russian: "Russian",
    help: "Help",
    faq: {
      q1: "How to find the perfect recipe?",
      a1: "Our algorithm selects recipes based on your preferences. Use advanced filters to search by ingredients, cooking time, and difficulty.",
      q2: "Content moderation: how long to wait?",
      a2: "Verification usually takes 2 to 24 hours. Our experts check gram accuracy and photo quality to maintain the community's high standards.",
      q3: "How is my personal data protected?",
      a3: "We use end-to-end encryption and TLS 1.3 protocols. Your data is never shared with third parties without your explicit consent.",
      q4: "Problems with subscription payment?",
      a4: "If the transaction fails, check your card limits or try an alternative payment method (Google Pay/Apple Pay). Refunds are possible within 14 days.",
      q5: "Can I export the shopping list?",
      a5: "Yes! Inside each recipe there is an 'Export' button that allows you to send the ingredient list to Telegram, WhatsApp, or save as PDF.",
      q6: "How to delete an old recipe?",
      a6: "Go to 'My Recipes', select the one you want and click the archive icon. Complete deletion is available through the privacy settings menu.",
      q7: "Partnership for brands?",
      a7: "We are always open to partnerships. Write to us at business@chefbook.com with the subject 'Partnership', and our manager will contact you.",
      q8: "Does the app work offline?",
      a8: "Favorite recipes are saved in your device's cache. You can view cooking steps even without internet access.",
      q9: "How to become a verified chef?",
      a9: "You need to publish at least 15 unique recipes with a rating above 4.5 stars. After that, an application button will appear.",
      q10: "Where are my drafts stored?",
      a10: "All unpublished recipes are automatically saved in the cloud and are available in the 'Drafts' section of your personal account.",
      q11: "Is there a mobile app?",
      a11: "Yes, we are available on the App Store and Google Play. The mobile version supports push notifications about new comments on your dishes.",
      q12: "How to report an insult?",
      a12: "Click the three dots next to the comment and select 'Report'. Our team will review the complaint as a priority.",
    },
    testimonials: {
      name1: "Anna K.",
      text1:
        "They quickly resolved my payment issue! Thanks to the ChefBook team 🙌",
      role1: "Premium User",
      name2: "Dmitry V.",
      text2:
        "The best support service among all cooking apps. They respond within 5 minutes!",
      role2: "Chef",
      name3: "Elena M.",
      text3:
        "They helped restore access to my account in 10 minutes. Very professional!",
      role3: "Home Cook",
    },
  },

  uz: {
    translation: {
      //Categories
      exploreCategories: "Kategoriyalarni o'rganing",
      categoriesSubtitle: "Sog'lom va mazali hayot shu yerdan boshlanadi.",
      breakfast: "Nonushta",
      lunch: "Tushlik",
      dinner: "Kechki ovqat",
      desserts: "Shirinliklar",
      viewAll: "Barchasini ko'rish",

      //CTA
      readyToCook: "Ovqat tayyorlashga tayyormisiz?",
      startCookingNow: "Hoziroq boshlang",
      ctaSubtitle:
        "Minglab mazali retseptlar va oshpazlik sirlari sizni kutmoqda. Hoziroq o'z sayohatingizni boshlang.",
      chefs: "Oshpazlar",
      happyUsers: "Baxtli foydalanuvchilar",

      //Footer
      aboutUs: "Biz haqimizda",
      careers: "Karyera",
      blog: "Blog",
      press: "Matbuot",
      helpCenter: "Yordam markazi",
      contactSupport: "Qo'llab-quvvatlash",
      community: "Jamiyat",
      faq: "Ko'p so'raladigan savollar",
      privacyPolicy: "Maxfiylik siyosati",
      termsOfService: "Foydalanish shartlari",
      cookiePolicy: "Cookie siyosati",
      accessibility: "Qulaylik",
      address: "Toshkent, O'zbekiston",
      workingHours: "Dushanba - Juma: 9:00 - 18:00",
      footerDesc:
        "Professional oshpazlardan taom sirlarini o'rganing. Eng zo'r retseptlar va oshxona texnikalari.",
      company: "Kompaniya",
      resources: "Manbalar",
      legal: "Huquqiy",
      allRightsReserved: "Barcha huquqlar himoyalangan.",
      cookies: "Cookie sozlamalari",
      securePayment: "Xavfsiz to'lov",
      madeWith: "Sevgi bilan yaratildi",
      byChefBook: "ChefBook jamoasi tomonidan",

      //Hero
      welcomeHero: "Premium Retseptlar dunyosiga xush kelibsiz",
      artOfCooking: "Oshpazlik san'ati",
      heroDescription:
        "Butun dunyo bo'ylab professional oshpazlardan minglab mazali retseptlarni kashf eting. Oshpazlik sayohatingizni bugun boshlang!",
      ourStory: "Bizning hikoyamiz",
      trending: "TRENDING",
      rating: "reyting",
      spicyChickenPasta: "Achchiq tovuqli pasta",
      spicy: "Achchiq",
      chefPick: "OSHPAZ TANLOVI",
      guaranteedDelicious: "Mazali bo'lishi kafolatlangan",

      //HowItWorks
      simpleSteps: "Oddiy qadamlar",
      howItWorks: "Qanday ishlaydi",
      chooseRecipe: "Retseptni tanlang",
      chooseRecipeDesc:
        "Butun dunyo bo'ylab minglab mazali retseptlarni ko'rib chiqing. O'zingizga mos taomni toping.",
      gatherIngredients: "Masalliqlarni yig'ing",
      gatherIngredientsDesc:
        "Mahalliy bozorlardan yangi masalliqlarni oling. Har bir retsept uchun xarid ro'yxatini taqdim etamiz.",
      startCooking2: "Pishirishni boshlang",
      startCookingDesc:
        "Rasmlar va videolar bilan bosqichma-bosqich ko'rsatmalarga amal qiling. Professionaldek pishiring!",
      startExploring: "Kashf qilishni boshlang",

      //Recipes
      ourCollection: "Bizning to'plam",
      specialRecipes: "Maxsus",
      noDescription: "Ushbu retseptning tavsifi hali qo'shilmagan.",
      viewAllRecipes: "Barcha retseptlarni ko'rish",
      byChef: "Oshpaz tomonidan",
      recipe: "Retsept",

      //Layout
      home: "Bosh sahifa",
      Recipes: "Retseptlar",
      complaints: "Shikoyatlar",
      chefsecrets: "Oshpaz sirlari",
      settings: "Sozlamalar",
      Language: "Til",

      Light: "Yorug'",
      Dark: "Qorong'u",
      System: "Tizim",

      //ChefSecrets
      chefSecrets: "Oshpaz sirlari",
      professionalMasterclass: "Professional oshpazlar masterklassi",
      cookingSecrets: "Pishirish sirlari",
      readMore: "Batafsil o'qish",
      save: "Saqlash",
      saved: "Saqlangan",
      like: "Like",
      unlike: "Like bekor qilish",
      share: "Ulashish",
      search: "Sirlarni izlash...",
      noResults: "Hech narsa topilmadi",
      clearFilters: "Filtrlarni tozalash",
      subscribe: "Obuna bo'lish",
      emailPlaceholder: "Email manzilingiz",
      noSpam:
        "Spam yo'q. Faqat foydali kontent. Istalgan vaqt bekor qilishingiz mumkin.",
      stats: "Mening statistikam",
      myActivity: "Mening faoliyatim",
      likes: "Layklar",
      savedItems: "Saqlanganlar",
      readItems: "O'qilganlar",
      comments: "Commentlar",
      writeComment: "Comment yozing...",
      beFirst: "Birinchi bo'ling!",
      send: "Yuborish",
      close: "Yopish",
      shareLink: "Maqola linki nusxalandi!",
      subscribed: "Obuna bo'ldingiz!",
      invalidEmail: "To'g'ri email manzil kiriting",
      featured: "TAVSIYA ETILGAN",
      allArticles: "Barcha maqolalar",
      found: "ta maqola topildi",
      savedOnly: "Saqlanganlar",
      backToTop: "Yuqoriga",
      content: "MAZMUN",
      company: "KOMPANYA",
      aboutUs: "Biz haqimizda",
      contact: "Bog'lanish",
      privacyPolicy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      allRightsReserved: "BARCHA HUQUQLAR HIMOYALANGAN",
      dataSaved: "Barcha ma'lumotlar LocalStorage da saqlanadi",

      categories: {
        all: "Barchasi",
        technique: "Texnika",
        meat: "Go'sht",
        spices: "Ziravorlar",
        vegetables: "Sabzavotlar",
      },

      posts: {
        knifeSharpening: "Pichoqni professional darajada o'tkirlash sirlari",
        knifeDesc:
          "Oshxonadagi eng muhim qurolingizni qanday qilib lazer kabi o'tkir holatda saqlash bo'yicha qo'llanma.",
        meatSoftening: "Go'shtni paxtadek yumshoq pishirishning 3 usuli",
        meatDesc:
          "Nima uchun go'sht ba'zida qattiq bo'lib qoladi? Biz buni ilmiy va amaliy tomondan ko'rib chiqamiz.",
        spicesChemistry: "Ziravorlar kimyosi: Ovqatga qachon solish kerak?",
        spicesDesc:
          "Ziravorlarning hidi va ta'mi maksimal darajada chiqishi uchun vaqtni to'g'ri tanlashni o'rganing.",
        vegetableVitamins: "Sabzavotlardagi vitaminlarni saqlab qolish",
        vegetableDesc:
          "Qovurishmi yoki bug'da pishirish? Sabzavotlarning foydali xususiyatlarini saqlash sirlari.",
        sauceTechnique: "Souslarni mukammal konsistensiyaga keltirish",
        sauceDesc:
          "Professional oshpazlardan sous tayyorlashning maxsus texnikasi.",
        bbqMarinade: "Barbekyu marinadlarining maxfiy formulalari",
        bbqDesc: "Barbekyu mavsumi uchun eng zo'r marinad retseptlari.",
        breadSecrets:
          "Non pishirish sirlari: Qarsillab turgan qobiq va yumshoq ich",
        breadDesc:
          "Professional nonvoylardan mukammal non tayyorlash texnikasi.",
      },

      tags: {
        knife: "Pichoq",
        technique: "Texnika",
        masterclass: "Masterklass",
        meat: "Go'sht",
        secrets: "Sirlar",
        marinade: "Marinad",
        spices: "Ziravorlar",
        taste: "Ta'm",
        knowledge: "Bilim",
        health: "Salomatlik",
        veggie: "Vegi",
        sauce: "Sous",
        professional: "Professional",
        barbecue: "Barbekyu",
        bread: "Non",
        dough: "Xamir",
      },

      hero: {
        title: "Oshpazlik",
        subtitle: "Sirlari",
        description:
          "Professional oshpazlarning ko'p yillik tajribasi, pishirish texnikalari va oshxona sirlari jamlangan maxsus blog.",
        readers: "O'quvchi",
        articles: "Maqola",
        experts: "Ekspert",
      },

      newsletter: {
        title: "Yangi sirlardan birinchilardan bo'lib xabardor bo'ling",
        description:
          "Har hafta o'z pochtingizga eksklyuziv oshpazlik darslari va maslahatlarini qabul qiling.",
        button: "OBUNA BO'LISH",
        benefit:
          "Spam yo'q. Faqat foydali kontent. Istalgan vaqt bekor qilishingiz mumkin.",
      },

      footer: {
        tagline:
          "Sizning oshxonadagi eng yaqin do'stingiz. Professional oshpazlardan taom sirlarini o'rganing.",
        recipes: "Retseptlar",
        equipment: "Oshxona jihozlari",
      },
    },

    //Complaints
    general: "Umumiy",
    technicalProblem: "Texnik muammo",
    recipeProblem: "Retsept muammosi",
    wrongContent: "Noto'g'ri kontent",
    supportCenter: "Qo'llab-quvvatlash markazi",
    haveQuestions: "Savollaringiz bormi?",
    weCreateBest:
      "Eng yaxshi pazandachilik tajribasini yaratamiz. Agar biror narsa noto'g'ri bo'lsa, jamoamiz 24/7 yordam berishga tayyor.",
    leaveComplaint: "Shikoyat qoldirish",
    knowledgeBase: "Bilimlar bazasi",
    yourName: "Sizning Ismingiz",
    email: "Email",
    complaintCategory: "Murojaat kategoriyasi",
    subject: "Mavzu",
    situationDescription: "Vaziyat tavsifi",
    tellUsDetails: "Bizga batafsil aytib bering...",
    sendRequest: "So'rov yuborish",
    sent: "Yuborildi!",
    haveQuestionsShort: "Savollaringiz bormi?",
    weReadyAnswer:
      "Bilimlar bazasi deb nomlangan joyda barcha savollaringizga javob berishga tayyormiz",
    openKnowledgeBase: "Bilimlar bazasini ochish",
    directContacts: "To'g'ridan-to'g'ri kontaktlar",
    office: "Ofis",
    searchKnowledgeBase: "Bilimlar bazasidan qidirish...",
    ourAchievements: "Yutuqlarimiz",
    weInNumbers: "Biz raqamlarda",
    activeChefs: "Faol oshpazlar",
    satisfiedClients: "Mamnun mijozlar",
    recipesInDatabase: "Bazadagi retseptlar",
    averageRating: "O'rtacha reyting",
    whatClientsSay: "Mijozlarimiz nimadeyishadi",
    photoRecipes: "Foto retseptlar",
    uploadYourMasterpieces: "O'z durdonalaringizni yuklang",
    becomeVerified: "Tasdiqlang",
    communityMessage: "Hamfikrlar bilan muloqot qiling",
    aiRecipes: "AI retseptlar",
    artificialIntelligence: "Sun'iy intellekt",
    readyToStartCooking: "Pishirishni boshlashga tayyormisiz?",
    joinChefBookToday: "ChefBook jamiyatiga bugun qo'shiling",
    startCookingBtn: "Pishirishni boshlash →",

    faq: {
      answer1:
        "Bizning algoritm sizning afzalliklaringiz asosida retseptlarni tanlaydi. Ingredientlar, pishirish vaqti va murakkablik bo'yicha qidirish uchun kengaytirilgan filtrlardan foydalaning.",
      answer2:
        "Odatda tekshiruv 2 dan 24 soatgacha davom etadi. Bizning ekspertlarimiz jamiyatning yuqori standartini saqlash uchun gramm aniqligi va fotosuratlar sifatini tekshiradilar.",
      answer3:
        "Biz end-to-end shifrlash va TLS 1.3 protokollaridan foydalanamiz. Sizning ma'lumotlaringiz sizning aniq roziligingizsiz hech qachon uchinchi tomonlarga berilmaydi.",
      answer4:
        "Agar tranzaksiya bajarilmasa, kartangiz cheklovlarini tekshiring yoki muqobil to'lov usulini (Google Pay/Apple Pay) sinab ko'ring. 14 kun ichida qaytarish mumkin.",
      answer5:
        "Ha! Har bir retsept ichida 'Eksport' tugmasi mavjud bo'lib, ingredientlar ro'yxatini Telegram, WhatsApp yoki PDFga yuborish imkonini beradi.",
      answer6:
        "'Mening retseptlarim' ga o'ting, keraklisini tanlang va arxiv belgisini bosing. To'liq o'chirish maxfiylik sozlamalari menyusi orqali mavjud.",
      answer7:
        "Biz hamkorlikka doim ochiqmiz. 'Partnership' mavzusi bilan business@chefbook.com manziliga yozing, menejerimiz siz bilan bog'lanadi.",
      answer8:
        "Sevimli retseptlar qurilmangiz keshida saqlanadi. Internetga kirish imkonisiz ham pishirish bosqichlarini ko'rishingiz mumkin.",
      answer9:
        "Kamida 15 ta noyob retseptni 4.5 yulduzdan yuqori reyting bilan nashr etishingiz kerak. Shundan so'ng ariza topshirish tugmasi paydo bo'ladi.",
      answer10:
        "Barcha nashr etilmagan retseptlar avtomatik ravishda bulutda saqlanadi va shaxsiy kabinetingizning 'Qoralamalar' bo'limida mavjud.",
      answer11:
        "Ha, biz App Store va Google Playda mavjudmiz. Mobil versiya sizning taomlaringizga yangi sharhlar haqida push-bildirishnomalarni qo'llab-quvvatlaydi.",
      answer12:
        "Sharh yonidagi uch nuqtani bosing va 'Shikoyat qilish' ni tanlang. Jamoamiz shikoyatni ustuvor tartibda ko'rib chiqadi.",
    },

    searchTags: {
      search: "Qidiruv",
      recipes: "Retseptlar",
      moderation: "Moderatsiya",
      security: "Xavfsizlik",
      payment: "To'lov",
      refund: "Qaytarish",
      features: "Funksiyalar",
      account: "Akkaunt",
      business: "Biznes",
      offline: "Offlayn",
      verification: "Tasdiqlash",
      content: "Kontent",
      mobile: "Mobil",
      community: "Jamiyat",
    },

    //Settings
    fontSize: "Shrift kattaligi",
    small: "Kichik",
    medium: "O'rta",
    large: "Katta",
    smallSize: "Kichik (14px)",
    mediumSize: "O'rta (16px)",
    largeSize: "Katta (18px)",
    currentFont: "Hozirgi shrift",
    animationSpeed: "Animatsiya tezligi",
    slow: "Sekin",
    normal: "Normal",
    fast: "Tez",
    animationPreview: "Animatsiya preview (harakatlanadi)",
    shortcutsAndHotkeys: "Klaviatura yorliqlari",
    shortcuts: "Yorliqlar",
    shortcutActivated: "yorlig'i faollashtirildi!",
    enabled: "Yoqilgan",
    disabled: "O'chirilgan",
    shortcutsEnabledMsg:
      "Yorliqlar yoqilgan. O'chirish uchun switch'ni bosing!",
    shortcutsDisabledMsg:
      "Yorliqlar o'chirilgan. Yoqish uchun switch'ni bosing!",
    availableShortcuts: "Mavjud yorliqlar",
    english: "Ingliz",
    uzbek: "O'zbek",
    russian: "Rus",
    help: "Yordam",
    faq: {
      q1: "Ideal retseptni qanday topish mumkin?",
      a1: "Bizning algoritm sizning afzalliklaringiz asosida retseptlarni tanlaydi. Ingredientlar, pishirish vaqti va murakkablik bo'yicha qidirish uchun kengaytirilgan filtrlardan foydalaning.",
      q2: "Kontent moderatsiyasi: qancha kutish kerak?",
      a2: "Odatda tekshiruv 2 dan 24 soatgacha davom etadi. Bizning ekspertlarimiz jamiyatning yuqori standartini saqlash uchun gramm aniqligi va fotosuratlar sifatini tekshiradilar.",
      q3: "Shaxsiy ma'lumotlarim qanday himoyalangan?",
      a3: "Biz end-to-end shifrlash va TLS 1.3 protokollaridan foydalanamiz. Sizning ma'lumotlaringiz sizning aniq roziligingizsiz hech qachon uchinchi tomonlarga berilmaydi.",
      q4: "Obuna to'lovi bilan bog'liq muammolar?",
      a4: "Agar tranzaksiya bajarilmasa, kartangiz cheklovlarini tekshiring yoki muqobil to'lov usulini (Google Pay/Apple Pay) sinab ko'ring. 14 kun ichida qaytarish mumkin.",
      q5: "Xarid ro'yxatini eksport qilsa bo'ladimi?",
      a5: "Ha! Har bir retsept ichida 'Eksport' tugmasi mavjud bo'lib, ingredientlar ro'yxatini Telegram, WhatsApp yoki PDFga yuborish imkonini beradi.",
      q6: "Eski retseptni qanday o'chirish mumkin?",
      a6: "'Mening retseptlarim' ga o'ting, keraklisini tanlang va arxiv belgisini bosing. To'liq o'chirish maxfiylik sozlamalari menyusi orqali mavjud.",
      q7: "Brendlar uchun hamkorlik?",
      a7: "Biz hamkorlikka doim ochiqmiz. 'Partnership' mavzusi bilan business@chefbook.com manziliga yozing, menejerimiz siz bilan bog'lanadi.",
      q8: "Ilova oflayn rejimda ishlaydimi?",
      a8: "Sevimli retseptlar qurilmangiz keshida saqlanadi. Internetga kirish imkonisiz ham pishirish bosqichlarini ko'rishingiz mumkin.",
      q9: "Qanday qilib tasdiqlangan oshpaz bo'lish mumkin?",
      a9: "Kamida 15 ta noyob retseptni 4.5 yulduzdan yuqori reyting bilan nashr etishingiz kerak. Shundan so'ng ariza topshirish tugmasi paydo bo'ladi.",
      q10: "Qoralamalarim qayerda saqlanadi?",
      a10: "Barcha nashr etilmagan retseptlar avtomatik ravishda bulutda saqlanadi va shaxsiy kabinetingizning 'Qoralamalar' bo'limida mavjud.",
      q11: "Mobil ilova bormi?",
      a11: "Ha, biz App Store va Google Playda mavjudmiz. Mobil versiya sizning taomlaringizga yangi sharhlar haqida push-bildirishnomalarni qo'llab-quvvatlaydi.",
      q12: "Haqorat haqida qanday xabar berish mumkin?",
      a12: "Sharh yonidagi uch nuqtani bosing va 'Shikoyat qilish' ni tanlang. Jamoamiz shikoyatni ustuvor tartibda ko'rib chiqadi.",
    },
    testimonials: {
      name1: "Anna K.",
      text1:
        "To'lov muammomni tezda hal qilishdi! ChefBook jamoasiga rahmat 🙌",
      role1: "Premium foydalanuvchi",
      name2: "Dmitriy V.",
      text2:
        "Barcha pazandachilik ilovalari orasida eng yaxshi qo'llab-quvvatlash xizmati. 5 daqiqa ichida javob berishadi!",
      role2: "Oshpaz",
      name3: "Elena M.",
      text3:
        "10 daqiqada akkauntimga kirishni tiklashga yordam berishdi. Juda professional!",
      role3: "Uy oshpazi",
    },
  },

  ru: {
    translation: {
      //Categories
      exploreCategories: "Изучите категории",
      categoriesSubtitle: "Здоровая и вкусная жизнь начинается здесь.",
      breakfast: "Завтрак",
      lunch: "Обед",
      dinner: "Ужин",
      desserts: "Десерты",
      viewAll: "Смотреть все",

      //CTA
      readyToCook: "Готовы готовить?",
      startCookingNow: "Начать готовить",
      ctaSubtitle:
        "Тысячи вкусных рецептов и кулинарных секретов ждут вас. Начните свое путешествие прямо сейчас.",
      chefs: "Шеф-поваров",
      happyUsers: "Счастливых пользователей",

      //Footer
      aboutUs: "О нас",
      careers: "Карьера",
      blog: "Блог",
      press: "Пресса",
      helpCenter: "Центр помощи",
      contactSupport: "Поддержка",
      community: "Сообщество",
      faq: "Часто задаваемые вопросы",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      cookiePolicy: "Политика cookie",
      accessibility: "Доступность",
      address: "Ташкент, Узбекистан",
      workingHours: "Понедельник - Пятница: 9:00 - 18:00",
      footerDesc:
        "Изучайте кулинарные секреты от профессиональных шеф-поваров. Лучшие рецепты и кухонные техники.",
      company: "Компания",
      resources: "Ресурсы",
      legal: "Правовая информация",
      allRightsReserved: "Все права защищены.",
      cookies: "Настройки cookie",
      securePayment: "Безопасная оплата",
      madeWith: "Сделано с",
      byChefBook: "командой ChefBook",

      //Hero
      welcomeHero: "Добро пожаловать в Premium Рецепты",
      artOfCooking: "Искусство приготовления",
      heroDescription:
        "Откройте для себя тысячи вкусных рецептов от профессиональных шеф-поваров со всего мира. Начните свое кулинарное путешествие сегодня!",
      ourStory: "Наша история",
      trending: "ПОПУЛЯРНОЕ",
      rating: "рейтинг",
      spicyChickenPasta: "Острая куриная паста",
      spicy: "Острый",
      chefPick: "ВЫБОР ШЕФА",
      guaranteedDelicious: "Гарантированно вкусно",

      //HowItWorks
      simpleSteps: "Простые шаги",
      howItWorks: "Как это работает",
      chooseRecipe: "Выберите рецепт",
      chooseRecipeDesc:
        "Просмотрите тысячи вкусных рецептов со всего мира. Найдите свое идеальное блюдо.",
      gatherIngredients: "Соберите ингредиенты",
      gatherIngredientsDesc:
        "Покупайте свежие ингредиенты на местных рынках. Мы предоставляем списки покупок для каждого рецепта.",
      startCooking2: "Начните готовить",
      startCookingDesc:
        "Следуйте нашим пошаговым инструкциям с фото и видео. Готовьте как профессионал!",
      startExploring: "Начать изучение",

      //Recipes
      ourCollection: "Наша коллекция",
      specialRecipes: "Особые",
      noDescription: "Описание для этого рецепта еще не добавлено.",
      viewAllRecipes: "Смотреть все рецепты",
      byChef: "от Шеф-повара",
      recipe: "Рецепт",

      //Layout
      home: "Главная",
      Recipes: "Рецепты",
      complaints: "Жалобы",
      chefsecrets: "Секреты шефа",
      settings: "Настройки",
      Language: "Язык",

      Light: "Светлая",
      Dark: "Темная",
      System: "Системная",

      //ChefSecrets
      chefSecrets: "Секреты шефа",
      professionalMasterclass: "Профессиональный мастер-класс шеф-повара",
      cookingSecrets: "Секреты приготовления",
      readMore: "Читать далее",
      save: "Сохранить",
      saved: "Сохранено",
      like: "Нравится",
      unlike: "Убрать лайк",
      share: "Поделиться",
      search: "Поиск секретов...",
      noResults: "Ничего не найдено",
      clearFilters: "Очистить фильтры",
      subscribe: "Подписаться",
      emailPlaceholder: "Ваш email адрес",
      noSpam:
        "Без спама. Только полезный контент. Вы можете отписаться в любое время.",
      stats: "Моя статистика",
      myActivity: "Моя активность",
      likes: "Лайки",
      savedItems: "Сохраненные",
      readItems: "Прочитанные",
      comments: "Комментарии",
      writeComment: "Написать комментарий...",
      beFirst: "Будьте первым!",
      send: "Отправить",
      close: "Закрыть",
      shareLink: "Ссылка на статью скопирована!",
      subscribed: "Вы подписались!",
      invalidEmail: "Введите правильный email адрес",
      featured: "РЕКОМЕНДУЕМОЕ",
      allArticles: "Все статьи",
      found: "статей найдено",
      savedOnly: "Сохраненные",
      backToTop: "Наверх",
      content: "СОДЕРЖИМОЕ",
      company: "КОМПАНИЯ",
      aboutUs: "О нас",
      contact: "Контакты",
      privacyPolicy: "Политика конфиденциальности",
      terms: "Условия использования",
      allRightsReserved: "ВСЕ ПРАВА ЗАЩИЩЕНЫ",
      dataSaved: "Все данные сохраняются в LocalStorage",

      categories: {
        all: "Все",
        technique: "Техника",
        meat: "Мясо",
        spices: "Специи",
        vegetables: "Овощи",
      },

      posts: {
        knifeSharpening: "Секреты профессиональной заточки ножей",
        knifeDesc:
          "Руководство по поддержанию остроты вашего самого важного кухонного инструмента.",
        meatSoftening: "3 способа приготовить мясо нежным как вата",
        meatDesc:
          "Почему мясо иногда становится жестким? Мы рассмотрим это с научной и практической точки зрения.",
        spicesChemistry: "Химия специй: когда добавлять в еду?",
        spicesDesc:
          "Научитесь правильному времени для максимального раскрытия аромата и вкуса специй.",
        vegetableVitamins: "Сохранение витаминов в овощах",
        vegetableDesc:
          "Жарка или приготовление на пару? Секреты сохранения полезных свойств овощей.",
        sauceTechnique: "Достижение идеальной консистенции соуса",
        sauceDesc:
          "Особые техники приготовления соусов от профессиональных шеф-поваров.",
        bbqMarinade: "Секретные формулы маринада для барбекю",
        bbqDesc: "Лучшие рецепты маринадов для сезона барбекю.",
        breadSecrets: "Секреты выпечки: Хрустящая корочка и мягкая середина",
        breadDesc: "Техники профессиональных пекарей для идеального хлеба.",
      },

      tags: {
        knife: "Нож",
        technique: "Техника",
        masterclass: "Мастеркласс",
        meat: "Мясо",
        secrets: "Секреты",
        marinade: "Маринад",
        spices: "Специи",
        taste: "Вкус",
        knowledge: "Знание",
        health: "Здоровье",
        veggie: "Овощи",
        sauce: "Соус",
        professional: "Профессионально",
        barbecue: "Барбекю",
        bread: "Хлеб",
        dough: "Тесто",
      },

      hero: {
        title: "Кулинарные",
        subtitle: "Секреты",
        description:
          "Специальный блог, объединяющий многолетний опыт профессиональных шеф-поваров, техники приготовления и кухонные секреты.",
        readers: "Читателей",
        articles: "Статей",
        experts: "Экспертов",
      },

      newsletter: {
        title: "Узнавайте о новых секретах первыми",
        description:
          "Получайте эксклюзивные кулинарные уроки и советы на свою почту каждую неделю.",
        button: "ПОДПИСАТЬСЯ",
        benefit:
          "Без спама. Только полезный контент. Вы можете отписаться в любое время.",
      },

      footer: {
        tagline:
          "Ваш ближайший друг на кухне. Учитесь кулинарным секретам у профессиональных шеф-поваров.",
        recipes: "Рецепты",
        equipment: "Кухонное оборудование",
      },
    },

    //Complaints
    general: "Общее",
    technicalProblem: "Техническая проблема",
    recipeProblem: "Проблема с рецептом",
    wrongContent: "Неверный контент",
    supportCenter: "Центр поддержки",
    haveQuestions: "Есть вопросы?",
    weCreateBest:
      "Мы создаем лучший кулинарный опыт. Если что-то идет не так, наша команда готова помочь вам 24/7.",
    leaveComplaint: "Оставить жалобу",
    knowledgeBase: "База знаний",
    yourName: "Ваше Имя",
    email: "Email",
    complaintCategory: "Категория обращения",
    subject: "Тема",
    situationDescription: "Описание ситуации",
    tellUsDetails: "Расскажите нам подробно...",
    sendRequest: "Отправить запрос",
    sent: "Отправлено!",
    haveQuestionsShort: "Есть вопросы?",
    weReadyAnswer:
      "Мы готовы ответить на все ваши вопросы в месте под названием база знаний",
    openKnowledgeBase: "Открыть базу знаний",
    directContacts: "Прямые контакты",
    office: "Офис",
    searchKnowledgeBase: "Поиск по базе знаний...",
    ourAchievements: "Наши достижения",
    weInNumbers: "Мы в цифрах",
    activeChefs: "Активных поваров",
    satisfiedClients: "Довольных клиентов",
    recipesInDatabase: "Рецептов в базе",
    averageRating: "Средний рейтинг",
    whatClientsSay: "Что говорят наши клиенты",
    photoRecipes: "Фото рецептов",
    uploadYourMasterpieces: "Загружайте свои шедевры",
    becomeVerified: "Станьте верифицированным",
    communityMessage: "Общайтесь с единомышленниками",
    aiRecipes: "AI рецепты",
    artificialIntelligence: "Искусственный интеллект",
    readyToStartCooking: "Готовы начать готовить?",
    joinChefBookToday: "Присоединяйтесь к сообществу ChefBook уже сегодня",
    startCookingBtn: "Начать готовить →",

    faq: {
      answer1:
        "Наш алгоритм подбирает рецепты на основе ваших предпочтений. Используйте расширенные фильтры для поиска по ингредиентам, времени приготовления и сложности.",
      answer2:
        "Обычно проверка занимает от 2 до 24 часов. Наши эксперты проверяют точность граммовки и качество фотографий для поддержания высокого стандарта сообщества.",
      answer3:
        "Мы используем сквозное шифрование и протоколы TLS 1.3. Ваши данные никогда не передаются третьим лицам без вашего явного согласия.",
      answer4:
        "Если транзакция не удалась, проверьте лимиты вашей карты или попробуйте альтернативный метод оплаты (Google Pay/Apple Pay). Возврат возможен в течение 14 дней.",
      answer5:
        "Да! Внутри каждого рецепта есть кнопка 'Экспорт', которая позволяет отправить список ингредиентов в Telegram, WhatsApp или сохранить в PDF.",
      answer6:
        "Зайдите в 'Мои рецепты', выберите нужный и нажмите на иконку архива. Полное удаление доступно через меню настроек конфиденциальности.",
      answer7:
        "Мы всегда открыты к партнерству. Напишите нам на business@chefbook.com с темой 'Partnership', и наш менеджер свяжется с вами.",
      answer8:
        "Избранные рецепты сохраняются в кэш вашего устройства. Вы сможете просматривать шаги приготовления даже без доступа к интернету.",
      answer9:
        "Вам нужно опубликовать минимум 15 уникальных рецептов с рейтингом выше 4.5 звезд. После этого появится кнопка подачи заявки.",
      answer10:
        "Все неопубликованные рецепты автоматически сохраняются в облаке и доступны в разделе 'Черновики' вашего личного кабинета.",
      answer11:
        "Да, мы доступны в App Store и Google Play. Мобильная версия поддерживает push-уведомления о новых комментариях к вашим блюдам.",
      answer12:
        "Нажмите на три точки рядом с комментарием и выберите 'Пожаловаться'. Наша команда рассмотрит жалобу в приоритетном порядке.",
    },

    searchTags: {
      search: "Поиск",
      recipes: "Рецепты",
      moderation: "Модерация",
      security: "Безопасность",
      payment: "Оплата",
      refund: "Refund",
      features: "Функции",
      account: "Аккаунт",
      business: "Бизнес",
      offline: "Офлайн",
      verification: "Верификация",
      content: "Контент",
      mobile: "Mobile",
      community: "Community",
    },

    //Settings
    fontSize: "Размер шрифта",
    small: "Маленький",
    medium: "Средний",
    large: "Большой",
    smallSize: "Маленький (14px)",
    mediumSize: "Средний (16px)",
    largeSize: "Большой (18px)",
    currentFont: "Текущий шрифт",
    animationSpeed: "Скорость анимации",
    slow: "Медленно",
    normal: "Нормально",
    fast: "Быстро",
    animationPreview: "Предпросмотр анимации (движется)",
    shortcutsAndHotkeys: "Горячие клавиши",
    shortcuts: "Ярлыки",
    shortcutActivated: "ярлык активирован!",
    enabled: "Включено",
    disabled: "Выключено",
    shortcutsEnabledMsg:
      "Ярлыки включены. Нажмите на переключатель, чтобы выключить!",
    shortcutsDisabledMsg:
      "Ярлыки выключены. Нажмите на переключатель, чтобы включить!",
    availableShortcuts: "Доступные ярлыки",
    english: "Английский",
    uzbek: "Узбекский",
    russian: "Русский",
    help: "Помощь",
    faq: {
      q1: "Как найти идеальный рецепт?",
      a1: "Наш алгоритм подбирает рецепты на основе ваших предпочтений. Используйте расширенные фильтры для поиска по ингредиентам, времени приготовления и сложности.",
      q2: "Модерация контента: сколько ждать?",
      a2: "Обычно проверка занимает от 2 до 24 часов. Наши эксперты проверяют точность граммовки и качество фотографий для поддержания высокого стандарта сообщества.",
      q3: "Как защищены мои личные данные?",
      a3: "Мы используем сквозное шифрование и протоколы TLS 1.3. Ваши данные никогда не передаются третьим лицам без вашего явного согласия.",
      q4: "Проблемы с оплатой подписки?",
      a4: "Если транзакция не удалась, проверьте лимиты вашей карты или попробуйте альтернативный метод оплаты (Google Pay/Apple Pay). Возврат возможен в течение 14 дней.",
      q5: "Можно ли экспортировать список покупок?",
      a5: "Да! Внутри каждого рецепта есть кнопка 'Экспорт', которая позволяет отправить список ингредиентов в Telegram, WhatsApp или сохранить в PDF.",
      q6: "Как удалить старый рецепт?",
      a6: "Зайдите в 'Мои рецепты', выберите нужный и нажмите на иконку архива. Полное удаление доступно через меню настроек конфиденциальности.",
      q7: "Сотрудничество для брендов?",
      a7: "Мы всегда открыты к партнерству. Напишите нам на business@chefbook.com с темой 'Partnership', и наш менеджер свяжется с вами.",
      q8: "Работает ли приложение офлайн?",
      a8: "Избранные рецепты сохраняются в кэш вашего устройства. Вы сможете просматривать шаги приготовления даже без доступа к интернету.",
      q9: "Как стать верифицированным шефом?",
      a9: "Вам нужно опубликовать минимум 15 уникальных рецептов с рейтингом выше 4.5 звезд. После этого появится кнопка подачи заявки.",
      q10: "Где хранятся мои черновики?",
      a10: "Все неопубликованные рецепты автоматически сохраняются в облаке и доступны в разделе 'Черновики' вашего личного кабинета.",
      q11: "Есть ли мобильное приложение?",
      a11: "Да, мы доступны в App Store и Google Play. Мобильная версия поддерживает push-уведомления о новых комментариях к вашим блюдам.",
      q12: "Как сообщить об оскорблении?",
      a12: "Нажмите на три точки рядом с комментарием и выберите 'Пожаловаться'. Наша команда рассмотрит жалобу в приоритетном порядке.",
    },
    testimonials: {
      name1: "Анна К.",
      text1:
        "Быстро решили мою проблему с оплатой! Спасибо команде ChefBook 🙌",
      role1: "Премиум пользователь",
      name2: "Дмитрий В.",
      text2:
        "Лучшая служба поддержки среди всех кулинарных приложений. Отвечают за 5 минут!",
      role2: "Шеф-повар",
      name3: "Елена М.",
      text3:
        "Помогли восстановить доступ к аккаунту за 10 минут. Очень профессионально!",
      role3: "Домашний кулинар",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
