import { Registrar } from '@adonisjs/fold';
import ioc from './ioc';

const registrar = new Registrar(ioc);

export default registrar;
