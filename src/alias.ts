import 'reflect-metadata';
import alias from 'module-alias';
import { join } from 'path';

alias.addAlias('@ioc:Adonis/Lucid', join(__dirname, 'adonis', 'lucid'));
alias.addAlias('@ioc:Adonis/Core', join(__dirname, 'adonis', 'core'));
