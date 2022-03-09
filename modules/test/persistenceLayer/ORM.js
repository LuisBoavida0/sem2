let callCount = 0   //variable to enable validUUIDDB return false once
export async function isValidUUIDDb(data) {
    if (callCount)  return true //Only give true on the second call
    callCount++
    return false
}

export const userDoesntExistDb = async (userName) => { 
    if (userName === 'existingUName') return false
    return true
}

export const loginDb = async (obj) => { 
    if (obj == 'throwError') throw new Error('Error thrown')
    return 'user'
}

export const registerDb = async (obj) => { 
    return true
}

export const addParcelDb = async (obj) => { 
    return true
}