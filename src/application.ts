import { Application } from '@adonisjs/application';
import ioc from './ioc';
import config, { APP_ROOT } from './config';

const databaseDirectory = config.get('directories.database', 'database');
const application = new Application(
  APP_ROOT,
  ioc,
  {
    namespaces: {
      models: 'Models',
    },
    aliases: {
      Models: config.get('directories.models', 'models'),
    },
    directories: {
      database: databaseDirectory,
      migrations: config.get('directories.migrations', `${databaseDirectory}/migrations`),
      seeds: config.get('directories.seeders', `${databaseDirectory}/seeders`),
    },
  },
  {}
);

export default application;
