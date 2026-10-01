import type { Database } from "../prompts/questions.js";

export const databaseUrls: Record<Database, string> = {
  mongodb: "mongodb://localhost:27017/my_database",
  postgresql: "postgresql://postgres:password@localhost:5432/my_database",
  mysql: "mysql://root:password@localhost:3306/my_database",
  none: "",
};

export const getEnvTemplate = (database: Database = "mongodb"): string => `
PORT=3000
DATABASE_URL=${databaseUrls[database]}
JWT_SECRET=your_jwt_secret
`;

export const getEnvExampleTemplate = (database: Database = "mongodb"): string => `# .env.example
PORT=3000
DATABASE_URL=${databaseUrls[database]}
JWT_SECRET=
`;

export const env = `
PORT=3000
DATABASE_URL=mongodb://localhost:27017/my_database
JWT_SECRET=your_jwt_secret
`;

export const envExample = `# .env.example
PORT=3000
DATABASE_URL=mongodb://localhost:27017/my_database
JWT_SECRET=
`;

export const gitignore: string = `
# Dependencies
node_modules/
.pnp
.pnp.js

# Compiled output
dist/
build/

# TypeScript
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# Testing & Coverage
coverage/

# IDE & Editors
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
`;

export const eslint: string = `{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {}
}
`;

export const readmeTemplate: string = `# {{project-name}} 🚀

A scalable, production-ready Express.js backend scaffolded with **[express-jetstart](https://github.com/AvusalaChetan/express-jetstart-CLI)** ⚡

---

## 📋 Features

- ⚡ **Production-Grade Architecture**: Clean separation of concerns with controllers, services, routes, models, and middlewares.
- 🛡️ **Security & Utility Middleware**: Pre-configured with \`cors\`, \`morgan\` HTTP logger, and centralized error handling.
- 🗄️ **Database Ready**: Pre-configured database connection helpers for MongoDB, PostgreSQL, and MySQL.
- ⚙️ **Environment Management**: Fully configured with \`dotenv\` and \`.env.example\` templates.
- 🧹 **Code Quality & Formatting**: Ready-to-use ESLint and Prettier configs for consistent standards.
- 🔄 **Hot Reloading**: Instant feedback loop during development with automated reloads.

---

## 🚀 Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
Your \`.env\` file is pre-configured and ready to use:

| Variable | Description |
| :--- | :--- |
| \`PORT\` | Server listening port (default: 3000) |
| \`DATABASE_URL\` | Database connection URI |
| \`JWT_SECRET\` | Secret key for JWT signing |

### 3. Run the Server

**Development Mode (Hot Reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production Build & Start:**
\`\`\`bash
npm run build
npm start
\`\`\`

Server will be running at \`http://localhost:3000\` 🚀
`;
