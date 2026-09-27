const env = `
PORT=8080
DATABASE_URL=mongodb://localhost:27017/
JWT_SECRET=your_jwt_secret
`;

const envExample: string = `# .env.example
PORT=
DATABASE_URL=
JWT_SECRET=
`;

const gitignore: string = `
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

const eslint: string = `{
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

const readmeTemplate: string = `# {{project-name}} 🚀

A scalable, production-ready Express.js backend scaffolded with **[express-jetstart](https://github.com/AvusalaChetan/express-jetstart-CLI)** ⚡

[![Node.js](https://img.shields.io/badge/Node.js-18+-68a063?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)](https://expressjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 📋 Features

- ⚡ **Production-Grade Architecture**: Clean separation of concerns with controllers, services, routes, models, and middlewares.
- 🛡️ **Security & Utility Middleware**: Pre-configured with \`cors\`, \`morgan\` HTTP logger, and centralized error handling.
- �� **Environment Management**: Fully configured with \`dotenv\` and \`.env.example\` templates.
- 🧹 **Code Quality & Formatting**: Ready-to-use ESLint and Prettier configs for consistent standards.
- 🔄 **Hot Reloading**: Instant feedback loop during development with automated reloads.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** >= 18.0.0
- **npm** / **pnpm** / **yarn**

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment
Your \`.env\` file is pre-configured and ready to use:

| Variable | Default | Description |
| :--- | :--- | :--- |
| \`PORT\` | \`3000\` | Server listening port |
| \`DATABASE_URL\` | \`mongodb://localhost:27017/\` | Database connection URI |
| \`JWT_SECRET\` | \`your_jwt_secret\` | Secret key for JWT signing |

### 4. Run the Server

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

---

## 📁 Project Architecture

\`\`\`
{{project-name}}/
├── src/
│   ├── config/         # Database and third-party service configs
│   ├── controllers/    # HTTP request handlers & input validation
│   ├── middlewares/    # Authentication, logging, and error handlers
│   ├── models/         # Database schemas and entities
│   ├── routes/         # Express endpoint definitions
│   ├── services/       # Core business logic
│   ├── utils/          # Helper functions and shared utilities
│   └── public/         # Static assets (images, CSS, client JS)
├── app.js / app.ts     # Express application setup & middleware pipeline
├── server.js / server.ts # HTTP server bootstrap and port listener
├── package.json
├── .env
├── .gitignore
├── .prettierrc
└── .eslintrc.json
\`\`\`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| \`GET\` | \`/\` | Health check & welcome status | \`200 OK\` |

---

## 🛠️ Available Scripts

- \`npm run dev\` — Starts development server with live reload.
- \`npm run build\` — Compiles TypeScript into \`dist/\` (if TypeScript is selected).
- \`npm start\` — Runs the compiled production server.

---

## 🤝 Contributing & Feedback

Loved using **express-jetstart**?
- ⭐ Star the repository on [GitHub](https://github.com/AvusalaChetan/express-jetstart-CLI)
- 🐛 Found a bug? [Open an issue](https://github.com/AvusalaChetan/express-jetstart-CLI/issues)
- 💡 Have an idea? [Submit a PR](https://github.com/AvusalaChetan/express-jetstart-CLI/pulls)

---

**Crafted with ⚡ by [express-jetstart](https://github.com/AvusalaChetan/express-jetstart-CLI)**
`;

export {env, envExample, gitignore, eslint, readmeTemplate};

