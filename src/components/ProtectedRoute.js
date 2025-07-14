import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pathDomain } from '../utilities/pathDomain';
import { LoadingSpinner } from './index';

const ProtectedRoute = ({ children, requireAuth = true, redirectToLanding = false, redirectTo }) => {
  const { token, isLoggedIn } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(false);
  }, [token, isLoggedIn]);

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Catch-all: chuyển hướng về home hoặc landing tuỳ trạng thái
  if (redirectToLanding) {
    if (isLoggedIn) {
      if (location.pathname === pathDomain.HOME) return children;
      return <Navigate to={pathDomain.HOME} replace />;
    } else {
      if (location.pathname === pathDomain.LANDING) return children;
      return <Navigate to={pathDomain.LANDING} replace />;
    }
  }

  // Nếu route yêu cầu đăng nhập nhưng chưa đăng nhập
  if (requireAuth && !isLoggedIn) {
    if (location.pathname === pathDomain.LANDING) return <>{children}</>;
    return <Navigate to={pathDomain.LANDING} replace />;
  }

  // Nếu route chỉ dành cho guest nhưng đã đăng nhập
  if (!requireAuth && isLoggedIn) {
    if (location.pathname === pathDomain.HOME) return <>{children}</>;
    return <Navigate to={redirectTo || pathDomain.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute; 