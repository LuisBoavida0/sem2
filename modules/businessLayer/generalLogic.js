import { isValidUUIDDb } from '../persistenceLayer/ORM.js'

//function to tranform the data and check if the data is correct through the use of a schema
export const formDataProcessing = async (obj,  schema) => {
    obj = Object.fromEntries(await obj.value)

    //Check if has the right schema
    const valid = schema(obj)
    if(valid === false) {   //If not valid throw error
        schema.errors[0].message = schema.errors[0].dataPath.slice(1) + ' ' + schema.errors[0].message
        throw schema.errors[0].message
    }
    return obj
}

export const homePageRedirection = (userType) => {  //Redirects the user to the according homepage
    switch(userType) {
        case 'user':
            return 'userHomepage'
        case 'courier':
            return 'courierHomepage'
        case 'manager':
            return 'managerHomepage'
        default:
            throw new Error('UserType Not found')
    }
}

export const getDateIsosFormat = () => {    //Converts the Data into the Schema format (With timezones)
    let IsoDate =  new Date()
    let LocalStringDate = new Date()

    /*Since Server doesnt Give UK timezone Hours (When its winter timezone the server still gives 0 instead of +1)
      I made this solution, the only way to get the hours with the timezone is with this localestring, so i get the date as a string and
      then split it to only get the hour*/
    LocalStringDate = LocalStringDate.toLocaleString('en-GB', { timeZone: 'Europe/London' }).split(', ')
    IsoDate.setHours(IsoDate.getHours() + (LocalStringDate[1].split(':')[0] - IsoDate.getUTCHours()))
    
    IsoDate = IsoDate.toISOString()
    return IsoDate.slice(0, 19).replace('T', ' ')     
}

export const getUUID = async () => {    //Gets a valid UUID
    let UUID
    while (true) {  //While it isnt valid
        UUID = crypto.randomUUID() //Gets a random UUID
        if (await isValidUUIDDb(UUID)) break    //If it doesnt already exists in the database, exit while
    }
    return UUID
}