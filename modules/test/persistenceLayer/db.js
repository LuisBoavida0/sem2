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

export const query = async (queryStr) => {
    if (queryStr.includes('SELECT userType, password FROM users WHERE userName = '))  //Login
        return login(queryStr)
}

export * as db from '../../persistenceLayer/db.js'