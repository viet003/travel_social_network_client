import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authAction } from '../stores/actions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn, msg } = useSelector(state => state.auth);

  // Kiểm tra token từ localStorage khi component mount
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && !token) {
      // Nếu có token trong localStorage nhưng không có trong Redux state
      dispatch(authAction.checkAuthStatus());
    }
  }, [dispatch, token]);

  const login = (credentials) => {
    return dispatch(authAction.login(credentials));
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(authAction.logout());
  };

  const isAuthenticated = () => {
    const localToken = localStorage.getItem('token');
    return (token || localToken) && isLoggedIn;
  };

  return {
    token,
    isLoggedIn,
    msg,
    login,
    logout,
    isAuthenticated: isAuthenticated(),
  };
}; 