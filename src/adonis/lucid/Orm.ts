import ioc from '../../ioc';

const { BaseModel, scope } = ioc.use('Adonis/Lucid/Orm');

export { BaseModel, scope };
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
