# Expo Offline First Application

Expo Offline First Application is a React Native boilerplate with Expo, we use Domain Driven Design for domain pattern. This boilerplate is offline first application, we use SQLite for local database.

## What we use

- React Native
- Expo
- TypeScript
- OpSQLite
- Drizzle ORM
- SQLite
- React Navigation

## Setup

### Install dependencies

```bash
npm install
```

### Migrate database

```bash
npm run db:generate
```

NOTE: migration will run when the application start

### Run the application

- run prebuild

```bash
npx expo prebuild
```

- run the application on android

```bash
npm run android
```

- run the application on ios

```bash
npm run ios
```
