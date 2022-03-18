const login = (queryStr) => {
    if (queryStr.includes('existingUName'))
        return [
            {
                userType: 'user',
                password: '$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO'
            }
        ]
    return {}
}

const userDoesntExist = (queryStr) => {
    if (queryStr.includes('existingUName'))
        return [ { userType: 'user' } ]
    else if (queryStr.includes('throwError'))   //Throw an error
        throw new Error('Error Thrown')
    return {}
}

const isValidUUIDDb = (queryStr) => {
    if (queryStr.includes('existingUUID'))
        return [ { trackingNumber: 'existingUUID' } ]
    else if (queryStr.includes('throwError'))   //Throw an error
        throw new Error('Error Thrown')
    return {}
}

const register = (queryStr) => {
    if (queryStr.includes('throwError'))
        throw new Error('Error Thrown') //throw error
    else
        return true
}

const addParcel = (queryStr) => {
    if (queryStr.includes('throwError'))
        throw new Error('Error Thrown') //throw error
    else
        return true
}

export const query = async (queryStr) => {
    if (queryStr.includes('SELECT userType, password FROM users WHERE userName = '))  //Login
        return login(queryStr)
    else if (queryStr.includes('INSERT INTO users(userName, email, password) VALUES(')) //Register
        return register(queryStr)
    else if (queryStr.includes('SELECT userType FROM users WHERE userName = ')) //userDoesntExist
        return userDoesntExist(queryStr)
    else if (queryStr.includes('SELECT trackingNumber FROM parcels WHERE trackingNumber = '))   //isValidUUIDDb
        return isValidUUIDDb(queryStr)
    else if (queryStr.includes('INSERT INTO parcels'))
        return addParcel(queryStr)
}

export * as db from '../../persistenceLayer/db.js'  //A workaround to be able to call query like db.query