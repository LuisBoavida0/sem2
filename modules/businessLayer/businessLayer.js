/**
 * businessLayer Module.
 * @module businessLayer
 */

import { getUUID, getDateIsosFormat } from './generalLogic.js'
import { loginDb, registerDb, userDoesntExistDb, addParcelDb, getUserParcelsDb, isValidUUIDDb, getParcelStatusDb, assignParcelDb } from '../persistenceLayer/ORM.js'

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
                return {}//await getCourierParcelsDb(userName)
            case 'manager':
                //return await getManagerParcelsDb(userName)
                break
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
    if (await isValidUUIDDb(trackingNumber)) throw new Error('tracking number doesnt exist') //If parcel doesnt exists 
    
    const parcelStatus = await getParcelStatusDb(trackingNumber)    //Gets the parcel status
    switch(parcelStatus) {
        case 'not-dispatched':
            await assignParcelDb(trackingNumber, userName)  //Assigns the parcel to the courier
            return 'Parcel Assigned'
        case 'in-transit':
            return 'Parcel in transit'
        case 'delivered':
            throw new Error('This Parcel has already been delivered')            
        default:
            throw new Error('There was an error with this parcel')
    }
}