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
      // Focus would ideally be handled here, but standard behavior is usually sufficient
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
            onChange={(e) => setPasswordInput(e.target.value)}
            className={`border-b-2 py-2 bg-transparent focus:outline-none font-mono text-xl transition-colors
              ${error
                ? 'border-red-500 focus:border-red-600 text-red-600'
                : 'border-gray-200 focus:border-black'
              }`}
            placeholder="••••••••"
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
        />
        {error && (
            <div
              id="login-error"
              role="alert"
              className="text-red-600 text-xs font-mono font-bold"
            >
              {error}
            </div>
        )}
        <button
          type="submit"
          className="bg-black text-white font-mono py-3 mt-4 hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black outline-none"
        >
            ACCESS_TERMINAL
        </button>
      </form>
    </div>
  );
};
