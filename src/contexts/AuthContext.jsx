import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
// Временно отключаем Firestore
// import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Регистрация с email и паролем
  const signUp = async (email, password, userData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Обновляем профиль пользователя
      await updateProfile(user, {
        displayName: userData.displayName
      });

      // Создаем профиль в Firestore
      await createUserProfile(user.uid, {
        email: user.email,
        displayName: userData.displayName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user',
        isVerified: false,
        ratings: {
          average: 0,
          count: 0
        },
        stats: {
          totalListings: 0,
          totalSales: 0,
          totalPurchases: 0
        }
      });

      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Вход с email и паролем
  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Вход через Google (временно без Firestore)
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Проверяем localStorage вместо Firestore
      const existingProfile = localStorage.getItem(`user-profile-${user.uid}`);
      if (!existingProfile) {
        // Создаем профиль для нового пользователя Google
        await createUserProfile(user.uid, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: 'google',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user',
          isVerified: true,
          ratings: {
            average: 0,
            count: 0
          },
          stats: {
            totalListings: 0,
            totalSales: 0,
            totalPurchases: 0
          }
        });
      }

      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Apple аутентификация временно отключена
  // const signInWithApple = async () => { ... };

  // Создание профиля пользователя (временно без Firestore)
  const createUserProfile = async (uid, userData) => {
    try {
      // Сохраняем в localStorage вместо Firestore
      const profile = {
        uid,
        ...userData
      };
      localStorage.setItem(`user-profile-${uid}`, JSON.stringify(profile));
      setUserProfile(profile);
      console.log('User profile created successfully (localStorage)');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Загрузка профиля пользователя (временно из localStorage)
  const loadUserProfile = async (uid) => {
    try {
      const profileData = localStorage.getItem(`user-profile-${uid}`);
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Обновление профиля пользователя (временно localStorage)
  const updateUserProfile = async (uid, updateData) => {
    try {
      const currentProfile = JSON.parse(localStorage.getItem(`user-profile-${uid}`) || '{}');
      const updatedProfile = {
        ...currentProfile,
        ...updateData,
        updatedAt: new Date()
      };
      
      localStorage.setItem(`user-profile-${uid}`, JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Выход
  const logout = async () => {
    try {
      setUserProfile(null);
      return await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Отслеживание изменений аутентификации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signUp,
    signIn,
    signInWithGoogle,
    // signInWithApple, // временно отключен
    logout,
    loading,
    updateUserProfile,
    createUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
