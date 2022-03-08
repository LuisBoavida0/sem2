import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { loginDb, registerDb, userDoesntExistDb, isValidUUIDDb, addParcelDb } from '../modules/persistenceLayer/ORM.js'

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

//-------------- test registerDb function --------------------------------
Deno.test({
  name: 'registerDB - Correct values',
  async fn () { 
    const obj = {
        userName: 'existingUName',
        password: 'p455w0rd',
        email: 'existingUName@gmail.com'
    }
    assertEquals(await registerDb(obj), true, 'Register not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'registerDB - Empty data (throw error)',
  async fn () { 
    try {
      await registerDb()
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Cannot read properties of undefined (reading 'password')", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})


//-------------- test userDoesntExistDb function --------------------------------
Deno.test({
  name: 'userDoesntExistDb - Correct values',
  async fn () { 
    const username = 'NoUName'  //When the username doesnt exists it is supposed to return true
    assertEquals(await userDoesntExistDb(username), true, 'userDoesntExistDb not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'userDoesntExistDb - With existing username',
  async fn () { 
    const username = 'existingUName'  //When the username doesnt exists it is supposed to return true
    assertEquals(await userDoesntExistDb(username), false, 'userDoesntExistDb not returning false') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'userDoesntExistDb - throw error test',
  async fn () { 
    try {
      await userDoesntExistDb('throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, 'Error Thrown', 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test isValidUUIDDb function --------------------------------
Deno.test({
  name: 'isValidUUIDDb - Correct values',
  async fn () { 
    const UUID = 'noUUID'  //When the UUID doesnt exists it is supposed to return true, because this uuid is unique
    assertEquals(await isValidUUIDDb(UUID), true, 'isValidUUIDDb not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'isValidUUIDDb - existingUUID',
  async fn () { 
    const UUID = 'existingUUID'  //When the UUID exists it is supposed to return false
    assertEquals(await isValidUUIDDb(UUID), false, 'isValidUUIDDb not returning false') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'isValidUUIDDb - throw error test',
  async fn () { 
    try {
      await isValidUUIDDb('throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, 'Error Thrown', 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test addParcelDb function --------------------------------
Deno.test({
  name: 'addParcelDb - correct values',
  async fn () { 
    const obj = {
        trackingNumber: 'trackingNumber',
        senderAddress: 'address',
        destinationAddress: 'address',
        kgs: '20',
        parcelName: 'parcelName',
        dateAndTimeAdded: '22-11-2000 10:00:00',
        senderUsername: 'senderUsername',
        parcelStatus: 'parcelStatus'
    }
    assertEquals(await addParcelDb(obj), true, 'addParcel not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})


Deno.test({
  name: 'addParcelDb - invalid values (throw error)',
  async fn () { 
    try {
      await addParcelDb()
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Cannot read properties of undefined (reading 'trackingNumber')", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

