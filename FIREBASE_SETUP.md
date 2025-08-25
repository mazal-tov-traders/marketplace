# 🔥 Firebase Setup Guide

## 📋 Пошаговая настройка Firebase для проекта HOLY TRAFF MARKET

### 1️⃣ **Создание проекта Firebase**

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Add project" (Добавить проект)
3. Введите название проекта: `holy-traff-market`
4. Отключите Google Analytics (опционально)
5. Создайте проект

### 2️⃣ **Настройка Authentication**

1. В боковом меню выберите **Authentication**
2. Перейдите на вкладку **Sign-in method**
3. Включите следующие провайдеры:
   - ✅ **Email/Password** - для регистрации по email
   - ✅ **Google** - для входа через Google
   - ✅ **Apple** - для входа через Apple (требует дополнительной настройки)

#### Настройка Google Sign-In:
1. Нажмите на Google провайдер
2. Включите его
3. Укажите support email
4. Сохраните

#### Настройка Apple Sign-In:
1. Нажмите на Apple провайдер
2. Включите его
3. Потребуется Apple Developer Account
4. Следуйте инструкциям в консоли Firebase

### 3️⃣ **Настройка Firestore Database**

1. В боковом меню выберите **Firestore Database**
2. Нажмите **Create database**
3. Выберите **Start in test mode** (для разработки)
4. Выберите регион (europe-west1 для Европы)
5. Создайте базу данных

#### Правила безопасности Firestore (для разработки):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи могут читать и редактировать только свои профили
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Другие могут читать профили
    }
    
    // Продукты
    match /listings/{listingId} {
      allow read: if true; // Все могут читать продукты
      allow create: if request.auth != null && 
                   request.resource.data.ownerId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                           resource.data.ownerId == request.auth.uid;
    }
    
    // Чаты и сообщения
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
                        request.auth.uid in resource.data.participants;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null && 
                          request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
      }
    }
    
    // Избранное
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
                        request.resource.data.userId == request.auth.uid;
    }
    
    // Отзывы
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null && 
                   request.resource.data.reviewerId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                           resource.data.reviewerId == request.auth.uid;
    }
  }
}
```

### 4️⃣ **Настройка Storage**

1. В боковом меню выберите **Storage**
2. Нажмите **Get started**
3. Выберите **Start in test mode**
4. Выберите тот же регион, что и для Firestore
5. Создайте хранилище

#### Правила безопасности Storage:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Изображения продуктов
    match /listings/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Аватары пользователей
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5️⃣ **Получение конфигурации**

1. В боковом меню выберите **Project settings** (⚙️)
2. Прокрутите вниз до раздела **Your apps**
3. Нажмите на иконку **Web** (`</>`)
4. Зарегистрируйте приложение с названием `holy-traff-market-web`
5. Скопируйте конфигурацию

### 6️⃣ **Обновление firebase.js**

Замените конфигурацию в файле `src/firebase.js`:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
\`\`\`

### 7️⃣ **Установка зависимостей**

Зависимость Firebase уже добавлена в `package.json`. Выполните:

\`\`\`bash
npm install
\`\`\`

## 🗄️ **Структура данных Firestore**

### 👤 **Коллекция users**
```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+380123456789",
  photoURL: "https://...",
  provider: "email|google|apple",
  createdAt: timestamp,
  updatedAt: timestamp,
  role: "user|admin",
  isVerified: true,
  ratings: {
    average: 4.5,
    count: 10
  },
  stats: {
    totalListings: 5,
    totalSales: 3,
    totalPurchases: 7
  }
}
```

### 🛍️ **Коллекция listings**
```javascript
{
  title: "iPhone 14 Pro",
  description: "Excellent condition...",
  price: 999,
  currency: "USD",
  negotiablePrice: false,
  category: "electronics",
  subcategory: "smartphones",
  condition: "like-new",
  images: ["https://...", "https://..."],
  location: {
    city: "Kyiv",
    region: "Kyiv Oblast",
    coordinates: geopoint
  },
  ownerId: "user123",
  ownerName: "John Doe",
  ownerPhoto: "https://...",
  status: "active|sold|inactive",
  createdAt: timestamp,
  updatedAt: timestamp,
  views: 150,
  favorites: 12,
  tags: ["iphone", "apple", "smartphone"],
  autoRenewal: false
}
```

### ⭐ **Коллекция reviews**
```javascript
{
  listingId: "listing123",
  reviewerId: "user456",
  reviewerName: "Jane Smith",
  reviewerPhoto: "https://...",
  targetUserId: "user123",
  rating: 5,
  comment: "Great seller!",
  createdAt: timestamp,
  isVerified: true
}
```

### 💬 **Коллекция chats**
```javascript
{
  participants: ["user123", "user456"],
  listingId: "listing123",
  lastMessage: "Is it still available?",
  lastMessageTime: timestamp,
  unreadCount: {
    "user123": 0,
    "user456": 2
  }
}
```

### 💬 **Подколлекция messages**
```javascript
// chats/{chatId}/messages/{messageId}
{
  senderId: "user123",
  receiverId: "user456",
  message: "Hello, is this item still available?",
  timestamp: timestamp,
  read: false,
  type: "text|image|offer"
}
```

### ❤️ **Коллекция favorites**
```javascript
{
  userId: "user123",
  listingId: "listing456",
  createdAt: timestamp
}
```

## 🚀 **Запуск проекта**

1. Обновите конфигурацию Firebase в `src/firebase.js`
2. Установите зависимости: `npm install`
3. Запустите проект: `npm run dev`

## 🔐 **Безопасность**

⚠️ **Важно**: Правила выше предназначены для разработки. Для продакшна:

1. Ужесточите правила доступа
2. Добавьте валидацию данных
3. Ограничьте размер файлов
4. Добавьте rate limiting
5. Настройте мониторинг

## 📱 **Тестирование аутентификации**

После настройки вы сможете:
- ✅ Регистрироваться по email/паролю
- ✅ Входить через Google
- ✅ Входить через Apple
- ✅ Создавать защищенные маршруты
- ✅ Сохранять данные пользователей в Firestore

## 🆘 **Поддержка**

Если возникли проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все провайдеры включены в Firebase Console
3. Проверьте правильность конфигурации в `firebase.js`
4. Для Apple Sign-In требуется HTTPS (в продакшне)

