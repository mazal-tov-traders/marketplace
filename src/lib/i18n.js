import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        products: 'CREATE AD',
        cart: 'Cart',
        back: 'BACK',
        backUa: 'Назад',
        createAd: 'CREATE AD',
        profile: 'PROFILE',
        favorites: 'FAVORITES',
        contacts: 'CONTACTS'
      },
      hero: {
        title: 'Welcome to Marketplace',
        subtitle: 'Discover amazing products at great prices',
        sellButton: 'Sell Your Product',
        browseButton: 'Browse Products'
      },
      product: {
        addToCart: 'Add to Cart',
        reviews: 'reviews',
        buyButton: 'BUY',
        types: {
          static: 'STATIC CREATIVES',
          dynamic: 'DYNAMIC CREATIVES',
          video: 'VIDEO CREATIVES'
        },
        subtypes: {
          single: 'Single Banner',
          pack: 'Banner Pack',
          collection: 'Banner Collection'
        }
      },
      products: {
        title: 'All Products',
        empty: 'No products found',
        emptyDescription: 'Try changing your search query or category',
        createFirst: 'Or create the first product!',
        searchResults: 'Search results for'
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        emptyDescription: 'Start shopping to add items to your cart',
        continueShopping: 'Continue Shopping',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        free: 'Free',
        total: 'Total',
        checkout: 'Checkout',
        clearCart: 'Clear Cart'
      },
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'Enter your email',
        passwordPlaceholder: 'Enter your password',
        noAccount: "Don't have an account? Sign up",
        haveAccount: 'Already have an account? Sign in'
      },
             footer: {
         description: 'Your trusted marketplace for quality products',
         quickLinks: 'Quick Links',
         support: 'Support',
         helpCenter: 'Help Center',
         faq: 'FAQ',
         contact: 'Contact',
         rights: 'All rights reserved.',
         contactUs: 'CONTACT US',
         withUs: 'WITH US',
         privacy: 'Privacy',
         policy: 'Policy',
         about: 'About'
       },
             pages: {
         addProduct: 'Add New Product',
         createAnnouncement: 'CREATE ANNOUNCEMENT',
         profile: 'Profile',
         favorites: 'Favorites',
         contacts: 'Contact Us',
         backToHome: 'Back to Home',
         backToProducts: 'Back to Products',
         privacy: 'Privacy Policy',
         policy: 'Terms & Conditions',
         faq: 'Frequently Asked Questions',
         helpCenter: 'Help Center',
         about: 'About Us'
       },
      categories: {
        all: "All Categories",
        electronics: "Electronics",
        fashion: "Fashion",
        home: "Home & Garden",
        sports: "Sports & Outdoors",
        books: "Books & Media",
        other: "Other"
      },
      navigation: {
        categories: "CATEGORIES",
        allAds: "ALL ADS",
        myAds: "MY ADS",
        reviews: "REVIEWS ON YOUR PRODUCT",
        purchased: "PURCHASED PRODUCTS",
        payment: "PAYMENT/SUBSCRIPTION",
        chats: "CHATS",
        searchPlaceholder: "Search..."
      },
      form: {
        describeInDetail: "DESCRIBE IN DETAIL",
        enterName: "Enter name*",
        namePlaceholder: "Enter announcement name",
        category: "Category*",
        selectCategory: "CATEGORY",
        subcategory: "Subcategory",
        photoVideo: "PHOTO/VIDEO",
        photoInstructions: "The first photo will be on the announcement cover. Drag to change photo order",
        addFiles: "Add files",
        description: "DESCRIPTION",
        descriptionPlaceholder: "Describe your product in detail",
        descriptionMinLength: "Enter at least 40 characters",
       
        enterPrice: "Enter price*",
        negotiablePrice: "Negotiable price",
        autoRenewal: "AUTO-RENEWAL",
        autoRenewalInfo: "The announcement will be deactivated in 30 days",
        preview: "PREVIEW",
        publish: "PUBLISH",
        publishing: "Publishing..."
      },
      validation: {
        nameMinLength: "Enter at least 16 characters",
        categoryRequired: "Select a category",
        descriptionMinLength: "Enter at least 40 characters",
        priceRequired: "Enter price or select negotiable",
        filesRequired: "Add at least one photo/video"
      },
      success: {
        productCreated: "Announcement created successfully!"
      },
               error: {
           productCreation: "Error creating announcement"
         },
         privacy: {
           title: "Privacy Policy",
           description: "This page is under construction. Privacy policy content will be added soon."
         },
         policy: {
           title: "Terms & Conditions",
           description: "This page is under construction. Terms and conditions content will be added soon."
         },
         faq: {
           title: "Frequently Asked Questions",
           description: "This page is under construction. FAQ content will be added soon."
         },
         helpCenter: {
           title: "Help Center",
           description: "This page is under construction. Help center content will be added soon."
         },
         about: {
           title: "About Us",
           description: "This page is under construction. About us content will be added soon."
         },
         auth: {
           signup: {
             title: "Sign Up"
           },
           signin: {
             title: "Sign In"
           },
           firstName: "First Name",
           lastName: "Last Name",
           email: "Email",
           phone: "Phone",
           password: "Password",
           confirmPassword: "Confirm Password",
           signUp: "Sign Up",
           signIn: "Sign In",
           signingUp: "Signing Up...",
           signingIn: "Signing In...",
           continueWithGoogle: "Continue with Google",
           signInWithGoogle: "Sign In with Google",
           continueWithApple: "Continue with Apple",
           signInWithApple: "Sign In with Apple",
           or: "Or",
           alreadyHaveAccount: "Already have an account?",
           noAccount: "Don't have an account?",
           logout: "Logout",
           success: {
             signUpComplete: "Registration successful! Welcome!",
             signInComplete: "Welcome back!"
           },
           welcomeBack: "Welcome back!",
           signInToAccount: "Sign in to your account",
           errors: {
             firstNameRequired: "First name is required",
             emailRequired: "Email is required",
             emailInvalid: "Invalid email format",
             passwordRequired: "Password is required",
             passwordTooShort: "Password must be at least 6 characters",
             passwordsNotMatch: "Passwords do not match",
             invalidCredentials: "Invalid email or password",
             userNotFound: "User not found",
             wrongPassword: "Wrong password",
             invalidEmail: "Invalid email format",
             userDisabled: "Account is disabled"
           }
         },
             categories: {
         applications: "Applications",
         igamingCreatives: "Creatives for iGaming",
         builders: "Builders",
         whiteLandings: "White Landings",
         directLandings: "Direct Landing Pages",
         vacancies: "Vacancies",
         merch: "Merch",
         stand: "Stand",
         accounts: "Accounts",
         articles: "Articles",
         "3d": "3D",
         test1: "Test1",
         test2: "Test2",
         staticCreatives: "Static Creatives",
         videoCreatives: "Video Creatives",
         hostess: "Hostess",
         merchDevelopment: "Merch Development",
         standDevelopment: "Stand Development"
       }
    }
  },
  ua: {
    translation: {
      nav: {
        home: 'Головна',
        products: 'СТВОРИТИ ОГОЛОШЕННЯ',
        cart: 'Кошик',
        back: 'НАЗАД',
        createAd: 'СТВОРИТИ ОГОЛОШЕННЯ',
        profile: 'ПРОФІЛЬ',
        favorites: 'УЛЮБЛЕНІ',
        contacts: 'КОНТАКТИ'
      },
      hero: {
        title: 'Ласкаво просимо до Маркетплейсу',
        subtitle: 'Відкрийте дивовижні товари за чудовими цінами',
        sellButton: 'Продати Товар',
        browseButton: 'Переглянути Товари'
      },
      product: {
        addToCart: 'Додати в Кошик',
        reviews: 'відгуків',
        buyButton: 'ПРИДБАТИ',
        types: {
          static: 'СТАТИЧНІ КРЕАТИВИ',
          dynamic: 'ДИНАМІЧНІ КРЕАТИВИ',
          video: 'ВІДЕО КРЕАТИВИ'
        },
        subtypes: {
          single: 'Поодинокий банер',
          pack: 'Пакет банерів',
          collection: 'Колекція банерів'
        }
      },
      products: {
        title: 'Всі товари',
        empty: 'Товари не знайдено',
        emptyDescription: 'Спробуйте змінити пошуковий запит або категорію',
        createFirst: 'Або створіть перший товар!',
        searchResults: 'Результати пошуку для'
      },
      cart: {
        title: 'Кошик Покупок',
        empty: 'Ваш кошик порожній',
        emptyDescription: 'Почніть покупки, щоб додати товари в кошик',
        continueShopping: 'Продовжити Покупки',
        orderSummary: 'Підсумок Замовлення',
        subtotal: 'Проміжний Підсумок',
        shipping: 'Доставка',
        free: 'Безкоштовно',
        total: 'Загалом',
        checkout: 'Оформити Замовлення',
        clearCart: 'Очистити Кошик'
      },
      auth: {
        signIn: 'Увійти',
        signUp: 'Зареєструватися',
        name: 'Ім\'я',
        email: 'Електронна пошта',
        password: 'Пароль',
        namePlaceholder: 'Введіть ваше ім\'я',
        emailPlaceholder: 'Введіть вашу електронну пошту',
        passwordPlaceholder: 'Введіть ваш пароль',
        noAccount: 'Немає облікового запису? Зареєструйтеся',
        haveAccount: 'Вже є обліковий запис? Увійдіть'
      },
               footer: {
           description: 'Ваш надійний маркетплейс для якісних товарів',
           quickLinks: 'Швидкі Посилання',
           support: 'Підтримка',
           helpCenter: 'Центр Допомоги',
           faq: 'Часті Питання',
           contact: 'Контакти',
           rights: 'Всі права захищені.',
           contactUs: 'ЗВ\'ЯЗАТИСЬ',
           withUs: 'З НАМИ',
           privacy: 'Конфіденційність',
           policy: 'Умови',
           about: 'Про нас'
         },
               pages: {
           addProduct: 'Додати Новий Продукт',
           createAnnouncement: 'СТВОРИТИ ОГОЛОШЕННЯ',
           profile: 'Профіль',
           favorites: 'Улюблені',
           contacts: 'Зв\'язатися з Нами',
           backToHome: 'Повернутися на Головну',
           backToProducts: 'Повернутися до Продуктів',
           privacy: 'Політика Конфіденційності',
           policy: 'Умови та Положення',
           faq: 'Часті Питання',
           helpCenter: 'Центр Допомоги',
           about: 'Про Нас'
         },
               categories: {
           all: "Всі Категорії",
           electronics: "Електроніка",
           fashion: "Мода",
           home: "Головна та Сад",
           sports: "Спорт та Відпочинок",
           books: "Книги та Медіа",
           other: "Інше",
           applications: "ЗАСТОСУНКИ",
           igamingCreatives: "КРЕАТИВИ ДЛЯ IGAMING",
           builders: "БІЛДЕРИ",
           whiteLandings: "White Landings",
           directLandings: "Прямі Landing Pages",
           vacancies: "Вакансії",
           merch: "Мерч",
           stand: "Стенд",
           accounts: "Аккаунти",
           articles: "Статті",
           "3d": "3D",
           test1: "Тест1",
           test2: "Тест2",
           staticCreatives: "Статичні креативи",
           videoCreatives: "Відео-креативи",
           hostess: "Хостес",
           merchDevelopment: "Розробка мерча",
           standDevelopment: "Розробка стендів"
         },
      navigation: {
        categories: "КАТЕГОРІЇ",
        allAds: "УСІ ОГОЛОШЕННЯ",
        myAds: "МОЇ ОГОЛОШЕННЯ",
        reviews: "ВІДГУКИ НА ВАШ ПРОДУКТ",
        purchased: "ПРИДБАНІ ПРОДУКТИ",
        payment: "ОПЛАТА/ПІДПИСКА",
        chats: "ЧАТИ",
        searchPlaceholder: "Пошук..."
      },
      form: {
        describeInDetail: "ОПИШІТЬ У ПОДРОБИЦЯХ",
        enterName: "Вкажіть назву*",
        namePlaceholder: "Введіть назву оголошення",
        category: "Категорія*",
        selectCategory: "КАТЕГОРІЯ",
        subcategory: "Підкатегорія",
        photoVideo: "ФОТО/ВІДЕО",
        photoInstructions: "Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити порядок фото",
        addFiles: "Додати файли",
        description: "ОПИС",
        descriptionPlaceholder: "Опишіть ваш продукт детально",
        descriptionMinLength: "Введіть щонайменше 40 символів",
        price: "Ціна",
        enterPrice: "Вкажіть ціну*",
        negotiablePrice: "Ціна договірна",
        negotiableNote: "Ціна вказується для орієнтації, можна торгуватися",
        autoRenewal: "АВТОПРОДОВЖЕННЯ",
        autoRenewalInfo: "Оголошення буде деактивовано через 30 днів",
        preview: "ПОПЕРЕДНІЙ ПЕРЕГЛЯД",
        publish: "ОПУБЛІКУВАТИ",
        publishing: "Публікація..."
      },
      validation: {
        nameMinLength: "Введіть щонайменше 16 символів",
        categoryRequired: "Оберіть категорію",
        descriptionMinLength: "Введіть щонайменше 40 символів",
        priceRequired: "Вкажіть ціну або оберіть договірну",
        filesRequired: "Додайте хоча б одне фото/відео"
      },
      success: {
        productCreated: "Оголошення створено успішно!"
      },
               error: {
           productCreation: "Помилка створення оголошення"
         },
         privacy: {
           title: "Політика Конфіденційності",
           description: "Ця сторінка знаходиться в розробці. Зміст політики конфіденційності буде додано найближчим часом."
         },
         policy: {
           title: "Умови та Положення",
           description: "Ця сторінка знаходиться в розробці. Зміст умов та положень буде додано найближчим часом."
         },
         faq: {
           title: "Часті Питання",
           description: "Ця сторінка знаходиться в розробці. Зміст FAQ буде додано найближчим часом."
         },
         helpCenter: {
           title: "Центр Допомоги",
           description: "Ця сторінка знаходиться в розробці. Зміст центру допомоги буде додано найближчим часом."
         },
         about: {
           title: "Про Нас",
           description: "Ця сторінка знаходиться в розробці. Зміст про нас буде додано найближчим часом."
         },
         auth: {
           signup: {
             title: "Реєстрація"
           },
           signin: {
             title: "Вхід"
           },
           firstName: "Ім'я",
           lastName: "Прізвище",
           email: "Email",
           phone: "Телефон",
           password: "Пароль",
           confirmPassword: "Підтвердити пароль",
           signUp: "Зареєструватися",
           signIn: "Увійти",
           signingUp: "Реєстрація...",
           signingIn: "Вхід...",
           continueWithGoogle: "Продовжити з Google",
           signInWithGoogle: "Увійти через Google",
           continueWithApple: "Продовжити з Apple",
           signInWithApple: "Увійти через Apple",
           or: "Або",
           alreadyHaveAccount: "Вже є аккаунт?",
           noAccount: "Немає аккаунту?",
           logout: "Вийти",
           success: {
             signUpComplete: "Реєстрація успішна! Ласкаво просимо!",
             signInComplete: "З поверненням!"
           },
           welcomeBack: "З поверненням!",
           signInToAccount: "Увійдіть до свого акаунту",
           errors: {
             firstNameRequired: "Ім'я обов'язкове",
             emailRequired: "Email обов'язковий",
             emailInvalid: "Неправильний формат email",
             passwordRequired: "Пароль обов'язковий",
             passwordTooShort: "Пароль повинен бути не менше 6 символів",
             passwordsNotMatch: "Паролі не збігаються",
             invalidCredentials: "Неправильний email або пароль",
             userNotFound: "Користувач не знайдений",
             wrongPassword: "Неправильний пароль",
             invalidEmail: "Неправильний формат email",
             userDisabled: "Аккаунт заблокований"
           }
         }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('marketplace-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
