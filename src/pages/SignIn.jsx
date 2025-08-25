import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';

const SignIn = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Очищаем ошибку для этого поля
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setErrors({});
      await signIn(formData.email, formData.password);
      alert(t('auth.success.signInComplete', 'З поверненням!'));
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      let errorMessage = t('auth.errors.invalidCredentials', 'Неверный email или пароль');
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = t('auth.errors.userNotFound', 'Пользователь не найден');
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = t('auth.errors.wrongPassword', 'Неверный пароль');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('auth.errors.invalidEmail', 'Неверный формат email');
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = t('auth.errors.userDisabled', 'Аккаунт заблокирован');
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google sign in error:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Apple вход временно отключен
  // const handleAppleSignIn = async () => { ... };

  return (
    <div className="signin">
      <Hero />
      <div className="signin__inner page-width">
        <div className="signin__container">
          <div className="signin__header">
            <h1 className="signin__title">
              {t('auth.signin.title', 'Вход')}
            </h1>
          </div>
          
          {errors.submit && (
            <div className="signin__error">
              {errors.submit}
            </div>
          )}

          {/* Социальные кнопки (работают только после настройки Firebase Console) */}
          {true && (
            <>
              <div className="signin__social">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="signin__social-btn signin__social-btn--google"
                >
                  <svg className="signin__social-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('auth.signInWithGoogle', 'Войти через Google')}
                </button>
                
                {/* Apple кнопка временно отключена */}
                {false && (
                <button
                  disabled={true}
                  className="signin__social-btn signin__social-btn--apple"
                >
                  <svg className="signin__social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.90zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                  {t('auth.signInWithApple', 'Войти через Apple')}
                </button>
                )}
              </div>

              <div className="signin__divider">
                <span className="signin__divider-text">
                  {t('auth.or', 'Или')}
                </span>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="signin__form">
            <div className="signin__form-group">
              <label className="signin__form-label">
                {t('auth.email', 'Email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="signin__form-input"
              />
            </div>

            <div className="signin__form-group">
              <label className="signin__form-label">
                {t('auth.password', 'Пароль')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="signin__form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="signin__form-submit"
            >
              {loading ? t('auth.signingIn', 'Вход...') : t('auth.signIn', 'Войти')}
            </button>
          </form>

          <p className="signin__footer">
            {t('auth.noAccount', 'Нет аккаунта?')}{' '}
            <Link to="/signup" className="signin__footer-link">
              {t('auth.signUp', 'Зарегистрироваться')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
