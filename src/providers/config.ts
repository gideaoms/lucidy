import { Config } from '@adonisjs/config/build/src/Config';
import { DATABASE_ROOT } from '../constants';
import ioc from '../ioc';
import { ConfigContract } from '@ioc:Adonis/Core/Config';

ioc.singleton('Adonis/Core/Config', () => {
  const database = require(DATABASE_ROOT).default;
  const app = {
    logger: {
      name: 'logger',
      enabled: true,
      level: 'info',
    },
  };
  return new Config({ app, database });
});

const config: ConfigContract = ioc.use('Adonis/Core/Config');

export default config;
