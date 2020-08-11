#!/usr/bin/env node
import 'reflect-metadata';
import { join } from 'path';
import { Ioc, Registrar } from '@adonisjs/fold';
import { Application } from '@adonisjs/application';
import { Kernel, Manifest } from '@adonisjs/ace';
import { iocTransformer } from '@adonisjs/ioc-transformer';
import { register } from 'ts-node';
import { RcFile } from '@ioc:Adonis/Core/Application';
import typescript from 'typescript/lib/typescript';
import nested from 'nested-property';

const databaseConfig = {
  connection: 'pg',
  client: 'pg',
  host: '127.0.0.1',
  port: 3001,
  user: 'postgres',
  password: '123456',
  database: 'postgres' || 'database',
  migrations: 'src/database/migrations' || 'database/migrations',
  models: 'src/database/models' || 'database/models',
  seeders: 'src/database/seeders' || 'database/seeders',
};

register({
  transformers: {
    after: [iocTransformer(typescript, { aliases: {} } as RcFile)],
  },
});

const ioc = new Ioc();
const registrar = new Registrar(ioc);
const appRoot = join(__dirname, '..', '..', '..');
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
            paths: [databaseConfig.migrations],
          },
        },
      },
    },
  }
);

global[Symbol.for('ioc.use')] = ioc.use.bind(ioc);

ioc.singleton('Adonis/Core/Config', () => {
  return {
    get(key: string, defaultValue: any) {
      return nested.get(config, key) || defaultValue;
    },
  };
});

ioc.singleton('Adonis/Core/Application', () => {
  const namespacesMap = new Map();

  return {
    appRoot,
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
  appRoot,
  ioc,
  {
    namespaces: {
      models: 'Models',
    },
    aliases: {
      Models: databaseConfig.models,
    },
    directories: {
      database: databaseConfig.database,
      migrations: databaseConfig.migrations,
      seeds: databaseConfig.seeders,
    },
  },
  {}
);

const kernel = new Kernel(application);

const manifest = new Manifest(join(__dirname));

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
