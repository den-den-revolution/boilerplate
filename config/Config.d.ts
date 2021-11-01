/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    database: Database
    auth: Auth
  }
  interface Auth {
    secret: string
  }
  interface Database {
    host: string
    password: string
    name: string
  }
  export const config: Config
  export type Config = IConfig
}
