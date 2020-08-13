#!/usr/bin/env node
import 'reflect-metadata';
import './alias';
import { register } from 'ts-node';
import { Application } from '@adonisjs/application';
import { Kernel, Manifest } from '@adonisjs/ace';
import ioc from './ioc';
import { DATABASE, MIGRATIONS, SEEDERS, MODELS } from './config/database';
import { APP_ROOT } from './config/constants';

register({ transpileOnly: true });

const main = async (args: string[]) => {
  const app = new Application(
    APP_ROOT,
    ioc,
    {
      namespaces: {
        models: 'Models',
      },
      aliases: {
        Models: MODELS,
      },
      directories: {
        database: DATABASE,
        migrations: MIGRATIONS,
        seeds: SEEDERS,
      },
    },
    {}
  );
  const kernel = new Kernel(app);
  const manifest = new Manifest(__dirname);

  kernel.flag(
    'help',
    async (value, _, command) => {
      if (!value) {
        return;
      }
      kernel.printHelp(command);
      process.exit(0);
    },
    { alias: 'h' }
  );

  kernel.useManifest(manifest);

  await kernel.handle(args);
};

main(process.argv.slice(2)).catch(console.error);
