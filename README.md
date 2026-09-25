# express-jetstart CLI

A fast CLI for scaffolding production-ready Express applications with a clean starting structure.

## Why use it?

- Generate an Express app in seconds
- Choose JavaScript or TypeScript
- Pick ESM or CommonJS
- Start with a sensible folder structure
- Skip repetitive boilerplate setup

## Quick Start

```bash
npx express-jetstart@latest
```

If your machine is using a cached older version, make sure to include `@latest`.

## Features

- Instant project scaffolding
- TypeScript and JavaScript templates
- ESM and CommonJS module support
- Prebuilt folder layout for app structure
- Ready-to-run Express starter files
- Clean project output for fast iteration

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
