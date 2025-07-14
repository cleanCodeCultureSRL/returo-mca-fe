'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { checkAuthStatus } from '../../store/slices/authSlice';

export default function AuthStatus() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for existing authentication when app starts
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Return null so this component doesn't render anything
  // It's just for running the auth check side effect
  return null;
} 