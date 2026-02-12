const env = `
PORT=8080
DATABASE_URL=mongodb://localhost:27017/
JWT_SECRET=your jwt secret 
`;

const envExample: string = `# .env.example
PORT=
DATABASE_URL=
JWT_SECRET=
`;

const gitignore: string = `
# Dependencies
node_modules/

# Compiled output
dist/

# TypeScript
*.tsbuildinfo

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
`;

const eslint: string = `
{
"env": {
"node": true,
"es2021": true
},
"extends": "eslint:recommended",
"parserOptions": {
"ecmaVersion": 12
},
"rules": {
// Add custom rules here if needed
}
}
`;

export {env, envExample, gitignore, eslint};
