/**
 * schema Module.
 * @module schema
 */

import Ajv from './ajv.min.js'

const ajv = new Ajv({allErrors: true})

/**
 * Register Schema, a schema that verifies if an object has this fields:
 * @function registerSchema
 * @param {string} userName the user name
 * @param {string} password the password
 * @param {string} email the email
 * @param {string} userType the type of user (Not required)
 */
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

/**
 * Login Schema, a schema that verifies if an object has this fields:
 * @function loginSchema
 * @param {string} userName the username
 * @param {string} password the password
 */
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

/**
 * Send Parcel Schema, a schema that verifies if an object has this fields:
 * @function loginSchema
 * @param {string} parcelName the parcel name
 * @param {string} senderHouseNumber a string that is a number (the house number of the sender)
 * @param {string} destinationHouseNumber a string that is a number (the destination house number)
 * @param {string} destinationLat The latitude of the destination
 * @param {string} destinationLng The longitude of the destination
 * @param {string} senderAddress the address of the sender
 * @param {string} destinationAddress the destination address
 * @param {string} kgs the weight of the package, a string that is a number between 1-20
 */
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
    senderHouseNumber: {
      type: 'string',
      minLength: 1,
      maxLength: 3,
      pattern: '^[0-9]*$'
    },
    destinationHouseNumber: {
      type: 'string',
      minLength: 1,
      maxLength: 3,
      pattern: '^[0-9]*$'
    },
    //https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
    destinationLat: {
      type: 'string',
      minLength: 3,
      maxLength: 12,
      pattern: '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$'
    },
    destinationLng: {
      type: 'string',
      minLength: 3,
      maxLength: 13,
      pattern: '^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$'
    },
    senderAddress: {
      type: 'string',
      minLength: 6,
      maxLength: 500
    },
    destinationAddress: {
      type: 'string',
      minLength: 6,
      maxLength: 500
    },
    //https://stackoverflow.com/questions/11338405/regular-expression-that-would-contains-a-number-less-then-or-equal-to-20
    //https://stackoverflow.com/questions/31122901/regex-pattern-to-not-equal-0
    //https://stackoverflow.com/questions/469913/regular-expressions-is-there-an-and-operator
    kgs: {
      type: 'string',
      pattern: '(?=^(([01]?[0-9])|(20))$)(?=[^0]+)'
    }
  },
  required: [ 'parcelName', 'senderAddress', 'destinationAddress', 'kgs', 'senderHouseNumber', 'destinationHouseNumber', 'destinationLat', 'destinationLng' ]
})

/**
 * Manage Parcel Schema, a schema that verifies if an object has this fields:
 * @function assignParcelSchema
 * @param {string} trackingNumber the tracking number
 */
export const manageParcelSchema = ajv.compile({
  title: 'Manage Parcel',
  description: 'Checks if Parcel that courier is going to assign is well formatted',
  type: 'object',
  properties: {
    trackingNumber: {
      type: 'string',
      minLength: 36,
      maxLength: 36
    }
  },
  required: [ 'trackingNumber' ]
})


/**
 * deliver Parcel Schema, a schema that verifies if an object has this fields:
 * @function deliverParcelSchema
 * @param {string} trackingNumber the tracking number
 * @param {string} personWhoReceivedParcel Full name of the person that received the parcel
 * @param {string} locationReceivedLat Latitude of the delivery
 * @param {string} locationReceivedLng The longitude of the delivery
 */
export const deliverParcelSchema = ajv.compile({
  title: 'Send Parcel',
  description: 'Checks if info from Parcel is correctly formatted (Information from the form)',
  type: 'object',
  properties: {
    trackingNumber: {
      type: 'string',
      minLength: 36,
      maxLength: 36
    },
    personWhoReceivedParcel: {
      type: 'string',
      minLength: 5,
      maxLength: 100
    },
    //https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
    locationReceivedLat: {
      type: 'string',
      minLength: 3,
      maxLength: 12,
      pattern: '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$'
    },
    locationReceivedLng: {
      type: 'string',
      minLength: 3,
      maxLength: 13,
      pattern: '^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$'
    }
  },
  required: [ 'trackingNumber', 'personWhoReceivedParcel', 'locationReceivedLat', 'locationReceivedLng']
})