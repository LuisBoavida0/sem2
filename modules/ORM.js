import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'
import { loginCorrectly } from './dataProcessing.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

/**
 * Checks user credentials.
 * @param {string} username
 * @param {string} password
 * @returns {string} the username for the valid account
 */
export async function login(data) {
	try {
        const records = await db.query(`SELECT userType, password FROM users WHERE userName = '${data.userName}';`)
		return await loginCorrectly(data, records, compare)
    } catch (err) {
        throw new Error(err)
    }
}
	
/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export async function register(data) {
	try {
		const password = await hash(data.password, salt)		
		await db.query(`INSERT INTO users(userName, email, password) VALUES('${data.userName}', '${data.email}', '${password}')`)
		return true
	} catch (err) {
        throw new Error(err)
    }
}

export async function userDoesntExist(data) {
	try {
		const records = await db.query(`SELECT userType, password FROM users WHERE userName = '${data.userName}';`)
		if (!records[0]) return true
		throw new Error(`userName ${data.userName} already exists`)
	} catch (err) {
        throw new Error(err)
    }
}