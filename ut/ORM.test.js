import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { loginDb, registerDb, userDoesntExistDb, isValidUUIDDb, addParcelDb, getUserParcelsDb, getParcelStatusDb, assignParcelDb, getCourierParcelsDb, getAvailableParcelsDb, deliverParcelDb, getCouriersInTransitDb, getDeliveredParcelsDb } from '../modules/persistenceLayer/ORM.js'

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
        userName: 'newUName',
        password: 'p455w0rd',
        email: 'newUName@gmail.com'
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

Deno.test({
  name: 'registerDB - db Error (throw error)',
  async fn () { 
    try {
      const obj = {
        userName: 'throwError',
        password: 'p455w0rd',
        email: 'throwError@gmail.com'
      }
      await registerDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
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

Deno.test({
  name: 'addParcelDb - db Error (throw error)',
  async fn () { 
    try {
      const obj = {
          trackingNumber: 'throwError',
          senderAddress: 'address',
          destinationAddress: 'address',
          kgs: '20',
          parcelName: 'parcelName',
          dateAndTimeAdded: '22-11-2000 10:00:00',
          senderUsername: 'senderUsername',
          parcelStatus: 'parcelStatus'
      }
      await addParcelDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getUserParcelsDb function --------------------------------
Deno.test({
  name: 'getUserParcelsDb - correct values',
  async fn () { 
    assertEquals(await getUserParcelsDb('username'), { parcelName: 'parcelName' }, 'get user parcels not returning correctly') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getUserParcelsDb - invalid values (throw error)',
  async fn () { 
    try {
      await getUserParcelsDb('throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getParcelStatusDb function --------------------------------
Deno.test({
  name: 'getParcelStatusDb - correct values',
  async fn () { 
    assertEquals(await getParcelStatusDb('trackingNumber'), 'not-dispatched', 'getParcelStatusDb not working correctly') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getParcelStatusDb - invalid values (throw error)',
  async fn () { 
    try {
      await getParcelStatusDb('throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getParcelStatusDb - No tracking number',
  async fn () { 
    try {
      await getParcelStatusDb('noTrackingNumber')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "No parcel found with that tracking number", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test assignParcelDb function --------------------------------
Deno.test({
  name: 'assignParcelDb - correct values',
  async fn () { 
    assertEquals(await assignParcelDb('trackingNumber', 'username'), true, 'assign parcel not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'assignParcelDb - invalid values (throw error)',
  async fn () { 
    try {
      await assignParcelDb('throwError', 'username')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getCourierParcelsDb function --------------------------------
Deno.test({
  name: 'getCourierParcelsDb - correct values',
  async fn () { 
    assertEquals(await getCourierParcelsDb('courier'), [{parcelName: 'parcelName'}], 'getCourierParcelsDb not working correctly') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getCourierParcelsDb - invalid values (throw error)',
  async fn () { 
    try {
      await getCourierParcelsDb('throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getCourierParcelsDb - No parcels assigned to courier',
  async fn () { 
    assertEquals(await getCourierParcelsDb('noParcelsCourier'), [], 'getCourierParcelsDb not returning correctly when there is no parcels') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getAvailableParcelsDb function --------------------------------
Deno.test({
  name: 'getAvailableParcelsDb - correct values',
  async fn () { 
    assertEquals(await getAvailableParcelsDb(25, 25), [{parcelName: 'parcelName'}], 'getAvailableParcelsDb not working correctly') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getAvailableParcelsDb - correct values without location',
  async fn () { 
    assertEquals(await getAvailableParcelsDb(false, false), [{parcelName: 'parcelNameNoLocation'}], 'getAvailableParcelsDb not working correctly') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getAvailableParcelsDb - invalid values (throw error)',
  async fn () { 
    try {
      await getAvailableParcelsDb('throwError', 'throwError')
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test deliverParcelDb function --------------------------------
Deno.test({
  name: 'deliverParcelDb - correct values',
  async fn () { 
    const obj = {
        trackingNumber: 'trackingNumber',
        personWhoReceivedParcel: 'Name',
        locationReceivedLat: '25',
        locationReceivedLng: '20',
        dateAndTimeReceived: '22-11-2000 10:00:00',
        signature: 'image'
    }
    assertEquals(await deliverParcelDb(obj), true, 'deliverParcelDb not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})


Deno.test({
  name: 'deliverParcelDb - invalid values (throw error)',
  async fn () { 
    try {
      await deliverParcelDb()
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Cannot read properties of undefined (reading 'personWhoReceivedParcel')", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'deliverParcelDb - db Error (throw error)',
  async fn () { 
    try {
      const obj = {
        trackingNumber: 'throwError',
        personWhoReceivedParcel: 'Name',
        locationReceivedLat: '25',
        locationReceivedLng: '20',
        dateAndTimeReceived: '22-11-2000 10:00:00',
        signature: 'image'
      }
      await deliverParcelDb(obj)
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getCouriersInTransitDb function --------------------------------
Deno.test({
  name: 'getCouriersInTransitDb - correct values',
  async fn () {
    assertEquals(await getCouriersInTransitDb(), true, 'getCouriersInTransitDb not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getCouriersInTransitDb - db Error (throw error)',
  async fn () { 
    try {
      await getCouriersInTransitDb()
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

//-------------- test getDeliveredParcelsDb function --------------------------------
Deno.test({
  name: 'getDeliveredParcelsDb - correct values',
  async fn () {
    assertEquals(await getDeliveredParcelsDb(), true, 'getDeliveredParcelsDb not returning true') 
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: 'getDeliveredParcelsDb - db Error (throw error)',
  async fn () { 
    try {
      await getDeliveredParcelsDb()
      fail('the function does not throw an exception as expected')
    } catch (err) {
      assertEquals(err.message, "Error Thrown", 'Message Error incorrect') 
    }
  },
  // following two options deactivate open resource checking
  sanitizeResources: false,
  sanitizeOps: false
})
