/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import { parse } from 'pg-connection-string'

let connection = {}
const dbUrl = Env.get('DATABASE_URL')
if (dbUrl !== undefined) {
  const conn: { [key: string]: any } = parse(dbUrl)
  conn.port = parseInt(conn.port)
  conn.ssl = { rejectUnauthorized: false }
  connection = conn
}

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | PostgreSQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for PostgreSQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i pg
    |
    */
    pg: {
      client: 'pg',
      connection:
        dbUrl !== undefined
          ? connection
          : {
              host: Env.get('POSTGRES_HOST'),
              port: Env.get('POSTGRES_PORT'),
              user: Env.get('POSTGRES_USER'),
              password: Env.get('POSTGRES_PASSWORD'),
              database: Env.get('POSTGRES_DB_NAME') + '_' + Env.get('NODE_ENV'),
            },

      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
