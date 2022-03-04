import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

/**
 * Checks user credentials.
 * @param {string} username
 * @param {string} password
 * @returns {string} the username for the valid account
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
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
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

export async function userDoesntExistDb(username) {
	try {
		const records = await db.query(`SELECT userType, password FROM users WHERE userName = '${username}';`)
		if (!records[0]) return true	//If there isnt any users with that name
		return false
	} catch (err) {
        throw err
    }
}

export async function isValidUUIDDb(UUID) {
	try {
		const records = await db.query(`SELECT trackingNumber FROM parcels WHERE trackingNumber = '${UUID}';`)
		if (!records[0]) return true	//If there isnt any parcel with that UUID
		return false
	} catch (err) {
        throw err
    }
}

export async function addParcelDb(data) {
	try {
		await db.query(`INSERT INTO parcels(trackingNumber, senderAddress, destinationAddress, kgs, parcelName, dateAndTimeAdded, senderUsername, parcelStatus) VALUES('${data.trackingNumber}', '${data.senderAddress}', '${data.destinationAddress}', ${data.kgs}, '${data.parcelName}', '${data.dateAndTimeAdded}', '${data.senderUsername}', '${data.parcelStatus}');`)
		return true
	} catch (err) {
        throw err
    }
}