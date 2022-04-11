/**
 * generalLogic Module.
 * @module generalLogic
 */

import { isValidUUIDDb } from '../persistenceLayer/ORM.js'
import { Base64 } from 'https://deno.land/x/bb64@1.1.0/mod.ts'
import { resize } from 'https://deno.land/x/deno_image@v0.0.3/mod.ts'

/**
 * Function to tranform the data (form data) into an usable object and check if the data is correct through the use of a schema
 * @async
 * @function formDataProcessing
 * @param {Object} obj form object with all the data to be converted to a usable object
 * @param {avj} schema Contains the schema
 * @param {boolean} transformed flags if the object is already transformed
 * @returns {Object} returns the transformed object.
 * @throws Throws error if Obj does not meet the schema criteria
 */
export const formDataProcessing = async (obj,  schema, transformed = false) => {
    if (!transformed)   //If not already transformed, transform it
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

/**
 * Converts the form data to a usable object and converts the image into data64
 * @function deliverProcessWithImage
 * @param {Dictionary<string>} data object with the form data
 * @param {string} trackingNumber the tracking number of the parcel
 * @returns {Dictionary<string>} returns the object with this extra files:
 * obj.dateAndTimeReceived - the date
 * obj.trackingNumber - the tracking number
 * obj.signature - the image
 */
export const deliverProcessWithImage = async (data, trackingNumber) => {
    try {
		//Convert form data to an object
        const fullobj = await data.value.read()
        const obj = fullobj.fields    //Get the image
        
        //Add Date
        obj.dateAndTimeReceived = getDateIsosFormat()  //Get the current Date   
        obj.trackingNumber = trackingNumber

        //Get file info
        const file = fullobj.files[0]
        const { filename, originalName } = file

        const size = {  //variable to then decrease the size of the image to be lighter
            width: 100,
            height: 100
        }
            
        const img = await resize(Deno.readFileSync(filename), size)  //Resizes and gets the image
        const extension = originalName.split('.').pop()  //Gets the extension

        const MimeType = `data:image/${extension};base64,`  //Creates the mimeType
        
        const img64 = MimeType + Base64.fromUint8Array(img).toString()  //creates the base64

        obj.signature = img64   //Ads image to the object
        return obj
	} catch {
        throw "There was a problem adding this image, please try again with a different one"
    }
}
