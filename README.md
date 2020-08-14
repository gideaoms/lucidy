[![npm version](https://img.shields.io/npm/v/lucidy.svg?style=flat)](https://www.npmjs.com/package/lucidy)

# Lucidy

Lucidy is a [Typescript](https://www.typescriptlang.org/) ORM created on top of [Lucid ORM](https://adonisjs.com/) (AdonisJS V5)

## Why

[AdonisJS](https://adonisjs.com/) is a great framework and it has one of the best ORM. But it works only in the AdonisJS framework.

## Installation

```sh
npm install lucidy
```

## Usage

### Your project

Add this line at the very main file of your app, before any code

```js
import 'lucidy';
```

### Customization

Add a file called `lucidyconfig` in the root of your project with the following options:

```js
// lucidyconfig.js
module.exports = {
  directories: {
    models: 'my-custom-models-folder', // default -> models
    seeders: 'my-custom-seeders-folder', // default -> database/seeders
    migrations: 'my-custom-migrations-folder', // default -> database/migrations
  },
  database: {
    connection: 'pg',
    connections: {
      pg: {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          port: 5432,
          user: 'user',
          password: 'pass',
          database: 'my-database',
        },
      },
    },
  },
};
```

### CMD

You can use all commands related to Lucid. Run this to see all options:

```sh
npx ace --help
```

### Typescript

If your code editor does not recognize the Lucid imports, add the Lucid `types` in you `tsconfig.json`:

```json
"types": ["@adonisjs/lucid"]
```

## Documentation

You can follow this [documentation](https://preview.adonisjs.com/guides/database/introduction)

## Author

[Gideão Silva](https://github.com/gideaoms)
