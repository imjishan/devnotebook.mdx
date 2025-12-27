import React, { useState, useEffect } from 'react';
import { BlogPost, GithubConfig } from '../types';

interface AdminDashboardProps {
  posts: BlogPost[];
  githubConfig: GithubConfig;
  onSaveConfig: (config: GithubConfig) => void;
  onCreateNew: () => void;
  onEdit: (post: BlogPost) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  posts,
  githubConfig,
  onSaveConfig,
  onCreateNew,
  onEdit
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const [localConfig, setLocalConfig] = useState(githubConfig);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setLocalConfig(githubConfig);
  }, [githubConfig]);

  const handleSaveConfig = () => {
      setSaveStatus('saving');
      onSaveConfig(localConfig);
      setSaveStatus('saved');

      setTimeout(() => {
          setSaveStatus('idle');
          setShowConfig(false);
      }, 1500);
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h2 className="font-mono text-xl">Admin Dashboard</h2>
            <div className="flex gap-4">
                 <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="text-sm font-mono text-gray-500 hover:text-black underline"
                    aria-expanded={showConfig}
                 >
                    {showConfig ? 'Hide Config' : 'Connect Repo'}
                </button>
                <button onClick={onCreateNew} className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800">
                    + New Post
                </button>
            </div>
        </div>

        {showConfig && (
            <div className="bg-gray-50 p-6 border border-gray-200 mb-8 rounded-sm">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-widest">GitHub Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="config-owner" className="block text-xs font-mono text-gray-500 mb-1">Repo Owner</label>
                        <input
                            id="config-owner"
                            value={localConfig.owner}
                            onChange={e => setLocalConfig({...localConfig, owner: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. vercel"
                        />
                    </div>
                    <div>
                        <label htmlFor="config-repo" className="block text-xs font-mono text-gray-500 mb-1">Repo Name</label>
                        <input
                            id="config-repo"
                            value={localConfig.repo}
                            onChange={e => setLocalConfig({...localConfig, repo: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. next.js"
                        />
                    </div>
                    <div>
                        <label htmlFor="config-path" className="block text-xs font-mono text-gray-500 mb-1">Target Folder</label>
                        <input
                            id="config-path"
                            value={localConfig.path}
                            onChange={e => setLocalConfig({...localConfig, path: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. content/posts"
                        />
                    </div>
                    <div>
                        <label htmlFor="config-token" className="block text-xs font-mono text-gray-500 mb-1">Personal Access Token</label>
                        <input
                            id="config-token"
                            type="password"
                            value={localConfig.token}
                            onChange={e => setLocalConfig({...localConfig, token: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="ghp_..."
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <button
                        onClick={handleSaveConfig}
                        disabled={saveStatus !== 'idle'}
                        className="bg-gray-900 text-white text-xs px-4 py-2 hover:bg-black disabled:opacity-70 transition-all duration-200"
                    >
                        {saveStatus === 'saving' ? 'Saving...' : 'Save Configuration'}
                    </button>
                    {saveStatus === 'saved' && (
                        <span role="status" className="text-xs text-green-600 font-mono animate-fade-in">
                            ✨ Configuration Saved!
                        </span>
                    )}
                </div>
            </div>
        )}

        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.slug} className="flex justify-between items-center p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div>
                        <h3 className="font-bold">{post.title}</h3>
                        <p className="text-xs text-gray-400 font-mono">{post.slug}</p>
                    </div>
                    <button onClick={() => onEdit(post)} className="text-sm underline">
                        Edit
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};
