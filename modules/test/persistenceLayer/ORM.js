let callCount = 0   //variable to enable validUUIDDB return false once
export async function isValidUUIDDb(UUID) {
    //Verification for the manageParcel
    if (UUID === 'UUID' || UUID === 'UUIDAssignError' || UUID.includes('UUIDParcelStatus')) return false
    else if (UUID === 'nonExistingUUID') return true

    //Verification for the getUUID
    if (callCount)  return true //Only give true on the second call
    callCount++
    return false
}

export const userDoesntExistDb = async (userName) => { 
    if (userName === 'existingUName') return false
    return true
}

export const loginDb = async (obj) => { 
    if (obj === 'throwError') throw new Error('Error thrown')
    return 'user'
}

export const registerDb = async (obj) => { 
    return true
}

export const addParcelDb = async (obj) => { 
    return true
}

export const getUserParcelsDb = async (userName) => {
    if (userName === 'userNameNoParcels') return {}
    else if (userName === 'throwError') throw new Error('Error Thrown')
    return {
        parcelName: 'parcelName'
    }
}


export const getCourierParcelsDb = async (userName) => {
    if (userName === 'userNameNoParcels') return {}
    else if (userName === 'throwError') throw new Error('Error Thrown')
    return {
        parcelName: 'parcelName'
    }
}

export const assignParcelDb = async (trackingNumber, userName) => {
    if (userName === 'throwError') throw new Error('Error thrown assign Parcel')
    return true
}

export const getParcelStatusDb = async (trackingNumber) => {
    if (trackingNumber === 'UUIDParcelStatusError') throw new Error('Error Thrown')
    else if (trackingNumber === 'UUIDParcelStatusNot-dispatched') return 'not-dispatched'
    else if (trackingNumber === 'UUIDParcelStatusIn-transit') return 'in-transit'
    else if (trackingNumber === 'UUIDParcelStatusDelivered') return 'delivered'
    return 'other'
}
