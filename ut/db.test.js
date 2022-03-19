import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from '../modules/persistenceLayer/db.js'

Deno.test({
  name: 'db - check connection',
  async fn () { 
    try {
        const db2 = db
        const records = await db.query('SELECT * FROM users;')
        if(!records[0]) throw new Error('database not working')
        assertEquals(1, 1)
    } catch (err) {
        fail('Database not working')
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'db - throw error',
  async fn () { 
    try {
        const records = await db.query('SELECT * FROM userss;')
        fail('incorrect table not throwing an error')
    } catch (err) {
        assertEquals(err.message, "Table 'website.userss' doesn't exist", 'Not the correct message')
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})