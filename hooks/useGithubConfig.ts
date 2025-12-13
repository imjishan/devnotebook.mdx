import { useState, useEffect } from 'react';
import { GithubConfig } from '../types';

export const useGithubConfig = () => {
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({
      owner: '',
      repo: '',
      path: 'posts', // Default folder
      token: '',
      branch: 'main'
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('githubConfig');
    if (savedConfig) {
        try {
            setGithubConfig(JSON.parse(savedConfig));
        } catch (e) { console.error("Failed to parse config"); }
    }
  }, []);

  const saveConfig = (config: GithubConfig) => {
      setGithubConfig(config);
      localStorage.setItem('githubConfig', JSON.stringify(config));
  };

  return { githubConfig, saveConfig };
};
