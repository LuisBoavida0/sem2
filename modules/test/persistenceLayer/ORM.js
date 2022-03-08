export async function isValidUUIDDb(data) {
    return true
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
