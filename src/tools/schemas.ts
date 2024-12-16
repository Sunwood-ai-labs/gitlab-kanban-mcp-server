// ツールのスキーマ定義
export const toolSchemas = [
  {
    name: "list_tasks",
    description: "プロジェクトのカンバンボードのタスク一覧を取得",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "GitLabプロジェクトID"
        }
      },
      required: ["projectId"]
    }
  },
  {
    name: "create_task",
    description: "カンバンボードに新しいタスクを作成",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "GitLabプロジェクトID"
        },
        title: {
          type: "string",
          description: "タスクのタイトル"
        },
        description: {
          type: "string",
          description: "タスクの説明"
        },
        labels: {
          type: "array",
          items: { type: "string" },
          description: "タスクのラベル"
        }
      },
      required: ["projectId", "title"]
    }
  },
  {
    name: "update_task",
    description: "カンバンボードのタスクを更新",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "GitLabプロジェクトID"
        },
        issueId: {
          type: "string",
          description: "タスク（Issue）のID"
        },
        title: {
          type: "string",
          description: "新しいタイトル"
        },
        description: {
          type: "string",
          description: "新しい説明"
        },
        state: {
          type: "string",
          enum: ["opened", "closed"],
          description: "タスクの状態"
        }
      },
      required: ["projectId", "issueId"]
    }
  },
  {
    name: "delete_task",
    description: "カンバンボードのタスクを削除",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "GitLabプロジェクトID"
        },
        issueId: {
          type: "string",
          description: "タスク（Issue）のID"
        }
      },
      required: ["projectId", "issueId"]
    }
  },
  {
    name: "add_comment",
    description: "タスクにコメントを追加",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "GitLabプロジェクトID"
        },
        issueId: {
          type: "string",
          description: "タスク（Issue）のID"
        },
        body: {
          type: "string",
          description: "コメントの内容（Markdown形式対応）"
        }
      },
      required: ["projectId", "issueId", "body"]
    }
  }
];
