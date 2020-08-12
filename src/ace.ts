import { join } from 'path';
import { Application } from '@adonisjs/application';
import { ConfigContract } from '@ioc:Adonis/Core/Config';
import { Kernel, Manifest } from '@adonisjs/ace';
import ioc from './ioc';

export class Ace {
  private config: ConfigContract;

  constructor(private appRoot: string) {
    this.config = ioc.use('Adonis/Core/Config');
  }

  async handle(args: string[]) {
    const application = this.setupApplication();
    const kernel = new Kernel(application);
    const manifest = new Manifest(join(this.appRoot, 'node_modules', 'lucidy'));

    this.addKernelFlags(kernel);

    kernel.useManifest(manifest);

    await kernel.handle(args);
  }

  private setupApplication() {
    const databaseDirectory = this.config.get('directories.database', 'database');

    return new Application(
      this.appRoot,
      ioc,
      {
        namespaces: {
          models: 'Models',
        },
        aliases: {
          Models: this.config.get('directories.models', 'models'),
        },
        directories: {
          database: databaseDirectory,
          migrations: this.config.get('directories.migrations', `${databaseDirectory}/migrations`),
          seeds: this.config.get('directories.seeders', `${databaseDirectory}/seeders`),
        },
      },
      {}
    );
  }

  private addKernelFlags(kernel: Kernel) {
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
  }
}