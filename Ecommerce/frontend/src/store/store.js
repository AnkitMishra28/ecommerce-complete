import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import authReducer from '../redux/authSlice';

// Load initial auth state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userInfo');
    if (serializedState === null) {
      return undefined;
    }
    const userInfo = JSON.parse(serializedState);
    return {
      auth: {
        user: userInfo,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    };
  } catch (err) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer
  },
  preloadedState: loadState()
});
