/**
 * ORM Module.
 * @module ORM
 */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

/**
 * Checks user credentials.
 * @async
 * @function loginDb
 * @param data Information about the user.
 * @param data.userName The username of the user.
 * @param data.password The password of the user.
 * @returns {string} the userType of the user.
 * @throws Throws error if Username not found, or invalid password or db error
 */
export async function loginDb(data) {
	try {		
        const records = await db.query(`SELECT userType, password FROM users WHERE userName = '${data.userName}';`)

		if(!records[0]) throw new Error(`userName '${data.userName}' not found`)	//If userName is incorrect
	
		const samePwd = await compare(data.password, records[0].password)	//Compares the two passwords

		if (!samePwd) throw new Error(`invalid password for account '${data.userName}'`)	//password invalid
    
		console.log(`This username has logged in : ${data.userName}`)
		return records[0].userType	//returns userType
    } catch (err) {
        throw err
    }
}
	
/**
 * Registers a user.
 * @async
 * @function registerDb
 * @param data Information about the user.
 * @param data.userName The username of the user.
 * @param data.password The password of the user.
 * @param data.email The email of the user.
 * @returns {boolean} true if the user is successfully created.
 * @throws Throws db error
 */
export async function registerDb(data) {
	try {
		const password = await hash(data.password, salt)	//hashes the password
		await db.query(`INSERT INTO users(userName, email, password) VALUES('${data.userName}', '${data.email}', '${password}')`)	//Creates the user
		return true
	} catch (err) {
        throw err
    }
}

/**
 * Checks if user doesnt exists.
 * @async
 * @function userDoesntExistDb
 * @param {string} username The username to see if it exists.
 * @returns {boolean} true if the user doesnt exists and false if it does.
 * @throws Throws db error
 */
export async function userDoesntExistDb(username) {
	try {
		const records = await db.query(`SELECT userType FROM users WHERE userName = '${username}';`)
		if (!records[0]) return true	//If there isnt any users with that name
		return false
	} catch (err) {
        throw err
    }
}

/**
 * Checks if UUID is valid.
 * @async
 * @function isValidUUIDDb
 * @param {string} UUID The UUID.
 * @returns {boolean} true if UUID doesnt exists and false if it does.
 * @throws Throws db error
 */
export async function isValidUUIDDb(UUID) {
	try {
		const records = await db.query(`SELECT trackingNumber FROM parcels WHERE trackingNumber = '${UUID}';`)
		if (!records[0]) return true	//If there isnt any parcel with that UUID
		return false
	} catch (err) {
        throw err
    }
}

/**
 * Adds a parcel.
 * @async
 * @function addParcelDb
 * @param data Information about the parcel.
 * @param data.trackingNumber The tracking number of the parcel.
 * @param data.senderAddress The sender Address of the parcel.
 * @param data.destinationAddress The destination Address of the parcel.
 * @param data.destinationLat The latitude of the destination.
 * @param data.destinationLng The longitude of the destination.
 * @param data.kgs The kilograms of the parcel.
 * @param data.parcelName The name of the parcel.
 * @param data.dateAndTimeAdded The date and time that the parcel was added.
 * @param data.senderUsername The username of the person sending the parcel.
 * @param data.parcelStatus The status of the parcel.
 * @returns {boolean} true if the parcel is successfully created.
 * @throws Throws db error or if any field doesnt exists on the object
 */
export async function addParcelDb(data) {
	try {
		//Adds the parcel with all the information needed
		await db.query(`INSERT INTO parcels(trackingNumber, senderAddress, destinationAddress, destinationLat, destinationLng, kgs, parcelName, dateAndTimeAdded, senderUsername, parcelStatus) VALUES('${data.trackingNumber}', '${data.senderAddress}', '${data.destinationAddress}', ${data.destinationLat}, ${data.destinationLng}, ${data.kgs}, '${data.parcelName}', '${data.dateAndTimeAdded}', '${data.senderUsername}', '${data.parcelStatus}');`)
		return true
	} catch (err) {
        throw err
    }
}

/**
 * Gets the user parcels.
 * @async
 * @function getUserParcelsDb
 * @param {string} user the user.
 * @returns {Dictionary<string>} An object containing: 
 * Parcel name (parcelName), 
 * the destination address (destinationAddress),
 * the datetime that the parcel was created (dateAndTimeAdded),
 * and the parcel status (parcelStatus).
 * @throws Throws db error
 */
export async function getUserParcelsDb(user) {
	try {
		return await db.query(`SELECT parcelName, destinationAddress, dateAndTimeAdded, parcelStatus FROM parcels WHERE senderUsername = '${user}';`)
	} catch (err) {
        throw err
    }
}

/**
 * Gets the parcel status.
 * @async
 * @function getParcelStatusDb
 * @param {string} trackingNumber The tracking number of the parcel.
 * @returns {string} Returns the parcel status
 * @throws Throws db error or if there is no parcel with that tracking number
 */
export async function getParcelStatusDb(trackingNumber) {
	try {
		const records = await db.query(`SELECT parcelStatus FROM parcels WHERE trackingNumber = '${trackingNumber}'`)
		
		//If no parcels with that tracking number, throw error
		if (!records[0]) throw new Error('No parcel found with that tracking number')
		
		return records[0].parcelStatus
	} catch (err) {
        throw err
    }
}

