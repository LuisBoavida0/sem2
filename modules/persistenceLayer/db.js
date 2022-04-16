/**
 * DB Module.
 * @module db
 */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

/** Get the project path 
 * @constant home
 */
const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

/** Contains all possible mysql connections
 * @constant connectionData
 */
const connectionData = {  //Connection data 
  '/home/codio':  {
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
  },
  '/app': {
		hostname: 'sql4.freemysqlhosting.net',
    username: 'sql4486255',
    password: 'cfR6lA2pnn',
    db: 'sql4486255'
  }
}

/** Contains the mysql correct connection according to the place where the project is
 * @constant conn */
const conn = connectionData[home]

/** Contains the Db information to be able to do queries 
 * @constant db
 * @example
 * db.query('SELECT * FROM TABLES;') */
export const db = await new Client().connect(conn)
