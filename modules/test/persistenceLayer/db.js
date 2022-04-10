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

const isValidUUID = (queryStr) => {
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

const getUserParcels = (queryStr) => {    
    if (queryStr.includes('throwError')) throw new Error('Error Thrown') //Throw an error
    return {
        parcelName: 'parcelName'
    }
}

const getParcelStatus = (queryStr) => {    
    if (queryStr.includes('throwError')) throw new Error('Error Thrown') //Throw an error
    else if (queryStr.includes('noTrackingNumber')) return []
    return [{
        parcelStatus: 'not-dispatched'
    }]
}

const assignParcel = (queryStr) => {    
    if (queryStr.includes('throwError')) throw new Error('Error Thrown') //Throw an error
}

const getCourierParcels = (queryStr) => {    
    if (queryStr.includes('throwError')) throw new Error('Error Thrown') //Throw an error
    else if (queryStr.includes('noParcelsCourier')) return []
    return [{
        parcelName: 'parcelName'
    }]
}

const getAvailableParcelsDb = (queryStr) => {    
    if (queryStr.includes('throwError')) throw new Error('Error Thrown') //Throw an error
    else if (queryStr.includes(' ORDER BY dateAndTimeAdded;')) return [{ parcelName: 'parcelNameNoLocation' }]
    return [{
        parcelName: 'parcelName'
    }]
}

export const query = async (queryStr) => {
    if (queryStr.includes('SELECT userType, password FROM users WHERE userName = '))  //Login
        return login(queryStr)
    else if (queryStr.includes('INSERT INTO users(userName, email, password) VALUES(')) //Register
        return register(queryStr)
    else if (queryStr.includes('SELECT userType FROM users WHERE userName = ')) //userDoesntExist
        return userDoesntExist(queryStr)
    else if (queryStr.includes('SELECT trackingNumber FROM parcels WHERE trackingNumber = '))   //isValidUUIDDb
        return isValidUUID(queryStr)
    else if (queryStr.includes('INSERT INTO parcels'))
        return addParcel(queryStr)
    else if (queryStr.includes('SELECT parcelName, destinationAddress, dateAndTimeAdded, parcelStatus FROM parcels WHERE senderUsername = '))
        return getUserParcels(queryStr)
    else if (queryStr.includes('SELECT parcelStatus FROM parcels WHERE trackingNumber = '))
        return getParcelStatus(queryStr)
    else if (queryStr.includes('UPDATE parcels SET assignedCourier = '))
        return assignParcel(queryStr)
    else if (queryStr.includes('SELECT trackingNumber, parcelName, destinationAddress, dateAndTimeAdded, kgs FROM parcels WHERE assignedCourier = '))
        return getCourierParcels(queryStr)
    else if (queryStr.includes('SELECT trackingNumber, parcelName, destinationAddress, dateAndTimeAdded, kgs, destinationLat, destinationLng'))
        return getAvailableParcelsDb(queryStr)
}

export * as db from '../../persistenceLayer/db.js'  //A workaround to be able to call query like db.query