<div align="center">
  <img src="assets/header.svg" alt="GitLab Kanban MCP" width="100%">

  <div>
    <a href="README.md"><img src="https://img.shields.io/badge/english-document-white.svg" alt="EN doc"></a>
    <a href="README.ja.md"><img src="https://img.shields.io/badge/ドキュメント-日本語-white.svg" alt="JA doc"/></a>
  </div>

  <div>
    <a href="https://gitlab.com"><img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white" alt="GitLab"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
    <a href="https://github.com/modelcontextprotocol/sdk"><img src="https://img.shields.io/badge/MCP_SDK-0.6.0-blue?style=for-the-badge" alt="MCP SDK"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License"></a>
  </div>
</div>

# 🎯 GitLab Kanban MCP サーバー

GitLabのカンバンボード操作を行うためのModel Context Protocolサーバー

## ✨ 機能

### 🛠️ 提供ツール

- `list_tasks` - プロジェクトのカンバンボードのタスク一覧を取得
- `create_task` - カンバンボードに新しいタスクを作成
- `update_task` - カンバンボードのタスクを更新
- `delete_task` - カンバンボードのタスクを削除
- `add_comment` - タスクにコメントを追加

## 🏗️ プロジェクト構造

```
src/
├── api/
│   └── gitlab.ts      # GitLab APIクライアントと各種APIメソッド
├── config/
│   └── gitlab.ts      # GitLab関連の設定
├── tools/
│   ├── handlers.ts    # ツールのハンドラー実装
│   └── schemas.ts     # ツールのスキーマ定義
└── index.ts          # MCPサーバーのメインエントリーポイント
```

## 🚀 はじめに

### 📦 インストール

```bash
npm install
```

### 🔧 環境設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
GITLAB_TOKEN=your_gitlab_token
GITLAB_URL=your_gitlab_url  # デフォルト: https://gitlab.com
```

### 🛠️ ビルド

```bash
npm run build
```

開発時の自動ビルド：

```bash
npm run watch
```

## 🔍 デバッグ

MCPサーバーはstdioを介して通信するため、[MCP Inspector](https://github.com/modelcontextprotocol/inspector)の使用を推奨します：

```bash
npm run inspector
```

## 📝 使用方法

### Clineでの設定

`cline_mcp_settings.json`に以下の設定を追加してください：

```json
{
  "mcpServers": {
    "gitlab-kanban-mcp-server": {
      "command": "node",
      "args": ["path/to/gitlab-kanban-mcp-server/build/index.js"],
      "env": {
        "GITLAB_TOKEN": "your_gitlab_token",
        "GITLAB_URL": "your_gitlab_url"
      }
    }
  }
}
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ feat: 素晴らしい機能を追加'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
