import { Registrar } from '@adonisjs/fold';
import ioc from './ioc';
import config, { APP_ROOT } from './config';

const registrar = new Registrar(ioc);

ioc.singleton('Adonis/Core/Config', () => config);

ioc.singleton('Adonis/Core/Application', () => {
  const namespacesMap = new Map();

  return {
    appRoot: APP_ROOT,
    configPath: () => '',
    namespacesMap,
  };
});

registrar
  .useProviders(['@adonisjs/profiler', '@adonisjs/logger', '@adonisjs/events', '@adonisjs/lucid'])
  .register();
