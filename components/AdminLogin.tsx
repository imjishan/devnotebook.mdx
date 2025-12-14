import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (onLogin(passwordInput)) {
      setPasswordInput('');
    } else {
      setError('Access Denied: Invalid credentials');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
      if (error) setError(null);
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label htmlFor="admin-password" className="text-sm font-mono text-gray-500 uppercase tracking-widest">Enter Password</label>
        <div className="relative">
            <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={handleChange}
                className={`w-full border-b-2 py-2 bg-transparent focus:outline-none font-mono text-xl transition-colors ${
                    error ? 'border-red-500 text-red-600 focus:border-red-600' : 'border-gray-200 focus:border-black'
                }`}
                placeholder="••••••••"
                aria-invalid={!!error}
                aria-describedby={error ? "login-error" : undefined}
            />
        </div>

        {error && (
            <div id="login-error" className="text-red-500 text-sm font-mono mt-1" role="alert">
                {error}
            </div>
        )}

        <button
            type="submit"
            className="bg-black text-white font-mono py-3 mt-4 hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus:outline-none"
        >
            ACCESS_TERMINAL
        </button>
      </form>
    </div>
  );
};
