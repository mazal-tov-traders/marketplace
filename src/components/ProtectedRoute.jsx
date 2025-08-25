import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-route">
        <div className="protected-route__loading">
          <div className="protected-route__spinner"></div>
          <p className="protected-route__loading-text">Загрузка...</p>
        </div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

