import { APP_ROOT } from '../constants';
import ioc from '../ioc';
import { ApplicationContract } from '@ioc:Adonis/Core/Application';

ioc.singleton('Adonis/Core/Application', () => {
  const namespacesMap = new Map();

  return {
    appRoot: APP_ROOT,
    configPath: String,
    namespacesMap,
  };
});

const app: ApplicationContract = ioc.use('Adonis/Core/Application');

export default app;
