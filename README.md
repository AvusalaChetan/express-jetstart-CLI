# express-jetstart CLI

Scaffold a clean, production-ready Express application in seconds.
Choose your language, module system, view engine, and database during setup.

## Why use it?

- **Lightning-fast scaffolding**: Generate a production-ready Express app in seconds.
- **TypeScript or JavaScript**: Choose fully typed TypeScript or modern JavaScript.
- **ESM and CommonJS ready**: Use `import`/`export` or `require`.
- **Multi-database support**: Get connection helpers for MongoDB, PostgreSQL, and MySQL.
- **Starter or minimal templates**: Choose a full starter with health routes and error handlers, or a minimal boilerplate project.
- **View engines included**: Use EJS, Pug, or Handlebars for server-rendered applications.
- **No repetitive boilerplate**: Get Express configuration, dotenv setup, `.gitignore`, CORS, and middleware configuration automatically.

## Quick Start

```bash
npx express-jetstart@latest
```

Use `@latest` if npm is using a cached version.

## Features

- Generate Express projects from the command line
- Choose JavaScript or TypeScript
- Choose ESM or CommonJS
- Select MongoDB, PostgreSQL, MySQL, or no database
- Choose EJS, Pug, Handlebars, or no view engine
- Generate `.env` and `.env.example` files
- Include database connection helpers
- Start with a clean, scalable project structure

## Generated Project Structure

```text
your-project/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── services/
├── public/
├── .env
├── .env.example
├── .gitignore
├── server.js or server.ts
├── app.js or app.ts
├── package.json
├── README.md
├── tsconfig.json
└── ARCHITECTURE.yaml
```

## Database Configuration

If you select a database during setup, update the generated `.env` file with the correct connection string:

```env
# MongoDB
DATABASE_URL=mongodb://localhost:27017/my_database

# PostgreSQL
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/my_database

# MySQL
DATABASE_URL=mysql://root:your_password@localhost:3306/my_database
```

Make sure the selected database server is running before starting your application. Replace the username, password, host, port, and database name with your own values.

## Local Development

```bash
npm install
npm run build
npm run dev
```

## Contributing

Contributions are welcome.

- Report issues: https://github.com/AvusalaChetan/express-jetstart-CLI/issues
- Repository: https://github.com/AvusalaChetan/express-jetstart-CLI

## License

MIT
