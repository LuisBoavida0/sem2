/**
 * generalLogic Module.
 * @module generalLogic
 */

import { isValidUUIDDb } from '../persistenceLayer/ORM.js'

/**
 * Function to tranform the data (form data) into an usable object and check if the data is correct through the use of a schema
 * @async
 * @function formDataProcessing
 * @param {Object} obj form object with all the data to be converted to a usable object
 * @param {avj} schema constant that contains the schema
 * @returns {Object} returns the transformed object.
 * @throws Throws error if Obj does not meet the schema criteria
 */
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

/**
 * Redirects the user to the according homepage
 * @function homePageRedirection
 * @param {string} userType contains the type of user
 * @returns {string} returns the correct hbs page.
 * @throws Throws error if userType is not correct
 */
export const homePageRedirection = (userType) => {
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

/**
 * Gets the current data into the Schema format (With timezones)
 * @function getDateIsosFormat
 * @returns {string} date in the schema format 
 */
export const getDateIsosFormat = () => {    
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

/**
 * Gets a valid UUID
 * @async
 * @function getUUID
 * @returns {string} UUID
 */
export const getUUID = async () => {
    const UUID = crypto.randomUUID() //Gets a random UUID
    if (!await isValidUUIDDb(UUID)) return getUUID()    //If UUID already exists, call again the function to get a new UUID
    return UUID
}