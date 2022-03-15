/**
 * businessLayer Module.
 * @module businessLayer
 */

import { getUUID, getDateIsosFormat } from './generalLogic.js'
import { loginDb, registerDb, userDoesntExistDb, addParcelDb } from '../persistenceLayer/ORM.js'

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
