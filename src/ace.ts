#!/usr/bin/env node
import { Application } from '@adonisjs/application';
import { Kernel, Manifest } from '@adonisjs/ace';
import ioc from './ioc';
import { DATABASE, MIGRATIONS, SEEDERS, MODELS } from './constants';

const main = async (args: string[]) => {
  const app = new Application(
    this.appRoot,
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
