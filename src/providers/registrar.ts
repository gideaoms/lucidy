import { Registrar } from '@adonisjs/fold';
import ioc from '../ioc';

const registrar = new Registrar(ioc);

registrar
  .useProviders(['@adonisjs/profiler', '@adonisjs/logger', '@adonisjs/events', '@adonisjs/lucid'])
  .register();

export default registrar;
