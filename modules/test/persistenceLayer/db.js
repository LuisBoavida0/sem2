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
    return {}
}

const isValidUUIDDb = (queryStr) => {
    if (queryStr.includes('existingUUID'))
        return [ { trackingNumber: 'existingUUID' } ]
    return {}
}

export const query = async (queryStr) => {
    if (queryStr.includes('SELECT userType, password FROM users WHERE userName = '))  //Login
        return login(queryStr)
    else if (queryStr.includes('INSERT INTO users(userName, email, password) VALUES(')) //Register
        return true
    else if (queryStr.includes('SELECT userType FROM users WHERE userName = ')) //userDoesntExist
        return userDoesntExist(queryStr)
    else if (queryStr.includes('SELECT trackingNumber FROM parcels WHERE trackingNumber = '))   //isValidUUIDDb
        return isValidUUIDDb(queryStr)
    else if (queryStr.includes('INSERT INTO parcels'))
        return true
}


export * as db from '../../persistenceLayer/db.js'