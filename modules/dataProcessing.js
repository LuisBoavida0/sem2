import { isValidUUID } from './ORM.js'

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

export const getGeneralData = (page, context, pageName) => {  //Gets the general Data
    let data = {}

    if (context.cookies.get('success')) data.success = context.cookies.get('success')  //Gets the success message
    if (context.cookies.get('error')) data.error = context.cookies.get('error')  //Gets the error message
    if (context.cookies.get('userType')) data.userType = context.cookies.get('userType')  //Gets the userType
    if (context.cookies.get('userName')) data.userName = context.cookies.get('userName')  //Gets the userType

    context.cookies.delete('success')   //Deletes temporary cookies
    context.cookies.delete('error')

    pageName ? data[pageName] = true : data[page] = true    //The title of the page    

    console.log(data)
    return data
}

export const homePageRedirection = (context) => {  //Gets the general Data
    switch(context.cookies.get('userType')) {
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

export const loginCorrectly = async (data, records, compare) => {
    if(!records[0]) throw new Error(`userName '${data.userName}' not found`)
    
    const samePwd = await compare(data.password, records[0].password)
    if (!samePwd) throw new Error(`invalid password for account '${data.userName}'`)
    
    console.log(`This username has logged in : ${data.userName}`)
    return records[0].userType
}

export const getDataIsosFormat = (alreadyDbFormatted) => {    //Converts the Data into the Schema format (With timezones)
    let IsoDate =  new Date()
    let LocalStringDate = new Date()

    /*Since Server doesnt Give UK timezone Hours (When its winter timezone the server still gives 0 instead of +1)
      I made this solution, the only way to get the hours with the timezone is with this localestring, so i get the date as a string and
      then split it to only get the hour*/
    LocalStringDate = LocalStringDate.toLocaleString('en-GB', { timeZone: 'Europe/London' }).split(', ')
    IsoDate.setHours(IsoDate.getHours() + (LocalStringDate[1].split(':')[0] - IsoDate.getUTCHours()))
    
    IsoDate = IsoDate.toISOString()
    if (alreadyDbFormatted) return IsoDate.slice(0, 19).replace('T', ' ')     
    return IsoDate
} 

export const addExtraParcelValues = async (context) => {
    let UUID
    while (true) {
        UUID = crypto.randomUUID()
        if (await isValidUUID(UUID)) break
    }

    return {
        senderUsername: context.cookies.get('userName'),
        dateAndTimeAdded: getDataIsosFormat(true),
        parcelStatus: 'not-dispatched',
        trackingNumber: UUID
    }
}
