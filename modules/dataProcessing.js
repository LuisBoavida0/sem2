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

export const getGeneralData = (page, context) => {  //Gets the general Data
    let data = {}

    if (context.cookies.get('success')) data.success = context.cookies.get('success')  //Gets the success message
    if (context.cookies.get('error')) data.error = context.cookies.get('error')  //Gets the error message
    if (context.cookies.get('userType')) data.userType = context.cookies.get('userType')  //Gets the userType
    if (context.cookies.get('userName')) data.userName = context.cookies.get('userName')  //Gets the userType

    context.cookies.delete('success')   //Deletes temporary cookies
    context.cookies.delete('error')

    data.title = page    //The title of the page    

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