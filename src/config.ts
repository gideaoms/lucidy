import { resolve } from 'path';
import { Config } from '@adonisjs/config/build/src/Config';

export const APP_ROOT = resolve(__dirname, '..', '..');

export const NPM_ROOT = resolve(__dirname);

const config = new Config(require(resolve(APP_ROOT, 'lucidyfile')).default);

export default config;
