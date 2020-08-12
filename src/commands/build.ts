import hasYarn from 'has-yarn';
import { BaseCommand, flags } from '@adonisjs/ace';
import { APP_ROOT, NPM_ROOT } from '../config';

export default class Build extends BaseCommand {
  public static commandName = 'build';
  public static description = 'Compile typescript code to Javascript. Optionally watch for file changes';

  @flags.boolean({
    description: 'Watch filesystem and re-compile changes',
    alias: 'w',
  })
  public watch: boolean;

  @flags.boolean({ description: 'Build for production', alias: 'prod' })
  public production: boolean;

  @flags.string({
    description: 'Select the package manager to decide which lock file to copy to the build folder',
  })
  public client: string;

  @flags.boolean({
    description: 'Detect file changes by polling files instead of listening to filesystem events',
    alias: 'p',
  })
  public poll: boolean;

  public async handle() {
    const { Watcher } = await import('@adonisjs/assembler/build/src/Watcher');
    const { Compiler } = await import('@adonisjs/assembler/build/src/Compiler');

    if (this.watch && this.production) {
      this.logger.info('--watch and --production flags cannot be used together. Skipping --watch');
    }

    this.client = this.client || hasYarn(APP_ROOT) ? 'yarn' : 'npm';
    if (this.client !== 'npm' && this.client !== 'yarn') {
      this.logger.warn('--client must be set to "npm" or "yarn"');
      return;
    }

    try {
      if (this.production) {
        await new Compiler('PPPPPPPP', false, [], this.logger).compileForProduction(this.client);
      } else if (this.watch) {
        await new Watcher('IIIIIIIIIIII', false, [], this.logger).watch(this.poll);
      } else {
        await this.compile(false);
      }
    } catch (error) {
      this.logger.fatal(error);
    }
  }

  private async compile(serveApp: boolean) {
    const { Compiler } = await import('@adonisjs/assembler/build/src/Compiler');
    const compiler = new Compiler(APP_ROOT, false, [], this.logger);
    const config = compiler.parseConfig();

    if (!config) {
      return false;
    }

    await compiler.cleanupBuildDirectory(config.options.outDir!);
    compiler.buildTypescriptSource(config);

    if (serveApp) {
      await compiler.createHttpServer(config.options.outDir!);
      compiler.httpServer.start();
    }
  }
}
