# Hono Cloudflare workers API

This is API for Hono Cloudflare workers, this API templates aim to provide a fastest way with clean code structure.

## Prequisities

- [Node >= 22](https://nodejs.org/)
- [Hono >= 4.9](https://hono.dev/)
- [Wrangler >= 4.4](https://developers.cloudflare.com/)
- [Zod >= 4](https://zod.dev)
- [Drizzle >= 0.44](https://orm.drizzle.team/)

## Installation

1. please activate your wrangler use this command and don't forget to populate the values

```bash
mv wrangler.toml.example wrangler.toml
```

2. set env

```bash
JWT_SECRET=your preferable secret
```

2. install your project

```bash
pnpm install
```

3. run your project as dev

```bash
pnpm dev
```

## DB Generate & Migration

when planning to use db, you should prepare and running the migration under the hood

1. generate the schema (if you create new schema or update it)

```bash
pnpm run db:generate
```

2. run the migration

```bash
pnpm run db:migrate
```

## Deployment Setup

1. run deploy script

```bash
pnpm run deploy
```

2. set up .env for db migration

```bash
mv .env.example .env
```

3. setup the CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, CLOUDFLARE_D1_TOKEN

- get CLOUDFLARE_ACCOUNT_ID from dashboard link of cloudflare for example: https://dash.cloudflare.com/account-id-xxxxxxxx
- get CLOUDFLARE_DATABASE_ID from d1 id
- get CLOUDFLARE_D1_TOKEN from https://dash.cloudflare.com/profile/api-tokens and set up for d1 READ and WRITE

4. run db migration

```bash
pnpm run db:deploy
```

## Architecture

We're use Domain Driven Design (DDD) and Clean Architecture to structure our code.

Folder Structure:

```
src/
├── api/
│   ├── module_name/
│   │   ├── index.ts -> routes
│   │   ├── service.ts
│   │   ├── schema.ts -> domain, DTO, response schema (req & res)
│   │   ├── repository.ts -> data access layer
│   ├── middleware/
├── db/
│   ├── migrations/
│   ├── schema/
│   ├── script/
│   ├── index.ts
├── lib/ -> external lib/package
│   ├── index.ts
├── types/
│   ├── index.ts
├── util/
│   ├── index.ts
├── index.ts -> app entrypoint
```

## API Module

| Module         | Description                            | Status |
| :------------- | :------------------------------------- | :----- |
| **Auth**       | Authentication module for the API      | Soon   |
| **User**       | User module for the API                | ✅     |
| **Org**        | Organization module for the API        | Soon   |
| **Org Member** | Organization member module for the API | Soon   |
