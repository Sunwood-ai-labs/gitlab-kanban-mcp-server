// GitLab API設定
export const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
export const GITLAB_URL = process.env.GITLAB_URL || 'https://gitlab.com';

if (!GITLAB_TOKEN) {
  throw new Error('GITLAB_TOKEN environment variable is required');
}

// GitLab APIのベースURL
export const GITLAB_API_BASE = `${GITLAB_URL}/api/v4`;
