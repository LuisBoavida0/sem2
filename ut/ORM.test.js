import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { loginDb } from '../modules/persistenceLayer/ORM.js'

//-------------- test loginDb function --------------------------------
//There was an error of leaking resources because of the bcrypt import in ORM.js (for the compare, genSalt and hash functions)
//To solve this I need to run the DB tests like this
//https://medium.com/swlh/deno-test-case-is-leaking-resources-139b296db0c1
Deno.test({
  name: 'loginDB - Correct values',
  async fn () { 
    const obj = {
        userName: 'existingUName',
        password: 'p455w0rd'
    }
    assertEquals(await loginDb(obj), 'user', 'Login not returning correct value') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'loginDB - Non-existing userName',
  async fn () { 
    try {
      const obj = {
          userName: 'NoUName',
          password: 'p455w0rd'
      }
      await loginDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "userName 'NoUName' not found", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'loginDB - incorrect password',
  async fn () { 
    try {
      const obj = {
          userName: 'existingUName',
          password: 'incorrectPassword'
      }
      await loginDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "invalid password for account 'existingUName'", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})


Deno.test({
  name: 'loginDB - both invalid values',
  async fn () { 
    try {
      const obj = {
          userName: 'NoUName',
          password: 'incorrectPassword'
      }
      await loginDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "userName 'NoUName' not found", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})