import { Kernel, Manifest } from '@adonisjs/ace';
import application from './application';
import { NPM_ROOT } from './config';

const kernel = new Kernel(application);

const manifest = new Manifest(NPM_ROOT);

kernel.flag(
  'help',
  async (value) => {
    if (!value) {
      return;
    }
    kernel.printHelp();
  },
  { alias: 'h' }
);

kernel.useManifest(manifest);

kernel.handle(process.argv.slice(2)).catch(console.error);