/**
 * Assigns the parcel to a courier.
 * @async
 * @function assignParcelDb
 * @param {string} trackingNumber The tracking number of the parcel.
 * @param {string} userName The userName of the courier that the parcel will be assigned.
 * @returns {boolean} true if parcel was assigned to the courier
 * @throws Throws db error
 */
export async function assignParcelDb(trackingNumber, userName) {
	try {
		await db.query(`UPDATE parcels SET assignedCourier = '${userName}', parcelStatus = 'in-transit' WHERE trackingNumber = '${trackingNumber}';`)
		return true
	} catch (err) {
        throw err
    }
}

/**
 * Gets the courier parcels.
 * @async
 * @function getCourierParcelsDb
 * @param {string} courier The courier userName.
 * @returns {Dictionary<string>} An object containing: 
 * The tracking number (trackingNumber),
 * Parcel name (parcelName), 
 * the destination address (destinationAddress),
 * the datetime that the parcel was created (dateAndTimeAdded),
 * and the kilograms (kgs).
 * @throws Throws db error
 */
export async function getCourierParcelsDb(courier) {
	try {
		return await db.query(`SELECT trackingNumber, parcelName, destinationAddress, dateAndTimeAdded, kgs FROM parcels WHERE assignedCourier = '${courier}' AND parcelStatus != 'delivered' ORDER BY dateAndTimeAdded;;`)
	} catch (err) {
        throw err
    }
}

/**
 * Gets the available parcels for the couriers.
 * If the location permission was accepted, it will order them by distance, if not, order them by date added
 * @async
 * @function getAvailableParcelsDb
 * @param {string} lat The latitude of the user.
 * @param {string} lng The longitude of the user.
 * @returns {Dictionary<string>} An object containing: 
 * Tracking number (trackingNumber),
 * Parcel name (parcelName), 
 * the sender address (senderAddress),
 * the destination address (destinationAddress),
 * the datetime that the parcel was created (dateAndTimeAdded),
 * the latitude of the destination (destinationLat),
 * and the longitude of the destination (destinationLng).
 * @throws Throws db error
 */
export async function getAvailableParcelsDb(lat, lng) {
	try {
		//Gets the parcel without the location
		if (lat === false)
			return await db.query(`SELECT trackingNumber, parcelName, senderAddress, destinationAddress, dateAndTimeAdded, destinationLat, destinationLng FROM parcels WHERE parcelStatus = 'not-dispatched' ORDER BY dateAndTimeAdded;`)
		
		//Gets the parcels ordered by distance
		return await db.query(`SELECT trackingNumber, parcelName, senderAddress, destinationAddress, dateAndTimeAdded, destinationLat, destinationLng, SQRT( POW(69.1 * (destinationLat - ${lat}), 2) + POW(69.1 * (${lng} - destinationLng) * COS(destinationLat / 57.3), 2)) AS distance FROM parcels WHERE parcelStatus = 'not-dispatched' ORDER BY distance;`)
	} catch (err) {
        throw err
    }
}

/**
 * Delivers a parcel.
 * @async
 * @function deliverParcelDb
 * @param {Dictionary<string>} obj object containing these values:
 * @param obj.trackingNumber - The tracking number of the parcel
 * @param obj.personWhoReceivedParcel  - The full name of the person receiving the parcel
 * @param obj.locationReceivedLat - The latitude of the received place
 * @param obj.locationReceivedLng - The longitude of the received place
 * @param obj.dateAndTimeReceived - The date and time when the parcel was delivered
 * @param obj.signature - The image containing the signature
 * @returns {boolean} true if the parcel was successfully delivered.
 * @throws Throws db error
 */
export async function deliverParcelDb(obj) {
	try {
		await db.query(`UPDATE parcels SET personWhoReceivedParcel = '${obj.personWhoReceivedParcel}', locationReceivedLat = '${obj.locationReceivedLat}', locationReceivedLng = '${obj.locationReceivedLng}', dateAndTimeReceived = '${obj.dateAndTimeReceived}', signature='${obj.signature}', parcelStatus = 'delivered' WHERE trackingNumber = '${obj.trackingNumber}';`)
		return true
	} catch (err) {
        throw err
    }
}

/**
 * Gets the couriers with parcels to deliver.
 * @async
 * @function getCouriersInTransitDb
 * @returns {Dictionary<string>} An object containing all the couriers with parcels to deliver (Only has one field named assignedCourier)
 * @throws Throws db error
 */
export async function getCouriersInTransitDb() {
	try {
		return await db.query(`SELECT DISTINCT assignedCourier from parcels WHERE parcelStatus='in-transit';`)
	} catch (err) {
        throw err
    }
}

/**
 * Gets the delivered parcels
 * @async
 * @function getDeliveredParcelsDb
 * @returns {Dictionary<string>} An object containing: 
 * Tracking number (trackingNumber),
 * Parcel name (parcelName), 
 * and the destination address (destinationAddress),
 * @throws Throws db error
 */
export async function getDeliveredParcelsDb() {
	try {
		return await db.query(`SELECT trackingNumber, parcelName, destinationAddress FROM parcels WHERE parcelStatus = 'delivered' ORDER BY dateAndTimeAdded DESC;`)
	} catch (err) {
        throw err
    }
}
