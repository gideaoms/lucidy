import ioc from '../ioc';

const config = ioc.use('Adonis/Core/Config');

export const DATABASE = 'database';

export const MIGRATIONS = config.get('directories.migrations', `${DATABASE}/migrations`);

export const SEEDERS = config.get('directories.seeders', `${DATABASE}/seeders`);

export const MODELS = config.get('directories.models', 'models');
