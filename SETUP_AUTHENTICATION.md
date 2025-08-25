# 🔐 Настройка Authentication для test-react-proj-be25a

## ✅ Статус конфигурации
- ✅ **Firebase ключи обновлены** - используется ваш проект `test-react-proj-be25a`
- ⏳ **Требуется настройка Authentication** в Firebase Console

## 🚀 Пошаговая настройка

### 1️⃣ Откройте Firebase Console
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Выберите проект **"test-react-proj"**

### 2️⃣ Включите Authentication
1. В левом меню нажмите **"Authentication"**
2. Если видите кнопку "Get started" - нажмите её
3. Перейдите на вкладку **"Sign-in method"**

### 3️⃣ Включите Email/Password
1. Найдите **"Email/Password"** в списке провайдеров
2. Нажмите на него
3. Включите переключатель **"Enable"**
4. Нажмите **"Save"**

### 4️⃣ Добавьте разрешенные домены
1. В Authentication перейдите в **"Settings"**
2. Найдите раздел **"Authorized domains"**
3. Убедитесь, что добавлены:
   - `localhost` ✅
   - `127.0.0.1` ✅
4. Если их нет - добавьте через **"Add domain"**

### 5️⃣ (Опционально) Включите Google Sign-In
1. В "Sign-in method" найдите **"Google"**
2. Нажмите на него
3. Включите переключатель **"Enable"**
4. Укажите **Project support email** (ваш email)
5. Нажмите **"Save"**

## 🧪 Тестирование

После настройки:

1. **Откройте** http://localhost:8081/
2. **Перейдите** на страницу регистрации
3. **Попробуйте** зарегистрироваться с email
4. **Проверьте** что нет ошибок в консоли браузера

## ⚠️ Возможные ошибки

### "Firebase: Error (auth/operation-not-allowed)"
- ✅ **Решение:** Включите Email/Password в Sign-in method

### "Firebase: Error (auth/unauthorized-domain)"  
- ✅ **Решение:** Добавьте localhost в Authorized domains

### Google Sign-In не работает
- ✅ **Решение:** Включите Google provider и укажите support email

## 📱 Ваш проект готов!

После выполнения этих шагов ваше приложение будет полностью работать с:
- ✅ Email/Password регистрацией и входом
- ✅ Google аутентификацией (если включили)
- ✅ Сохранением профилей пользователей

**Ссылка на ваш проект:** https://console.firebase.google.com/project/test-react-proj-be25a
