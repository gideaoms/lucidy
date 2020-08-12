import { Ioc, Registrar } from '@adonisjs/fold';
import { Config } from '@adonisjs/config/build/src/Config';
import { DATABASE_ROOT, APP_ROOT } from './config/constants';

const ioc = new Ioc();
const registrar = new Registrar(ioc);

ioc.singleton('Adonis/Core/Config', () => {
  const database = require(DATABASE_ROOT);
  const app = {
    logger: {
      name: 'logger',
      enabled: true,
      level: 'info',
    },
  };
  return new Config({ app, database });
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
