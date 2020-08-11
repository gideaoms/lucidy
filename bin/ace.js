#!/usr/bin/env node
require('reflect-metadata');
const { join } = require('path');
const { Ioc, Registrar } = require('@adonisjs/fold');
const { Application } = require('@adonisjs/application');
const { Kernel, Manifest } = require('@adonisjs/ace');
const { iocTransformer } = require('@adonisjs/ioc-transformer');
const {
  BaseSeeder,
  FactoryManager,
  Schema,
  Adapter,
  scope,
  decorators,
  BaseModel,
  Config,
} = require('@adonisjs/lucid');
const { register } = require('ts-node');
const nested = require('nested-property');
const databaseConfig = {
  connection: 'pg',
  client: 'pg',
  host: '127.0.0.1',
  port: 3001,
  user: 'postgres',
  password: '123456',
  database: 'postgres',
  migrations: 'src/database/migrations',
  models: 'src/database/models',
  seeders: 'src/database/seeders',
};

register({
  transpileOnly: true,
  transformers: {
    after: [
      iocTransformer(require('typescript/lib/typescript'), { aliases: {} }),
    ],
  },
});

const ioc = new Ioc();
const registrar = new Registrar(ioc);
const defaultMigrations = 'database/migrations';
const config = Object.assign(
  {
    app: {
      logger: {
        name: 'logger',
        enabled: true,
        level: 'info',
      },
    },
  },
  {
    database: {
      orm: {},
      connection: databaseConfig.connection,
      connections: {
        pg: {
          client: databaseConfig.client,
          connection: {
            host: databaseConfig.host,
            port: databaseConfig.port,
            user: databaseConfig.user,
            password: databaseConfig.password,
            database: databaseConfig.database,
          },
          healthCheck: false,
          migrations: {
            paths: [databaseConfig.migrations || defaultMigrations],
          },
        },
      },
    },
  }
);

ioc.singleton('Adonis/Core/Config', () => {
  return {
    get(key, defaultValue) {
      return nested.get(config, key) || defaultValue;
    },
  };
});

ioc.singleton('Adonis/Core/Application', () => {
  const namespacesMap = new Map();

  return {
    appRoot: join(__dirname, '..', '..', '..'),
    configPath: () => '',
    namespacesMap,
  };
});

registrar
  .useProviders([
    '@adonisjs/profiler',
    '@adonisjs/logger',
    '@adonisjs/events',
    '@adonisjs/lucid',
  ])
  .register();

const application = new Application(
  join(__dirname, '..', '..', '..'),
  ioc,
  {
    namespaces: {
      models: 'Models',
    },
    aliases: {
      Models: databaseConfig.models || 'database/models',
    },
    directories: {
      database: databaseConfig.database || 'database',
      migrations: databaseConfig.models || defaultMigrations,
      seeds: databaseConfig.seeders || 'database/seeders',
    },
  },
  {}
);

const kernel = new Kernel(application);

const manifest = new Manifest(join(__dirname, '..'));

kernel.flag(
  'help',
  async (value) => {
    if (!value) {
      return;
    }
    kernel.printHelp();
  },
  { alias: 'h' }
);

kernel.useManifest(manifest);

kernel.handle(process.argv.slice(2)).catch(console.error);
