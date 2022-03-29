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
 * @throws Throws error if Username not found or invalid password
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
 * @param data.kgs The kilograms of the parcel.
 * @param data.parcelName The name of the parcel.
 * @param data.dateAndTimeAdded The date and time that the parcel was added.
 * @param data.senderUsername The username of the person sending the parcel.
 * @param data.parcelStatus The status of the parcel.
 * @returns {boolean} true if the parcel is successfully created.
 */
export async function addParcelDb(data) {
	try {
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
 */
export async function getParcelStatusDb(trackingNumber) {
	try {
		const records = await db.query(`SELECT parcelStatus FROM parcels WHERE trackingNumber = '${trackingNumber}'`)
		
		if (!records[0]) throw new Error('No parcel found with that tracking number')
		return records[0].parcelStatus
	} catch (err) {
        throw err
    }
}

/**
 * Assigns the parcel.
 * @async
 * @function assignParcelDb
 * @param {string} trackingNumber The tracking number of the parcel.
 * @param {string} userName The userName of the courier.
 * @returns {boolean} true if parcel was assigned to the courier
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
 * Parcel name (parcelName), 
 * the destination address (destinationAddress),
 * the datetime that the parcel was created (dateAndTimeAdded),
 * and the kilograms (kgs).
 */
export async function getCourierParcelsDb(courier) {
	try {
		return await db.query(`SELECT parcelName, destinationAddress, dateAndTimeAdded, kgs FROM parcels WHERE assignedCourier = '${courier}' AND parcelStatus != 'delivered';`)
	} catch (err) {
        throw err
    }
}

/**
 * Gets the available parcels for the couriers.
 * @async
 * @function getAvailableParcelsDb
 * @param {string} lat The latitude of the user.
 * @param {string} lng The longitude of the user.
 * @returns {Dictionary<string>} An object containing: 
 * Tracking number (trackingNumber),
 * Parcel name (parcelName), 
 * the destination address (destinationAddress),
 * the datetime that the parcel was created (dateAndTimeAdded),
 * and the kilograms (kgs).
 */
export async function getAvailableParcelsDb(lat, lng) {
	try {
		//Gets the parcels not-dispatched ordered by distance
		return await db.query(`SELECT trackingNumber, parcelName, destinationAddress, dateAndTimeAdded, kgs, destinationLat, destinationLng, SQRT( POW(69.1 * (destinationLat - ${lat}), 2) + POW(69.1 * (${lng} - destinationLng) * COS(destinationLat / 57.3), 2)) AS distance FROM parcels WHERE parcelStatus = 'not-dispatched' ORDER BY distance;`)
	} catch (err) {
        throw err
    }
}
