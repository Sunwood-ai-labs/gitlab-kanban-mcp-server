import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { taskApi } from "../api/gitlab.js";
import axios from "axios";

// ツールのハンドラー実装
export const toolHandlers = {
  // タスク一覧の取得
  async list_tasks(args: { projectId: string }) {
    const tasks = await taskApi.listTasks(args.projectId);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  },

  // タスクの作成
  async create_task(args: {
    projectId: string;
    title: string;
    description?: string;
    labels?: string[];
  }) {
    const task = await taskApi.createTask(args.projectId, {
      title: args.title,
      description: args.description,
      labels: args.labels
    });
    return {
      content: [{
        type: "text",
        text: `✨ タスクが作成されました: ${task.web_url}`
      }]
    };
  },

  // タスクの更新
  async update_task(args: {
    projectId: string;
    issueId: string;
    title?: string;
    description?: string;
    state?: 'opened' | 'closed';
  }) {
    const task = await taskApi.updateTask(args.projectId, args.issueId, {
      title: args.title,
      description: args.description,
      state: args.state
    });
    return {
      content: [{
        type: "text",
        text: `🔄 タスクが更新されました: ${task.web_url}`
      }]
    };
  },

  // タスクの削除
  async delete_task(args: { projectId: string; issueId: string }) {
    await taskApi.deleteTask(args.projectId, args.issueId);
    return {
      content: [{
        type: "text",
        text: `🗑️ タスクが削除されました（ID: ${args.issueId}）`
      }]
    };
  },

  // コメントの追加
  async add_comment(args: { projectId: string; issueId: string; body: string }) {
    const comment = await taskApi.addComment(args.projectId, args.issueId, args.body);
    return {
      content: [{
        type: "text",
        text: `💬 コメントが追加されました: ${comment.body}`
      }]
    };
  }
};

// ツールハンドラーのエラーラッパー
export async function handleToolCall(toolName: string, args: any) {
  try {
    const handler = toolHandlers[toolName as keyof typeof toolHandlers];
    if (!handler) {
      throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
    }
    return await handler(args);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new McpError(
        ErrorCode.InternalError,
        `GitLab API error: ${error.response?.data.message ?? error.message}`
      );
    }
    throw error;
  }
}
