import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { register, login, sendParcel, getParcels, manageParcel, getAvailableParcels, deliverParcel, getDeliveredParcels } from '../modules/businessLayer/businessLayer.js'

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
Deno.test('getParcels - Non existing userType error thrown', async () => {
    try {
        await getParcels('nonUserType', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "UserType Not found", 'The message Sent is incorrect')
    }
})

// USER
Deno.test('getParcels Users - Check with correct values', async () => {
    assertEquals(await getParcels('user', 'username'), { parcelName: 'parcelName' }, 'getParcel isnt returning the correct value')
})

Deno.test('getParcels Users - userName without parcels ', async () => {
    assertEquals(await getParcels('user', 'userNameNoParcels'), {}, 'getParcel isnt returning the correct value')
})

Deno.test('getParcels Users - db call error', async () => {
    try {
        await getParcels('user', 'throwError')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Error Thrown", 'The message Sent is incorrect')
    }
})

// COURIER
Deno.test('getParcels Courier - Check with correct values', async () => {
    assertEquals(await getParcels('courier', 'username'), { parcelName: 'parcelName' }, 'getParcel isnt returning the correct value')
})

Deno.test('getParcels Courier - userName without parcels ', async () => {
    assertEquals(await getParcels('courier', 'userNameNoParcels'), {}, 'getParcel isnt returning the correct value')
})

Deno.test('getParcels Courier - db call error', async () => {
    try {
        await getParcels('courier', 'throwError')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Error Thrown", 'The message Sent is incorrect')
    }
})

//  manager
Deno.test('getParcels manager - Check with correct values', async () => {
    assertEquals(await getParcels('manager', 'manager'), [
        {
            assignedCourier: "Name1",
            parcels: { parcelName: "parcelName" },
            numParcels: undefined
        },
        {
            assignedCourier: "Name2",
            parcels: { parcelName: "parcelName" },
            numParcels: undefined
        }
    ], 'getParcels isnt returning the correct value')
})

//-------------- test manageParcel function  --------------------------------
Deno.test('manageParcel - Check with invalid UUID', async () => {
    try {
        await manageParcel('nonExistingUUID', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "tracking number doesnt exist", 'The message Sent is incorrect')
    }
})

Deno.test('manageParcel - Check with invalid parcel status', async () => {
    try {
        await manageParcel('UUIDParcelStatusError', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Error Thrown", 'The message Sent is incorrect')
    }
})

Deno.test('manageParcel - not-dispached parcel status ', async () => {
    assertEquals(await manageParcel('UUIDParcelStatusNot-dispatched', 'username'), 'Parcel Assigned', 'manage parcel isnt returning the correct value')
})

Deno.test('manageParcel - not-dispached parcel status error', async () => {
    try {
        await manageParcel('UUIDParcelStatusNot-dispatched', 'throwError')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "Error thrown assign Parcel", 'The message Sent is incorrect')
    }
})

Deno.test('manageParcel - in-transit', async () => {
    assertEquals(await manageParcel('UUIDParcelStatusIn-transit', 'username'), 'in-transit', 'manage parcel isnt returning the correct value')
})

Deno.test('manageParcel - delivered', async () => {
    try {
        await manageParcel('UUIDParcelStatusDelivered', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "This Parcel has already been delivered", 'The message Sent is incorrect')
    }
})

Deno.test('manageParcel - default', async () => {
    try {
        await manageParcel('UUIDParcelStatusOther', 'username')
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, "There was an error with this parcel", 'The message Sent is incorrect')
    }
})

//-------------- test getAvailableParcels function  --------------------------------
Deno.test('getAvailableParcels Logic - Check if it is running correctly', async () => {
    assertEquals(await getAvailableParcels(20, 40), 'success', 'getAvailableParcels isnt working correctly')
})

Deno.test('getAvailableParcels Logic - Check if it is running correctly without location', async () => {
    assertEquals(await getAvailableParcels(false, false), 'success', 'getAvailableParcels isnt working correctly')
})

Deno.test('getAvailableParcels Logic - Error thrown', async () => {
    try {
        await getAvailableParcels("throwError", "throwError")
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'Error thrown', 'The message Sent is incorrect')
    }
})


//-------------- test deliverParcel function  --------------------------------
Deno.test('deliverParcel - Check with correct data', async () => {
    const obj = {
        trackingNumber: 'UUIDParcelStatusIn-transit',
        personWhoReceivedParcel: 'Name'
    }
    assertEquals(await deliverParcel(obj), true, 'deliverParcel not working correctly')
})

Deno.test('deliverParcel - Check with tracking number not in transit', async () => {
    try {
        const obj = {
            trackingNumber: 'UUIDParcelStatusNot-dispatched',
            personWhoReceivedParcel: 'Name'
        }
        await deliverParcel(obj)
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'The parcel needs to be in transit in order to deliver it', 'The message Sent is incorrect')
    }
})

Deno.test('deliverParcel - Check with tracking number throwing error', async () => {
    try {
        const obj = {
            trackingNumber: 'UUIDParcelStatusError',
            personWhoReceivedParcel: 'Name'
        }
        await deliverParcel(obj)
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'Error Thrown', 'The message Sent is incorrect')
    }
})

Deno.test('deliverParcel - Check with deliverParcelDb error', async () => {
    try {
        const obj = {
            trackingNumber: 'UUIDParcelStatusIn-transit',
            personWhoReceivedParcel: 'throwError'
        }
        await deliverParcel(obj)
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'Error thrown', 'The message Sent is incorrect')
    }
})

//-------------- test deliverParcel function  --------------------------------
Deno.test('getDeliveredParcels - Check correctly', async () => {
    assertEquals(await getDeliveredParcels(), true, 'The message Sent is incorrect')
})

Deno.test('getDeliveredParcels - with error', async () => {
    try {
        await getDeliveredParcels()
        fail('the function hasnt thrown an error like it was supposed to')
    } catch (err) {
        assertEquals(err.message, 'Error thrown', 'The message Sent is incorrect')
    }
})
 