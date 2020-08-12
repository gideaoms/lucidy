import { join } from 'path';
import ioc from './ioc';

const config = ioc.use('Adonis/Core/Config');

export const DATABASE = config.get('directories.database', 'database');

export const MIGRATIONS = config.get('directories.migrations', `${DATABASE}/migrations`);

export const SEEDERS = config.get('directories.seeders', `${DATABASE}/seeders`);

export const MODELS = config.get('directories.models', 'models');

export const APP_ROOT = join(__dirname, '..', '..', '..');

export const DATABASE_ROOT = join(__dirname, '..', '..', '..', 'database');
