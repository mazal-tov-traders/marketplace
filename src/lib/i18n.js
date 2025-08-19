import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        products: 'Products',
        cart: 'Cart',
        back: 'BACK',
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
        reviews: 'reviews'
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
        withUs: 'WITH US'
      }
    }
  },
  ua: {
    translation: {
      nav: {
        home: 'Головна',
        products: 'Товари',
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
        reviews: 'відгуків'
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
        withUs: 'З НАМИ'
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
