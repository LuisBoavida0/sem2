/**
 * businessLayer Module.
 * @module businessLayer
 */

import { getUUID, getDateIsosFormat } from './generalLogic.js'
import { loginDb, registerDb, userDoesntExistDb, addParcelDb, getUserParcelsDb, isValidUUIDDb, getParcelStatusDb, assignParcelDb, getCourierParcelsDb, getAvailableParcelsDb, deliverParcelDb } from '../persistenceLayer/ORM.js'

/**
 * Register layer, calls function to register if the username doesnt exist
 * @async
 * @function register
 * @param obj Information needed to register.
 * @param obj.userName The username of the user.
 * @param obj.email The email of the user.
 * @param obj.password The password of the user.
 * @returns {boolean} true if UUID doesnt exists and false if it does.
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
 * @param data Information about the user.
 * @param data.userName The username of the user.
 * @param data.password The password of the user.
 * @returns {string} the userType of the user.
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
 * @param obj Information about the user.
 * @param obj.senderAddress The sender Address of the parcel.
 * @param obj.destinationAddress The destination Address of the parcel.
 * @param obj.kgs The kilograms of the parcel.
 * @param obj.parcelName The name of the parcel.
 * @param obj.parcelStatus The status of the parcel.
 * @returns {boolean} true if parcel was added.
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
 * Gets the parcels by calling an ORM function according to the user type and username, and returns it
 * @async
 * @function getParcels
 * @param {string} userType Contains the user type
 * @param {string} userName Contains the user name
 * @returns {Dictionary<string>} An object containing the parcels
 */
export const getParcels = async (userType, userName) => {
    try {
        switch(userType) {       
            case 'user':
                return await getUserParcelsDb(userName)
            case 'courier':
                return await getCourierParcelsDb(userName)
            /*case 'manager':
                return await getManagerParcelsDb(userName)*/
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
        //If the tracking number is valid
        if (await getParcelStatusDb(obj.trackingNumber) !== 'in-transit') throw new Error('The parcel needs to be in transit in order to deliver it')
        return await deliverParcelDb(obj)   //Delivers the parcel
	} catch (err) {
        throw err
	}
}
