#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GITLAB_URL } from "./config/gitlab.js";
import { toolSchemas } from "./tools/schemas.js";
import { handleToolCall } from "./tools/handlers.js";

class GitLabKanbanServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "gitlab-kanban-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  private setupToolHandlers() {
    // ツール一覧のハンドラー
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: toolSchemas
    }));

    // ツール実行のハンドラー
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return await handleToolCall(request.params.name, request.params.arguments);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`GitLab Kanban MCP server running on stdio (GitLab URL: ${GITLAB_URL})`);
  }
}

const server = new GitLabKanbanServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
