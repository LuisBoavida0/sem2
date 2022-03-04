import { assertEquals, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { homePageRedirection, getUUID, getDateIsosFormat, formDataProcessing } from '../modules/businessLayer/generalLogic.js'

//-------------- test homePageRedirection function --------------------------------
Deno.test('homePageRedirection - check for user', () => {
    assertEquals(homePageRedirection('user'), 'userHomepage', 'user is not being redirected correctly') 
})

Deno.test('homePageRedirection - check for courier', () => {
    assertEquals(homePageRedirection('courier'), 'courierHomepage', 'courier is not being redirected correctly')
})

Deno.test('check for manager', () => {
    assertEquals(homePageRedirection('manager'), 'managerHomepage', 'manager is not being redirected correctly')
})

Deno.test('homePageRedirection - throws exception if it is not a valid userType', () => {
    try {
        homePageRedirection('')
        fail('the function does not throw an exception')
    } catch (err) {
        assertEquals(err.message, 'UserType Not found', 'Not giving the correct error message')
    }
}) 

//-------------- test getUUID function --------------------------------
Deno.test('getUUID - check correctly', async () => {
    assertEquals(36, (await getUUID()).length)
}) 

Deno.test('getUUID - check with string', async () => {
    assertEquals(36, (await getUUID("dasd")).length)
}) 

//-------------- test getDateIsosFormat function --------------------------------
Deno.test('getDateIsosFormat - check correctly', () => {
    const response = new Date(getDateIsosFormat())
    assertEquals(true, (response !== 'Invalid Date' && !isNaN(response)))   //Checks if it is a valid date
}) 

Deno.test('getDateIsosFormat - check with string', () => {
    const response = new Date(getDateIsosFormat('string'))
    assertEquals(true, (response !== 'Invalid Date' && !isNaN(response)))   //Checks if it is a valid date
}) 

//-------------- test formDataProcessing function --------------------------------
import Ajv from '../modules/businessLayer/ajv.min.js'
const ajv = new Ajv({allErrors: true})

const testSchema = ajv.compile({
  title: 'test',
  description: 'check if it is correct',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 4,
      maxLength: 25
    }
  },
  required: [ 'name' ]
})

Deno.test('formDataProcessing - check correctly', async () => {
    const obj = {   //Correct obj
        name: 'Luis',
        lastName: 'Boavida'
    }
    let formData = new FormData() //Convert obj to form data
    Object.keys(obj).forEach(key => {
        formData.append(key, obj[key])
    })
    
    const result = await formDataProcessing({value: formData}, testSchema)   //Result of the form data tranformed into an object
    assertEquals(JSON.stringify(obj), JSON.stringify(result))   //Checks if the result is the same object as the normal one
})

Deno.test('formDataProcessing - without name (throw error)', async () => {
    try {
        const obj = {   //Correct obj
            lastName: 'Boavida'
        }

        let formData = new FormData() //Convert obj to form data
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })

        const result = await formDataProcessing({value: formData}, testSchema)   //Result of the form data tranformed into an object  
        fail('Didnt threw an error')  
    } catch (err) {
        assertEquals(err, " should have required property 'name'", 'Not giving the correct error message')
    }
})