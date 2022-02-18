import Ajv from './ajv.min.js'

const ajv = new Ajv({allErrors: true})

export const registerSchema = ajv.compile({
  title: 'Add Customer',
  description: 'Check if the customer data is correct to be added',
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      minLength: 4,
      maxLength: 25
    },
    password: {
      type: 'string',
      minLength: 7,
      maxLength: 70
    },
    email: {
      type: 'string',
      pattern: '^\\S+@\\S+\\.\\S+$',
      format: 'email',
      minLength: 5,
      maxLength: 255
    },
    userType: {
      type: 'string',
      enum: ['user', 'librarian']
    },
  },
  required: [ 'userName', 'password', 'email' ]
})

export const loginSchema = ajv.compile({
  title: 'Login',
  description: 'Check if the Login Data is correctly formatted',
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      minLength: 4,
      maxLength: 25
    },
    password: {
      type: 'string',
      minLength: 7,
      maxLength: 70
    },
  },
  required: [ 'userName', 'password' ]
})

//https://stackoverflow.com/questions/11338405/regular-expression-that-would-contains-a-number-less-then-or-equal-to-20
//https://stackoverflow.com/questions/31122901/regex-pattern-to-not-equal-0
//https://stackoverflow.com/questions/469913/regular-expressions-is-there-an-and-operator
export const sendParcelSchema = ajv.compile({
  title: 'Send Parcel',
  description: 'Checks if info from Parcel is correctly formatted (Information from the form)',
  type: 'object',
  properties: {
    parcelName: {
      type: 'string',
      minLength: 3,
      maxLength: 120
    },
    senderPostcode: {
      type: 'string',
      minLength: 6,
      maxLength: 500
    },
    destinationPostcode: {
      type: 'string',
      minLength: 6,
      maxLength: 500
    },
    kgs: {
      type: 'string',
      pattern: '(?=^(([01]?[0-9])|(20))$)(?=[^0]+)'
    }
  },
  required: [ 'parcelName', 'senderPostcode', 'destinationPostcode', 'kgs' ]
})