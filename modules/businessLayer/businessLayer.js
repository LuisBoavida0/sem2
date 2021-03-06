/**
 * businessLayer Module.
 * @module businessLayer
 */

import { getUUID, getDateIsosFormat } from './generalLogic.js'
import { loginDb, registerDb, userDoesntExistDb, addParcelDb, getUserParcelsDb, isValidUUIDDb, getParcelStatusDb, assignParcelDb, getCourierParcelsDb, getAvailableParcelsDb, deliverParcelDb, getCouriersInTransitDb, getDeliveredParcelsDb } from '../persistenceLayer/ORM.js'

/**
 * Register layer, calls function to register if the username doesnt exist
 * @async
 * @function register
 * @param obj Information needed to register.
 * @param obj.userName The username of the user.
 * @param obj.email The email of the user.
 * @param obj.password The password of the user.
 * @returns {boolean} true if User is created
 * @throws If it was not possible to register
 */
export const register = async (obj) => { 
    try {
        if (await userDoesntExistDb(obj.userName)) { //Checks If the user doesnt exists
            await registerDb(obj)   //Tries to register
            return true
        }  
        else 
            throw new Error(`userName ${obj.userName} already exists`)  //If user already exists throw error
	} catch (err) {
        throw err
    }
}

/**
 * Login layer, calls function to Login
 * @async
 * @function login
 * @param obj Information about the user.
 * @param obj.userName The username of the user.
 * @param obj.password The password of the user.
 * @returns {string} the userType of the user.
 * @throws If it was not possible to Login
 */
export const login = async (obj) => {
    try {
        return await loginDb(obj)   //Tries to login (Will throw a customised error message according to the problem), returns userType
	} catch (err) {
        throw err
	}
}

/**
 * Send Parcel layer, adds missing values and calls a function to add the parcel
 * @async
 * @function sendParcel
 * @param obj Information about the user, Such as:
 * @param obj.senderAddress The sender Address of the parcel.
 * @param obj.destinationAddress The destination Address of the parcel.
 * @param obj.destinationLat The latitude of the destination.
 * @param obj.destinationLng The longitude of the destination.
 * @param obj.kgs The kilograms of the parcel.
 * @param obj.parcelName The name of the parcel.
 * @param obj.parcelStatus The status of the parcel.
 * @param username The userName of the sender
 * @returns {boolean} true if parcel was added.
 * @throws If it was not possible to send the parcel, throw error
 */
export const sendParcel = async (obj, username) => {
    try {
        //Adds Missing values
        obj.trackingNumber = await getUUID()  //Gets a valid UUID
        obj.dateAndTimeAdded = getDateIsosFormat()  //Gets the current date
        obj.senderUsername = username
        obj.parcelStatus = 'not-dispatched'

        await addParcelDb(obj)  //Adds the parcel to the database
        return true
	} catch (err) {
        throw err
	}
}

/**
 * Gets the parcels by calling an ORM function according to the user type and username, and returns it.
 * If it is a manager than its different
 * @async
 * @function getParcels
 * @param {string} userType Contains the user type
 * @param {string} userName Contains the user name
 * @returns {Dictionary<string>} An object containing the parcels
 * @throws Any error that encountered
 */
export const getParcels = async (userType, userName) => {
    try {
        switch(userType) {       
            case 'user':    //If user, Get user parcels
                return await getUserParcelsDb(userName)
            case 'courier':    //If courier, Get courier assigned parcels
                return await getCourierParcelsDb(userName)
            case 'manager': {    //If manager, Get all in-transit couriers and their assigned parcels
                const couriers = await getCouriersInTransitDb() //Gets the couriers in transit
                for (let i=0; i < couriers.length; i++) {   //Goes through each courier
                    // deno-lint-ignore no-await-in-loop
                    couriers[i].parcels = await getCourierParcelsDb(couriers[i].assignedCourier)    //Gets his in-transit parcels (Had to use deno lint ignore because the way to not use await in a loop doesnt work in this type of list)
                    couriers[i].numParcels = couriers[i].parcels.length //Adds the number of parcels in-transit
                }
                return couriers //returns the couriers with the parcels
            }
            default:
                throw new Error('UserType Not found')
        }
    } catch (err) {
        throw err
    }
}

/**
 * Manages the parcel, checks the parcel status, and acts accordingly.
 * @async
 * @function manageParcel
 * @param {string} trackingNumber Contains the tracking number of the parcel
 * @param {string} userName Contains the user name of the courier
 * @returns {string} The success message to send to the page
 * @throws If the parcel is not valid or it has been delivered, it throws an error to be shown on the page
 */
export const manageParcel = async (trackingNumber, userName) => {
    try {
        if (await isValidUUIDDb(trackingNumber)) throw new Error('tracking number doesnt exist') //If parcel doesnt exist, throw error 
    
        const parcelStatus = await getParcelStatusDb(trackingNumber)    //Gets the parcel status
        switch(parcelStatus) {
            case 'not-dispatched':
                await assignParcelDb(trackingNumber, userName)  //Assigns the parcel to the courier
                return 'Parcel Assigned'
            case 'in-transit':
                return 'in-transit'
            case 'delivered':
                throw new Error('This Parcel has already been delivered')            
            default:
                throw new Error('There was an error with this parcel')
        }
    } catch (err) {
        throw err
    }
}

/**
 * Available Parcels layer, calls function to get the Available parcels for the couriers
 * @async
 * @function getAvailableParcels
 * @param {string} lat The latitude of the user
 * @param {string} lng The longitude of the user
 * @returns {Dictionary<string>} An object containing the available parcels
 */
export const getAvailableParcels = async (lat, lng) => {
    try {
        return await getAvailableParcelsDb(lat, lng)    //Gets the available parcels ordered by distance (if the location permission was accepted)
	} catch (err) {
        throw err
	}
}

/**
 * deliver Parcel layer, calls function to deliver a parcel
 * @async
 * @function deliverParcel
 * @param {Dictionary<string>} obj object containing these values:
 * @param obj.trackingNumber - The tracking number of the parcel
 * @param obj.personWhoReceivedParcel  - The full name of the person receiving the parcel
 * @param obj.locationReceivedLat - The latitude of the received place
 * @param obj.locationReceivedLng - The longitude of the received place
 * @param obj.dateAndTimeReceived - The date and time when the parcel was delivered
 * @param obj.signature - The image containing the signature of the receiver
 * @returns {boolean} true if parcel was delivered.
 * @throws If error, throw message
 */
export const deliverParcel = async (obj) => {
    try {
        //If the parcel is not in-transit, throw error
        if (await getParcelStatusDb(obj.trackingNumber) !== 'in-transit') throw new Error('The parcel needs to be in transit in order to deliver it')
        return await deliverParcelDb(obj)   //Delivers the parcel
	} catch (err) {
        throw err
	}
}

/**
 * Delivered Parcels layer, calls function to get the parcels delivered
 * @async
 * @function getDeliveredParcels
 * @returns {Dictionary<string>} An object containing all delivered parcels
 * @throws If error, throw message
 */
export const getDeliveredParcels = async () => {
    try {
        return await getDeliveredParcelsDb()
	} catch (err) {
        throw err
	}
}
