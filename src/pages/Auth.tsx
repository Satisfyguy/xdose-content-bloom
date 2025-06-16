import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {mode === 'login' ? (
        <LoginForm
          onSuccess={() => navigate('/')}
          onSwitchToSignup={() => setMode('signup')}
        />
      ) : (
        <SignupForm
          onSuccess={() => navigate('/')}
          onSwitchToLogin={() => setMode('login')}
        />
      )}
    </div>
  );
};

export default Auth;
