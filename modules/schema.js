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
