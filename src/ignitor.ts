import { join } from 'path';
import { Config } from '@adonisjs/config/build/src/Config';
import { Ace } from './ace';
import ioc from './ioc';
import registrar from './registrar';

export class Ignitor {
  constructor(private appRoot: string) {
    this.addConfigProvider();
    this.addApplicationProvider();
    this.addLucidProviders();
  }

  ace() {
    return new Ace(this.appRoot);
  }

  private addConfigProvider() {
    ioc.singleton('Adonis/Core/Config', () => {
      return new Config(require(join(this.appRoot, 'lucidyfile')).default);
    });
  }

  private addApplicationProvider() {
    ioc.singleton('Adonis/Core/Application', () => {
      const namespacesMap = new Map();

      return {
        appRoot: this.appRoot,
        configPath: String,
        namespacesMap,
      };
    });
  }

  private addLucidProviders() {
    registrar
      .useProviders(['@adonisjs/profiler', '@adonisjs/logger', '@adonisjs/events', '@adonisjs/lucid'])
      .register();
  }
}
