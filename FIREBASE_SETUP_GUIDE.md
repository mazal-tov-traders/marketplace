# 🔥 Инструкция по настройке Firebase

## 📋 Текущий статус
- ✅ **Email/Password аутентификация** - готова к работе после настройки ключей
- ⏸️ **Google аутентификация** - требует настройки в Firebase Console
- ❌ **Apple аутентификация** - временно отключена
- ⏸️ **Firestore** - временно отключен (используется localStorage)

## 🚀 Быстрый старт

### 1️⃣ Создание Firebase проекта
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Создать проект" или "Create a project"
3. Введите название проекта: `holy-traff-market`
4. Отключите Google Analytics (не нужен для начала)
5. Нажмите "Создать проект"

### 2️⃣ Настройка Web приложения
1. В консоли Firebase нажмите на иконку "Web" (`</>`)
2. Введите название приложения: `Holy Traff Market`
3. **НЕ ВКЛЮЧАЙТЕ** Firebase Hosting пока
4. Нажмите "Зарегистрировать приложение"
5. **СКОПИРУЙТЕ** конфигурацию Firebase

### 3️⃣ Обновление конфигурации
Замените содержимое файла `src/firebase.js`:

```javascript
// Firebase конфигурация - ЗАМЕНИТЕ НА ВАШИ КЛЮЧИ
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ваш-project-id.firebaseapp.com",
  projectId: "ваш-project-id",
  storageBucket: "ваш-project-id.appspot.com",
  messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
  appId: "ВАШ_APP_ID"
};
```

### 4️⃣ Включение Authentication
1. В Firebase Console перейдите в "Authentication"
2. Нажмите "Начать" или "Get started"
3. Перейдите на вкладку "Sign-in method"
4. Включите "Email/password" - нажмите переключатель
5. **Для Google авторизации:**
   - Включите "Google"
   - Введите email поддержки проекта
   - Нажмите "Сохранить"

### 5️⃣ Настройка домена (важно!)
1. В "Authentication" → "Settings" → "Authorized domains"
2. Добавьте ваши домены:
   - `localhost` (для разработки)
   - `127.0.0.1` (для разработки)
   - Ваш production домен

## ⚠️ Решение проблем

### "API key not valid"
- ✅ **Решение:** Проверьте правильность API ключа в `firebase.js`
- ✅ **Проверьте:** Что проект создан и Web приложение зарегистрировано

### "auth/unauthorized-domain"
- ✅ **Решение:** Добавьте `localhost` в Authorized domains
- ✅ **Путь:** Authentication → Settings → Authorized domains

### Google Sign-In не работает
- ✅ **Решение:** Включите Google provider в Authentication
- ✅ **Проверьте:** Что указан email поддержки

## 🔄 После настройки Firebase

1. **Перезапустите** dev server: `npm run dev`
2. **Протестируйте** регистрацию через email
3. **Протестируйте** вход через Google
4. **Проверьте** что нет ошибок в консоли браузера

## 📝 Следующие шаги (опционально)

### Включение Firestore (для продакшена)
1. В Firebase Console → "Firestore Database"
2. "Создать базу данных"
3. Выберите режим "Test mode" (для начала)
4. Выберите регион (europe-west1 для Европы)
5. Раскомментируйте Firestore код в `firebase.js` и `AuthContext.jsx`

### Включение Storage (для загрузки изображений)
1. В Firebase Console → "Storage"
2. "Начать"
3. Выберите режим "Test mode"
4. Раскомментируйте Storage код в `firebase.js`

## 💡 Полезные ссылки
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
