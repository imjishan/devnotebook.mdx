export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string; // Markdown/MDX string
  coverImage?: string;
  draft?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  POST = 'POST',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_EDITOR = 'ADMIN_EDITOR',
}

export interface AdminContextState {
  isAuthenticated: boolean;
}

export interface GithubConfig {
  owner: string;
  repo: string;
  path: string; // e.g., 'posts' or 'content/blog'
  token: string;
  branch?: string;
}
