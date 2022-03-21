import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { register, login, sendParcel, getParcels } from '../modules/businessLayer/businessLayer.js'

//-------------- test register function --------------------------------
Deno.test('register Logic - Correct values', async () => {
    const obj = {
        userName: 'nonExistingUName'
    }
    assertEquals(await register(obj), true, 'register isnt returning true with valid values') 
})

Deno.test('register Logic - with an existing user name', async () => {
    try {
        const obj = { userName: 'existingUName' }
        await register(obj)
        fail('the function wasnt triggered with an error of existing user name')
    } catch (err) {
        assertEquals(err.message, 'userName existingUName already exists', 'The message Sent is incorrect') 
    }
})

Deno.test('register Logic - empty obj', async () => {
    try {
        const obj = {}
        await register(obj)
        fail('the function wasnt triggered with an error of existing user name')
    } catch (err) {
        assertEquals(err.message, 'Failed assertion: the function wasnt triggered with an error of existing user name', 'The message Sent is incorrect') 
    }
})

//-------------- test Login function --------------------------------
Deno.test('Login Logic - Check if it is running correctly', async () => {
    const obj = {}
    assertEquals(await login(obj), 'user', 'Login isnt working correctly') 
})

Deno.test('Login Logic - Error thrown', async () => {
    try {
        const obj = 'throwError'
        await login(obj)
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'Error thrown', 'The message Sent is incorrect') 
    }
})

//-------------- test sendParcel function  --------------------------------
Deno.test('sendParcel - Check with correct values', async () => {
    const obj = {}
    assertEquals(await sendParcel(obj, 'username'), true, 'Send parcel isnt working correctly') 
})

Deno.test('sendParcel - Error thrown', async () => {
    try {
        const obj = 'stringToThrowError'
        await sendParcel(obj, 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Cannot create property 'trackingNumber' on string 'stringToThrowError'", 'The message Sent is incorrect') 
    }
})

//-------------- test getParcels function  --------------------------------
Deno.test('getParcels - Check with correct values', async () => {
    assertEquals(await getParcels('user', 'username'), { parcelName: 'parcelName' }, 'getParcel isnt returning the correct value') 
})

Deno.test('getParcels - Non existing userType error thrown', async () => {
    try {
        await getParcels('nonUserType', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "UserType Not found", 'The message Sent is incorrect') 
    }
})

Deno.test('getParcels - userName without parcels ', async () => {
    assertEquals(await getParcels('user', 'userNameNoParcels'), {}, 'getParcel isnt returning the correct value') 
})

Deno.test('getParcels - db call error', async () => {
    try {
        await getParcels('user', 'throwError')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Error Thrown", 'The message Sent is incorrect') 
    }
})
