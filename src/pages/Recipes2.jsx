import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

// Add animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }

  .animate-fadeInScale {
    animation: fadeInScale 0.5s ease-out;
  }

  .animate-slideInRight {
    animation: slideInRight 0.6s ease-out;
  }

  .recipe-card {
    animation: fadeInUp 0.6s ease-out backwards;
  }

  .recipe-card:nth-child(1) { animation-delay: 0.1s; }
  .recipe-card:nth-child(2) { animation-delay: 0.2s; }
  .recipe-card:nth-child(3) { animation-delay: 0.3s; }
  .recipe-card:nth-child(4) { animation-delay: 0.4s; }

  .modal-backdrop {
    animation: fadeInScale 0.28s ease-out;
  }

  .modal-content {
    animation: slideInUp 0.36s ease-out;
  }

  .recipe-card:hover img {
    animation: none;
  }

  .shimmer-effect {
    animation: shimmer 2s infinite;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 1000px 100%;
  }

  @keyframes heartBeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .heart-beat {
    animation: heartBeat 0.3s ease-in-out;
  }
`;

// Add style tag to document
if (typeof window !== 'undefined' && !document.getElementById('recipe-animations')) {
  const style = document.createElement('style');
  style.id = 'recipe-animations';
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

const TABS = ["Breakfast", "Lunch", "Dinner", "Desserts"];

const RECIPES = {
  Breakfast: [
    {
      id: 1,
      title: "Scrambled Eggs",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/scrambled-eggs-socialindex-web-0066-lp-del039925-67eb04f9a151b.jpg?crop=0.502xw:1.00xh;0.464xw,0&resize=1200:*",
      summary: "Легкий и питательный завтрак для быстрого старта дня.",
      details: {
        time: "10 мин",
        calories: "220 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Яйца", "Молоко", "Сливочное масло", "Соль и перец"],
      method: "Взбейте яйца с молоком, растопите масло на сковороде и готовьте на среднем огне до мягкости.",
    },
    {
      id: 2,
      title: "Fluffy Pancakes",
      image:
        "https://kitchenfunwithmy3sons.com/wp-content/uploads/2022/06/fluffy-pancakes-feature.jpg",
      summary: "Пышные блины с мягкой текстурой и легким вкусом ванили.",
      details: {
        time: "20 мин",
        calories: "340 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Мука", "Молоко", "Яйцо", "Разрыхлитель"],
      method: "Смешайте сухие и влажные ингредиенты, вылейте тесто на разогретую сковороду и обжаривайте по 2–3 минуты с каждой стороны.",
    },
    {
      id: 3,
      title: "Hearty Oatmeal",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIDvsuUj2PFRFxTgfn_iPEHk_6xQxut2lrw&s",
      summary: "Сытная овсянка с ягодами и орехами, чтобы долго не ощущать голод.",
      details: {
        time: "15 мин",
        calories: "280 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Овсяные хлопья", "Молоко", "Мед", "Ягоды"],
      method: "Сварите овсянку на молоке, добавьте мед, перемешайте и украсьте свежими ягодами и орехами.",
    },
    {
      id: 4,
      title: "Chicken Soup",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPwZHnXpdhOCtSZlvK1ITXSP5-XDXPsIg4A&s",
      summary: "Нежный куриный бульон с овощами для теплого начала дня.",
      details: {
        time: "25 мин",
        calories: "190 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Курица", "Морковь", "Лук", "Лавровый лист"],
      method: "Отварите курицу с овощами, добавьте специи и варите до готовности, затем дождитесь мягкости овощей.",
    },
    {
      id: 5,
      title: "French Toast",
      image:
        "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop",
      summary: "Золотистые ломтики хлеба в ягодном соусе - завтрак-мечта.",
      details: {
        time: "18 мин",
        calories: "310 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Хлеб", "Яйца", "Молоко", "Ваниль", "Сахар"],
      method: "Обмакните хлеб в венчик из яиц и молока, обжарьте на сливочном масле до золотого цвета. Подавайте с ягодами и сиропом.",
    },
    {
      id: 6,
      title: "Granola Bowl",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxeTPh_hT1LR7Mn4_uoRoGvQNt1Ov3pBvew&s",
      summary: "Хрустящая гранола с йогуртом и фруктами - идеальный завтрак.",
      details: {
        time: "10 мин",
        calories: "290 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Гранола", "Йогурт", "Мёд", "Ягоды", "Орехи"],
      method: "Слоями уложите йогурт, гранолу и ягоды. Полейте мёдом и украсьте орехами. Подавайте сразу же.",
    },
    {
      id: 7,
      title: "Avocado Toast",
      image: "https://www.spendwithpennies.com/wp-content/uploads/2022/09/Avocado-Toast-SpendWithPennies-1.jpg",
      summary: "Тосты с авокадо, помидорами и зёрнышками - здоровый и вкусный завтрак.",
      details: {
        time: "12 мин",
        calories: "280 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Хлеб", "Авокадо", "Помидоры", "Лимон", "Специи"],
      method: "Поджарьте хлеб, намажьте толченое авокадо, добавьте помидоры, лимонный сок и специи. Украсьте зеленью.",
    },
    {
      id: 8,
      title: "Smoothie Bowl",
      image:
        "https://www.budgetbytes.com/wp-content/uploads/2025/01/Smoothie-Bowl-Overhead.jpg",
      summary: "Витаминная чаша со смузи и топпингами - вкусное питание для энергии.",
      details: {
        time: "8 мин",
        calories: "250 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Банан", "Ягоды", "Йогурт", "Молоко", "Гранола", "Кокос"],
      method: "Взбейте фрукты с йогуртом, вылейте в чашу и украсьте гранолой, орехами и кокосом.",
    },
    {
      id: 9,
      title: "Eggs Benedict",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXJ5n4tqa6KojtxwolFhjdAXZaCtD_ItER3w&s",
      summary: "Классический завтрак с яйцом пашот и голландским соусом.",
      details: {
        time: "25 мин",
        calories: "420 ккал",
        difficulty: "Сложно",
        servings: "2 порции",
      },
      ingredients: ["Яйца", "Бекон", "Булочки", "Масло", "Лимон", "Эстрагон"],
      method: "Поджарьте булочки с беконом, сверху яйцо пашот, полейте свежеприготовленным голландским соусом.",
    },
    {
      id: 10,
      title: "Cottage Cheese Pancakes",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3b-SaACMBv2lzCD4d7UiRoTidaAYSjk6RDQ&s",
      summary: "Нежные сырники из творога с ягодным соусом - русский деликатес.",
      details: {
        time: "20 мин",
        calories: "310 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Творог", "Яйца", "Мука", "Сахар", "Ягоды", "Сметана"],
      method: "Смешайте творог с яйцами, сформируйте сырники, обжарьте на масле до золотого цвета. Подавайте со сметаной.",
    },
  ],
  Lunch: [
    {
      id: 1,
      title: "Caesar Salad",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5Yp0uPt-uqJ5udVjAL71-ArAIvCzE84nYQ&s",
      summary: "Салат с хрустящими крутонами, пармезаном и классической заправкой.",
      details: {
        time: "15 мин",
        calories: "320 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Романо", "Крутоны", "Пармезан", "Соус Цезарь"],
      method: "Соберите салат из холодных ингредиентов, добавьте заправку и перемешайте незадолго до подачи.",
    },
    {
      id: 2,
      title: "Club Sandwich",
      image:
        "https://cdn7.kiwilimon.com/recetaimagen/38989/640x640/50344.jpg.jpg",
      summary: "Большой сэндвич с курицей, беконом, овощами и мягким хлебом.",
      details: {
        time: "20 мин",
        calories: "450 ккал",
        difficulty: "Средне",
        servings: "1 порция",
      },
      ingredients: ["Хлеб", "Курица", "Бекон", "Листья салата"],
      method: "Обжарьте бекон и курицу, соберите сэндвич слоями с салатом, помидорами и соусом.",
    },
    {
      id: 3,
      title: "Greek Salad",
      image:
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&h=600&fit=crop",
      summary: "Освежающий салат с оливками, сыром фета и яркими овощами.",
      details: {
        time: "12 мин",
        calories: "270 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Томаты", "Огурцы", "Оливки", "Фета"],
      method: "Нарежьте овощи, добавьте оливки и фету, заправьте оливковым маслом и лимонным соком.",
    },
    {
      id: 4,
      title: "Roast Chicken",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GuLgcwAR5NBfmstk0TZxZlNH20aL-mwDOw&s",
      summary: "Запечённая курица с пряным маринадом и овощами.",
      details: {
        time: "45 мин",
        calories: "520 ккал",
        difficulty: "Средне",
        servings: "3 порции",
      },
      ingredients: ["Курица", "Картофель", "Тимьян", "Чеснок"],
      method: "Замаринуйте курицу, запекайте с картофелем и овощами до золотистой корочки.",
    },
    {
      id: 5,
      title: "Caprese Sandwich",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVuMp_uKkk6a8K0lLhxY1pmYKlN-RKJDQ5UQ&s",
      summary: "Итальянский сэндвич с моцареллой, томатами и базиликом.",
      details: {
        time: "10 мин",
        calories: "380 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Хлеб", "Моцарелла", "Томаты", "Базилик", "Оливковое масло"],
      method: "Нарежьте помидоры и сыр, соберите сэндвич со свежим базиликом и оливковым маслом.",
    },
    {
      id: 6,
      title: "Buddha Bowl",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      summary: "Питательная чаша с киноа, овощами и пикантным соусом.",
      details: {
        time: "20 мин",
        calories: "410 ккал",
        difficulty: "Средне",
        servings: "1 порция",
      },
      ingredients: ["Киноа", "Нут", "Авокадо", "Морковь", "Свежие овощи"],
      method: "Отварите киноа, соберите в чашу с овощами и нутом, полейте тахинским соусом.",
    },
    {
      id: 7,
      title: "Tuna Tartare",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS25gCZVudIqMXFoehst6uooRyZNSrTNRqQng&s",
      summary: "Изысканный тартар из свежего тунца с деликатными специями.",
      details: {
        time: "15 мин",
        calories: "280 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Свежий тунец", "Авокадо", "Кунжут", "Соевый соус", "Васаби"],
      method: "Нарежьте тунец кубиком, смешайте с авокадо и специями, подавайте сразу на крекерах.",
    },
    {
      id: 8,
      title: "Grilled Fish Tacos",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
      summary: "Мексиканские тако с копченой рыбой и свежей капустой.",
      details: {
        time: "25 мин",
        calories: "340 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Рыбное филе", "Тортильи", "Капуста", "Лайм", "Соус чили"],
      method: "Пожарьте филе, выложите на тортильи с капустой, добавьте лайм и соус. Подавайте горячим.",
    },
    {
      id: 9,
      title: "Mediterranean Wrap",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTXFW3gvhrFmpyNzGvg-sTv3xBXuKpn9H7Sw&s",
      summary: "Вкусный заворот с овощами, фетой и хумусом - легкий и питательный.",
      details: {
        time: "12 мин",
        calories: "380 ккал",
        difficulty: "Легко",
        servings: "1 порция",
      },
      ingredients: ["Лаваш", "Фета", "Хумус", "Помидоры", "Огурцы", "Оливки"],
      method: "Намажьте хумус на лаваш, выложите овощи и фету, заверните плотно и подавайте холодным.",
    },
    {
      id: 10,
      title: "Quinoa Power Bowl",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKmNZs4P6SsvcTgWEx-S-EE7YilMALje7Dw&s",
      summary: "Энергетическая чаша с киноа, овощами и суперфудами.",
      details: {
        time: "22 мин",
        calories: "420 ккал",
        difficulty: "Средне",
        servings: "1 порция",
      },
      ingredients: ["Киноа", "Свежие овощи", "Семена льна", "Авокадо", "Лимонный сок"],
      method: "Отварите киноа, соберите в чашу с овощами и семенами, полейте лимонным соусом.",
    },
  ],
  Dinner: [
    {
      id: 1,
      title: "Vegetable Pasta",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SSJCeuOMHXlN5IlA2oT39G758Ed8p0_OXg&s",
      summary: "Паста с овощами в томатном соусе — просто и вкусно.",
      details: {
        time: "25 мин",
        calories: "430 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Паста", "Брокколи", "Помидоры", "Оливковое масло"],
      method: "Отварите пасту, обжарьте овощи и смешайте с соусом до мягкости.",
    },
    {
      id: 2,
      title: "Salmon Fillet",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2kXgxEL9TDN1euYjxi4IKnG5djSvHPGy3A&s",
      summary: "Нежный лосось на гриле с зеленью и лимоном.",
      details: {
        time: "30 мин",
        calories: "360 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Филе лосося", "Лимон", "Оливковое масло", "Укроп"],
      method: "Приправьте рыбу, обжарьте на сильном огне и полейте свежим лимонным соком.",
    },
    {
      id: 3,
      title: "Steak & Veggies",
      image:
        "https://justcook.butcherbox.com/wp-content/uploads/2025/02/Rib-Eye-Steak-au-Poivre-with-Roasted-Veggies--500x500.jpg",
      summary: "Сочный стейк с гарниром из запечённых овощей.",
      details: {
        time: "35 мин",
        calories: "650 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Стейк", "Морковь", "Спаржа", "Чеснок"],
      method: "Обжарьте стейк до желаемой прожарки и подайте с запечёнными овощами.",
    },
    {
      id: 4,
      title: "Roasted Potatoes",
      image:
        "https://www.recipetineats.com/tachyon/2023/09/Easy-roast-potatoes_4a.jpg",
      summary: "Хрустящий картофель с травами и чесноком.",
      details: {
        time: "40 мин",
        calories: "300 ккал",
        difficulty: "Легко",
        servings: "3 порции",
      },
      ingredients: ["Картофель", "Розмарин", "Оливковое масло", "Соль"],
      method: "Запеките картофель с оливковым маслом, розмарином и чесноком до золотистого цвета.",
    },
    {
      id: 5,
      title: "Beef Tacos",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qh-kXK76aPWEgj8SdjZgH-QOScqIFvKwsQ&s",
      summary: "Сочные говяжьи тако с крем-сыром и выверенными специями.",
      details: {
        time: "30 мин",
        calories: "480 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Говяжий фарш", "Тортильи", "Сыр", "Помидоры", "Соус"],
      method: "Обжарьте фарш с приправами, выложите на тортильи с сыром и овощами. Подавайте со сметаной.",
    },
    {
      id: 6,
      title: "Chicken Parmesan",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIiDhiVCIm25seQ1pl0gby5X1ugC0KDTUv3Q&s",
      summary: "Нежная отбивная в панировке с томатным соусом и пармезаном.",
      details: {
        time: "35 мин",
        calories: "520 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Куриное филе", "Пармезан", "Томатный соус", "Мука", "Яйцо"],
      method: "Отбейте филе, запанируйте и обжарьте, затем запеките с соусом и сыром в духовке.",
    },
    {
      id: 7,
      title: "Shrimp Scampi",
      image:
        "https://www.allrecipes.com/thmb/yt6gIlc2mgqZ-P3-8MjWD6YhcIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-19508-shrimp-scampi-VAT-hero-01-2x1-6ff29365341b471a8c9b0e4dc758ba4c.jpg",
      summary: "Креветки в чесночном белом вине - итальянская классика.",
      details: {
        time: "20 мин",
        calories: "320 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Креветки", "Чеснок", "Белое вино", "Лимон", "Оливковое масло"],
      method: "Обжарьте чеснок, добавьте креветки и вино, готовьте до розового цвета. Добавьте лимонный сок.",
    },
    {
      id: 8,
      title: "Vegetable Stir Fry",
      image:
        "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-SQ-500x500.jpg",
      summary: "Яркая смесь овощей на быстром огне с соусом терияки.",
      details: {
        time: "18 мин",
        calories: "280 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Болгарский перец", "Брокколи", "Морковь", "Соус терияки", "Имбирь"],
      method: "Обжарьте овощи на высокой температуре, добавьте соус и имбирь, готовьте на максимальном огне.",
    },
    {
      id: 9,
      title: "Lamb Kebab",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y6uo3xnjv8VvhaLBCmhr8fzqe9W8GKH0Dw&s",
      summary: "Сочные шашлычки из мяса баранина с ароматными специями.",
      details: {
        time: "40 мин",
        calories: "550 ккал",
        difficulty: "Средне",
        servings: "3 порции",
      },
      ingredients: ["Ягненок", "Лук", "Специи", "Лимон", "Оливковое масло"],
      method: "Маринуйте мясо 2 часа, нанизывайте на шампуры и жарьте на углях до готовности.",
    },
    {
      id: 10,
      title: "Seafood Risotto",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQsFbBK6yDZklB0jVX4_Ik-F1tAcDh4XN6w&s",
      summary: "Кремовое ризотто с морепродуктами и белым вином.",
      details: {
        time: "35 мин",
        calories: "480 ккал",
        difficulty: "Сложно",
        servings: "2 порции",
      },
      ingredients: ["Рис арборио", "Морепродукты", "Белое вино", "Бульон", "Пармезан"],
      method: "Постепенно добавляйте горячий бульон к рису, добавьте морепродукты и белое вино, готовьте до кремообразности.",
    },
  ],
  Desserts: [
    {
      id: 1,
      title: "Berry Tart",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGZb9Jp3Eh615ht5BTZJoxX2yy3z6fGh6WA&s",
      summary: "Лёгкий тарт с ягодным кремом и хрустящей корочкой.",
      details: {
        time: "35 мин",
        calories: "420 ккал",
        difficulty: "Средне",
        servings: "4 порции",
      },
      ingredients: ["Тесто", "Ягоды", "Сливки", "Сахар"],
      method: "Выпеките корж до золотистости, заполните ягодным кремом и украсьте свежими ягодами.",
    },
    {
      id: 2,
      title: "Vanilla Ice Cream",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0lEhTo29DzmOliZ_2RRI-LAI_mx3dUIEqg&s",
      summary: "Классическое ванильное мороженое с мягкой текстурой.",
      details: {
        time: "20 мин",
        calories: "250 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Молоко", "Сливки", "Ваниль", "Сахар"],
      method: "Смешайте все ингредиенты, охладите и взбейте до кремообразной текстуры, затем заморозьте.",
    },
    {
      id: 3,
      title: "Chocolate Mousse",
      image:
        "https://bakewithzoha.com/wp-content/uploads/2024/10/chocolate-mousse-cup-eaten.jpg",
      summary: "Нежный шоколадный мусс с насыщенным вкусом какао.",
      details: {
        time: "25 мин",
        calories: "330 ккал",
        difficulty: "Средне",
        servings: "2 порции",
      },
      ingredients: ["Шоколад", "Сливки", "Яйца", "Сахар"],
      method: "Растопите шоколад, смешайте со взбитыми сливками и аккуратно добавьте яйца, охладите до плотности.",
    },
    {
      id: 4,
      title: "Fruit Parfait",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoVxyBgCnavflnWgOFilqTO9dpAdmBbSqPg&s",
      summary: "Слойки йогурта, фруктов и гранолы — быстрый десерт.",
      details: {
        time: "15 мин",
        calories: "280 ккал",
        difficulty: "Легко",
        servings: "2 порции",
      },
      ingredients: ["Йогурт", "Фрукты", "Гранола", "Мёд"],
      method: "Через слои уложите йогурт, фрукты и гранолу, полейте мёдом и сразу подавайте.",
    },
    {
      id: 5,
      title: "New York Cheesecake",
      image:
        "https://www.elmundoeats.com/wp-content/uploads/2025/11/New-York-cheesecake-with-no-water-bath-and-raspberry-coulis.jpg",
      summary: "Классический чизкейк с нежной начинкой и хрустящей основой.",
      details: {
        time: "60 мин",
        calories: "480 ккал",
        difficulty: "Сложно",
        servings: "8 порций",
      },
      ingredients: ["Сливочный сыр", "Печенье", "Сливочное масло", "Яйца", "Сахар"],
      method: "Подготовьте основу, запеките с начинкой, затем охладите в холодильнике минимум 4 часа.",
    },
    {
      id: 6,
      title: "Brownies",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvuOSofwByJEuyfKHLryZ0k0xUNrFqiI4Zw&s",
      summary: "Насыщенные шоколадные брауни с хрустящей корочкой.",
      details: {
        time: "35 мин",
        calories: "420 ккал",
        difficulty: "Легко",
        servings: "9 порций",
      },
      ingredients: ["Темный шоколад", "Масло", "Мука", "Яйца", "Сахар"],
      method: "Растопите шоколад, добавьте остальные ингредиенты, вылейте в форму и запеките 30 минут.",
    },
    {
      id: 7,
      title: "Tiramisu",
      image:
        "https://thescranline.com/wp-content/uploads/2025/12/TIRAMISU-25-S-01.jpg",
      summary: "Итальянский десерт с маскарпоне, кофе и какао - божественный вкус.",
      details: {
        time: "30 мин",
        calories: "390 ккал",
        difficulty: "Средне",
        servings: "6 порций",
      },
      ingredients: ["Маскарпоне", "Печенье Ладифингер", "Кофе", "Какао", "Яйца"],
      method: "Смешайте маскарпоне с яйцами, слоями чередуйте с печеньем, пропитанным кофе. Пыль какао сверху.",
    },
    {
      id: 8,
      title: "Crème Brûlée",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPC3qZs8od5d7z_kOPOQhgZF_3V4IyOSsTA&s",
      summary: "Элегантный десерт с хрустящей карамельной корочкой и нежным кремом.",
      details: {
        time: "40 мин",
        calories: "350 ккал",
        difficulty: "Средне",
        servings: "4 порции",
      },
      ingredients: ["Сливки", "Яичные желтки", "Сахар", "Ваниль"],
      method: "Запеките кремовую смесь в ванне, охладите, посыпьте сахаром и подрумяньте паяльной лампой.",
    },
    {
      id: 9,
      title: "Lemon Tart",
      image:
        "https://happyvegannie.com/wp-content/uploads/2024/07/vegan-lemon-tarts-1200x1200-1-1.jpg",
      summary: "Кислый лимонный тарт с хрустящей основой и нежной начинкой.",
      details: {
        time: "50 мин",
        calories: "380 ккал",
        difficulty: "Средне",
        servings: "6 порций",
      },
      ingredients: ["Тесто", "Лимоны", "Яйца", "Сахар", "Сливочное масло"],
      method: "Запеките корж, заполните лимонным кремом и запекайте до золотистого цвета.",
    },
    {
      id: 10,
      title: "Panna Cotta",
      image:
        "https://www.recipetineats.com/tachyon/2025/09/Panna-cotta_8-close-up.jpg",
      summary: "Итальянский десерт с нежной сливочной текстурой и ягодным соусом.",
      details: {
        time: "20 мин",
        calories: "320 ккал",
        difficulty: "Средне",
        servings: "4 порции",
      },
      ingredients: ["Сливки", "Молоко", "Желатин", "Ваниль", "Ягоды"],
      method: "Растворите желатин, смешайте со сливками, охладите 4 часа. Подавайте с ягодным соусом.",
    },
  ],
};

const Recipes2 = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Lunch");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOffsetY, setModalOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);
  
  // New states for likes, saves, and comments
  const [likedRecipes, setLikedRecipes] = useState(() => {
    const saved = localStorage.getItem('likedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('recipeComments');
    return saved ? JSON.parse(saved) : {};
  });
  const [newComment, setNewComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Save to localStorage when states change
  useEffect(() => {
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    localStorage.setItem('recipeComments', JSON.stringify(comments));
  }, [comments]);

  const closeModal = () => {
    setActiveRecipe(null);
    setModalOffsetY(0);
    setIsDragging(false);
    setShowShareMenu(false);
  };

  const handleModalPointerDown = (event) => {
    dragStartY.current = event.clientY;
    dragStartOffset.current = modalOffsetY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleModalPointerMove = (event) => {
    if (!isDragging) return;
    const nextOffset = dragStartOffset.current + (event.clientY - dragStartY.current);
    setModalOffsetY(Math.min(180, Math.max(-140, nextOffset)));
  };

  const handleModalPointerUp = () => {
    setIsDragging(false);
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLikeRecipe = (recipeId) => {
    if (likedRecipes.includes(recipeId)) {
      setLikedRecipes(likedRecipes.filter(id => id !== recipeId));
      showToastMessage("❤️ Like bekor qilindi", "info");
    } else {
      setLikedRecipes([...likedRecipes, recipeId]);
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 300);
      showToastMessage("👍 Like qo'shildi!", "success");
    }
  };

  const handleSaveRecipe = (recipeId) => {
    if (savedRecipes.includes(recipeId)) {
      setSavedRecipes(savedRecipes.filter(id => id !== recipeId));
      showToastMessage("📚 Saqlanganlardan olib tashlandi", "info");
    } else {
      setSavedRecipes([...savedRecipes, recipeId]);
      showToastMessage("🔖 Saqlanganlarga qo'shildi!", "success");
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      showToastMessage("Iltimos, comment yozing", "error");
      return;
    }

    const comment = {
      id: Date.now(),
      text: newComment,
      author: "Siz",
      date: new Date().toISOString(),
      avatar: "https://ui-avatars.com/api/?name=Siz&background=FF4545&color=fff"
    };

    setComments(prev => ({
      ...prev,
      [activeRecipe.id]: [...(prev[activeRecipe.id] || []), comment]
    }));
    
    setNewComment("");
    showToastMessage("💬 Comment qo'shildi", "success");
  };

  const handleShareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: activeRecipe.title,
        text: activeRecipe.summary,
        url: window.location.href,
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${activeRecipe.title}\n${activeRecipe.summary}\n\n${t("ingredients")}: ${activeRecipe.ingredients.join(", ")}\n\n${t("method")}: ${activeRecipe.method}\n\n🔥 ${t("shareVia")} Recipes App!`);
    showToastMessage("📋 Resept nusxalandi!", "success");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Bugun";
    if (diffDays === 1) return "Kecha";
    if (diffDays < 7) return `${diffDays} kun oldin`;
    return date.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    if (activeRecipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (activeRecipe) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [activeRecipe]);

  // Filter recipes based on search query
  const filteredRecipes = RECIPES[activeTab].filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Translation helper for difficulty
  const getDifficultyText = (difficulty) => {
    const difficultyMap = {
      "Легко": t("easy"),
      "Средне": t("medium"),
      "Сложно": t("hard")
    };
    return difficultyMap[difficulty] || difficulty;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50  to-slate-100 text-slate-900">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-fadeInScale">
          <div className={`${toastType === 'success' ? 'bg-green-500' : toastType === 'error' ? 'bg-red-500' : 'bg-gray-800'} text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2`}>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="animate-fadeInUp rounded-[32px] border border-slate-200  p-5 shadow-lg backdrop-blur-sm sm:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-12 animate-slideInRight">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl text-black">
                  {t("recipes")}
                </h1>
                <p className="mt-3 text-sm text-slate-500 uppercase tracking-widest">
                  {t("selectCategory")}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 rounded-full bg-slate-100 p-1.5 ring-1 ring-slate-200">
                {TABS.map((tab, idx) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      setSearchQuery("");
                    }}
                    style={{
                      animation: `slideInRight 0.6s ease-out ${0.1 * idx}s backwards`,
                    }}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${activeTab === tab
                      ? "bg-white text-slate-900 shadow-md ring-2 ring-blue-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                  >
                    {activeTab === tab && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm" />
                    )}
                    <span className="relative">{t(tab.toLowerCase())}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Info */}
          <div className="mb-10 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-slate-900">{t(activeTab.toLowerCase())}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">
              {t("categoryDescription")}
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>

          {/* Search Bar */}
          <div className="mb-8 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <input
                type="text"
                placeholder={`${t("searchIn")} ${t(activeTab.toLowerCase())} ${t("search")}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-full border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <svg
                className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-slate-600">
                {t("found")}: <span className="font-semibold text-blue-600">{filteredRecipes.length}</span> {t("recipesFound")}
              </p>
            )}
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="recipe-card group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Like and Save badges on card */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikeRecipe(recipe.id);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition-all"
                      >
                        {likedRecipes.includes(recipe.id) ? (
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveRecipe(recipe.id);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-blue-50 transition-all"
                      >
                        {savedRecipes.includes(recipe.id) ? (
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {recipe.summary}
                    </p>

                    {/* Quick Info */}
                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        ⏱️ {recipe.details.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        🔥 {recipe.details.calories}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveRecipe(recipe)}
                      className="mt-5 w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-600 active:scale-95 group-hover:gap-2"
                    >
                      {t("moreDetails")}
                      <span className="text-lg">→</span>
                    </button>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer-effect pointer-events-none" />
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300">
              <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold text-slate-700">{t("noRecipesFound")}</p>
              <p className="mt-2 text-sm text-slate-600">{t("noRecipesMessage")} "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                {t("clearSearch")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeRecipe ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-6xl overflow-y-auto max-h-[90vh] rounded-[38px] border border-white/30 bg-white/95 shadow-[0_45px_130px_rgba(15,23,42,0.28)] backdrop-blur-xl modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: `translateY(${modalOffsetY}px)` }}
          >
            {/* Modal Header with drag handle */}
            <div
              className="sticky top-0 z-10 border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-6 py-4 sm:px-8 cursor-grab active:cursor-grabbing"
              onPointerDown={handleModalPointerDown}
              onPointerMove={handleModalPointerMove}
              onPointerUp={handleModalPointerUp}
              onPointerCancel={handleModalPointerUp}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                    {t("category")}: {t(activeTab.toLowerCase())}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {activeRecipe.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {activeRecipe.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-500 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content - Compact layout */}
            <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-2">
              {/* Left Column - Image & Stats */}
              <div className="space-y-4">
                {/* Image */}
                <div className="relative overflow-hidden rounded-[24px] bg-slate-100 shadow-inner shadow-slate-200/60">
                  <img
                    src={activeRecipe.image}
                    alt={activeRecipe.title}
                    className="h-full w-full min-h-[280px] object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {t("bestIdeaFor")} {t(activeTab.toLowerCase())}
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {activeRecipe.details.time} • {activeRecipe.details.calories}
                    </p>
                  </div>
                </div>

                {/* Stats in smaller grid */}
                <div className="grid gap-3 grid-cols-2">
                  {[
                    { label: t("time"), value: activeRecipe.details.time, icon: "⏱️" },
                    { label: t("calories"), value: activeRecipe.details.calories, icon: "🔥" },
                    { label: t("difficulty"), value: getDifficultyText(activeRecipe.details.difficulty), icon: "⭐" },
                    { label: t("servings"), value: activeRecipe.details.servings, icon: "🍽️" }
                  ].map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="rounded-[20px] bg-slate-50 p-3 text-slate-700 shadow-sm ring-1 ring-slate-200/60"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {stat.icon} {stat.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons - Like, Save, Share */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleLikeRecipe(activeRecipe.id)}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition-all ${likedRecipes.includes(activeRecipe.id)
                      ? "bg-red-500 text-white shadow-lg shadow-red-200"
                      : "bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-600"
                    }`}
                  >
                    {likedRecipes.includes(activeRecipe.id) ? (
                      <>
                        <svg className={`w-5 h-5 ${animateHeart ? 'heart-beat' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>{t("liked")}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span>{t("like")}</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSaveRecipe(activeRecipe.id)}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition-all ${savedRecipes.includes(activeRecipe.id)
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                  >
                    {savedRecipes.includes(activeRecipe.id) ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <span>{t("saved")}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z"/>
                        </svg>
                        <span>{t("save")}</span>
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold bg-slate-100 text-slate-700 hover:bg-green-100 hover:text-green-600 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                      </svg>
                    </button>
                    {showShareMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 min-w-[180px]">
                        <button
                          onClick={handleShareRecipe}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                          </svg>
                          Ulashish
                        </button>
                        <button
                          onClick={copyToClipboard}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                          </svg>
                          Nusxalash
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Ingredients & Method (Compact) */}
              <div className="space-y-4">
                {/* Ingredients */}
                <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                      📝 {t("ingredients")}
                    </h4>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {activeRecipe.ingredients.length} {t("items")}
                    </span>
                  </div>
                  <ul className="grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                    {activeRecipe.ingredients.map((item) => (
                      <li key={item} className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs">
                          ✓
                        </span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Method */}
                <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-3">
                    👨‍🍳 {t("method")}
                  </h4>
                  <p className="rounded-[20px] border border-slate-200/80 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    {activeRecipe.method}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                      💬 {t("comments")} ({comments[activeRecipe.id]?.length || 0})
                    </h4>
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-2 mb-4">
                    <img
                      src="https://ui-avatars.com/api/?name=Siz&background=FF4545&color=fff"
                      className="w-8 h-8 rounded-full"
                      alt="User"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder={t("writeComment")}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        className="flex-1 px-3 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleAddComment}
                        className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition"
                      >
                        {t("send")}
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {comments[activeRecipe.id]?.map((comment) => (
                      <div key={comment.id} className="flex gap-2">
                        <img src={comment.avatar} className="w-7 h-7 rounded-full" alt="" />
                        <div className="flex-1">
                          <div className="bg-slate-50 rounded-2xl p-2">
                            <p className="font-semibold text-xs text-slate-700">{comment.author}</p>
                            <p className="text-sm text-slate-600 mt-0.5">{comment.text}</p>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 ml-1">{formatDate(comment.date)}</p>
                        </div>
                      </div>
                    ))}
                    {(!comments[activeRecipe.id] || comments[activeRecipe.id].length === 0) && (
                      <p className="text-center text-slate-500 text-sm py-6">
                        {t("noComments")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex flex-col gap-2 border-t border-slate-200/80 bg-slate-50 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="text-xs text-slate-600">
                🍳 {t("cookWithPleasure")}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-slate-300 bg-white px-8 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};

export default Recipes2;