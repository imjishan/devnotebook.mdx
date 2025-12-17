import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (onLogin(passwordInput)) {
      setPasswordInput('');
    } else {
      setError('Access Denied: Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label
          htmlFor="admin-password"
          className="text-sm font-mono text-gray-500 uppercase tracking-widest"
        >
          Enter Password
        </label>
        <input
            id="admin-password"
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              if (error) setError('');
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            className={`border-b-2 py-2 bg-transparent focus:outline-none focus:border-black font-mono text-xl transition-colors ${
              error ? 'border-red-500 text-red-600' : 'border-gray-200'
            }`}
            placeholder="••••••••"
        />
        {error && (
            <div
              id="login-error"
              role="alert"
              className="text-red-500 text-sm font-mono mt-1"
            >
                {error}
            </div>
        )}
        <button
          type="submit"
          className="bg-black text-white font-mono py-3 mt-4 hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            ACCESS_TERMINAL
        </button>
      </form>
    </div>
  );
};
