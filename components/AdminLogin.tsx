import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(passwordInput)) {
      setPasswordInput('');
    } else {
      alert('Access Denied');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">Enter Password</label>
        <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border-b-2 border-gray-200 py-2 bg-transparent focus:outline-none focus:border-black font-mono text-xl"
            placeholder="••••••••"
        />
        <button type="submit" className="bg-black text-white font-mono py-3 mt-4 hover:bg-gray-800 transition-colors">
            ACCESS_TERMINAL
        </button>
      </form>
    </div>
  );
};
