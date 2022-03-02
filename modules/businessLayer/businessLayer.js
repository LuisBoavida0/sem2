import { getUUID, getDateIsosFormat } from './generalLogic.js'
import { loginDb, registerDb, userDoesntExistDb, addParcelDb } from '../persistenceLayer/ORM.js'


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

export const login = async (obj) => {
    try {
        return await loginDb(obj)   //Tries to login (Will throw a customised error message according to the problem), returns userType
	} catch (err) {
        throw err
	}
}

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
