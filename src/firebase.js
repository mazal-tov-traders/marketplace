import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase конфигурация - test-react-proj-be25a
const firebaseConfig = {
  apiKey: "AIzaSyDvXPLIWPhZlaJKBqAUC7Szg7HrE6WUDnE",
  authDomain: "test-react-proj-be25a.firebaseapp.com",
  projectId: "test-react-proj-be25a",
  storageBucket: "test-react-proj-be25a.firebasestorage.app",
  messagingSenderId: "358323967110",
  appId: "1:358323967110:web:587b6bb2a0e3b84fcc2d07"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Настройка провайдеров аутентификации
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Apple провайдер временно отключен
// export const appleProvider = new OAuthProvider('apple.com');
// appleProvider.addScope('email');
// appleProvider.addScope('name');

// Экспорт сервисов
export const auth = getAuth(app);

export default app;
