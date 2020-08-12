/// <reference path="./ace.ts" />
/// <reference path="./ignitor.ts" />
/// <reference path="./ioc.ts" />
/// <reference path="./registrar.ts" />

declare module '@ioc:Adonis/Core/Application' {
  export interface ApplicationContract {
    readonly npmBuild?: string;
  }
}
