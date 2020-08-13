import 'reflect-metadata';
import alias from 'module-alias';
import { join } from 'path';

alias.addAlias('@ioc:Adonis/Lucid', join(__dirname, 'lucid'));
