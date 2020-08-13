import { Ioc, Registrar } from '@adonisjs/fold';
import { Config } from '@adonisjs/config/build/src/Config';
import { DATABASE_ROOT, APP_ROOT } from './config/constants';

const ioc = new Ioc();
const registrar = new Registrar(ioc);

ioc.singleton('Adonis/Core/Config', () => {
  const { database, directories } = require(DATABASE_ROOT);
  const app = {
    logger: {
      name: 'logger',
      enabled: true,
      level: 'info',
    },
  };
  if (directories?.migrations) {
    const paths = [directories.migrations];
    database.connections[database.connection].migrations = { paths };
  }
  return new Config({ app, database, directories });
});

ioc.singleton('Adonis/Core/Application', () => {
  const namespacesMap = new Map();

  return {
    appRoot: APP_ROOT,
    configPath: String,
    namespacesMap,
  };
});

registrar
  .useProviders(['@adonisjs/profiler', '@adonisjs/logger', '@adonisjs/events', '@adonisjs/lucid'])
  .register();

export default ioc;
