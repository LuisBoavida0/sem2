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
        fail('the fail wasnt triggered with an existing user name')
    } catch (err) {
        assertEquals(err.message, 'userName existingUName already exists', 'The message Sent is incorrect') 
    }
})

//-------------- test Login function (Since it simply calls another function i only need this verification) --------------------------------
Deno.test('Login Logic - Check if it is running correctly', async () => {
    const obj = {}
    assertEquals(await login(obj), 'user', 'Login isnt working correctly') 
})

//-------------- test sendParcel function (Since it simply calls another functions i only need this verification)  --------------------------------
Deno.test('sendParcel - Check with correct values', async () => {
    const obj = {}
    assertEquals(await sendParcel(obj), true, 'Send parcel isnt working correctly') 
})

