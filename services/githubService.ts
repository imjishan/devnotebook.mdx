import { GithubConfig } from '../types';

// Helper to handle UTF-8 strings in Base64 (needed for emojis/special chars)
const utf8ToBase64 = (str: string): string => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const publishToGithub = async (
  config: GithubConfig, 
  filename: string, 
  content: string, 
  message: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  if (!config.token || !config.owner || !config.repo) {
    return { success: false, error: "Missing GitHub Configuration" };
  }

  const filePath = config.path ? `${config.path}/${filename}` : filename;
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
  const branch = config.branch || 'main';
  
  const headers = {
    'Authorization': `Bearer ${config.token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  try {
    // 1. Check if file exists to get the SHA (needed for updates)
    let sha: string | undefined;
    
    // We separate the fetch to handle 404 vs 403 specifically
    const getRes = await fetch(`${url}?ref=${branch}`, {
        headers: headers
    });
    
    if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
    } else if (getRes.status === 403 || getRes.status === 401) {
        // Fail fast if we can't even read
        const err = await getRes.json();
        const msg = err.message || "Unknown Access Error";
        if (msg.includes("Resource not accessible by personal access token")) {
            throw new Error("GitHub Token Error: Missing 'Contents' permission. Please ensure your Fine-grained token has 'Contents: Read and write' access.");
        }
        throw new Error(`GitHub Read Error: ${msg}`);
    } 
    // If 404, we just continue (creating new file)

    // 2. PUT (Create or Update)
    const body: any = {
        message: message,
        content: utf8ToBase64(content),
        branch: branch
    };

    if (sha) {
        body.sha = sha;
    }

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!putRes.ok) {
        const errorData = await putRes.json();
        const msg = errorData.message || "GitHub API Error";
        
        if (msg.includes("Resource not accessible by personal access token")) {
            throw new Error("GitHub Token Error: Missing 'Contents' permission. Please ensure your Fine-grained token has 'Contents: Read and write' access.");
        }
        
        throw new Error(msg);
    }

    const responseData = await putRes.json();
    return { success: true, url: responseData.content?.html_url };

  } catch (error: any) {
    console.error("GitHub Publish Error:", error);
    return { success: false, error: error.message };
  }
};
