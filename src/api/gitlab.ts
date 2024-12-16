import axios from 'axios';
import { GITLAB_API_BASE, GITLAB_TOKEN } from '../config/gitlab.js';

// GitLab APIクライアントの設定
export const gitlabClient = axios.create({
  baseURL: GITLAB_API_BASE,
  headers: {
    'Authorization': `Bearer ${GITLAB_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

// タスク関連のAPI
export const taskApi = {
  // タスク一覧の取得
  listTasks: async (projectId: string) => {
    const response = await gitlabClient.get(`/projects/${projectId}/issues`);
    return response.data;
  },

  // タスクの作成
  createTask: async (projectId: string, params: {
    title: string;
    description?: string;
    labels?: string[];
  }) => {
    const response = await gitlabClient.post(`/projects/${projectId}/issues`, {
      title: params.title,
      description: params.description,
      labels: params.labels?.join(',')
    });
    return response.data;
  },

  // タスクの更新
  updateTask: async (projectId: string, issueId: string, params: {
    title?: string;
    description?: string;
    state?: 'opened' | 'closed';
  }) => {
    const response = await gitlabClient.put(`/projects/${projectId}/issues/${issueId}`, {
      title: params.title,
      description: params.description,
      state_event: params.state === 'closed' ? 'close' : 'reopen'
    });
    return response.data;
  },

  // タスクの削除
  deleteTask: async (projectId: string, issueId: string) => {
    await gitlabClient.delete(`/projects/${projectId}/issues/${issueId}`);
  },

  // コメントの追加
  addComment: async (projectId: string, issueId: string, body: string) => {
    const response = await gitlabClient.post(
      `/projects/${projectId}/issues/${issueId}/notes`,
      { body }
    );
    return response.data;
  }
};
