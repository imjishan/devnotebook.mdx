import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(passwordInput)) {
      setPasswordInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label
          htmlFor="password-input"
          className="text-sm font-mono text-gray-500 uppercase tracking-widest"
        >
          Enter Password
        </label>
        <div className="flex flex-col">
          <input
              id="password-input"
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (error) setError(false);
              }}
              className={`border-b-2 py-2 bg-transparent focus:outline-none font-mono text-xl transition-colors ${
                error
                  ? 'border-red-500 text-red-600 focus:border-red-500'
                  : 'border-gray-200 focus:border-black'
              }`}
              placeholder="••••••••"
              aria-invalid={error}
              aria-describedby={error ? "login-error" : undefined}
          />
          {error && (
            <p
              id="login-error"
              className="text-red-500 text-xs font-mono mt-2 animate-pulse"
              role="alert"
            >
              ⚠ Access Denied: Incorrect password
            </p>
          )}
        </div>
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
