import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { register, login, sendParcel } from '../modules/businessLayer/businessLayer.js'

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

//-------------- test Login function (Since it simply calls another function i only need this verification) --------------------------------
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

//-------------- test sendParcel function (Since it simply calls another functions i only need this verification)  --------------------------------
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