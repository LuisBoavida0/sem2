import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'

import { register, login, sendParcel, getParcels, manageParcel, getAvailableParcels, deliverParcel, getDeliveredParcels } from './modules/businessLayer/businessLayer.js'
import { formDataProcessing, homePageRedirection, deliverProcessWithImage } from './modules/businessLayer/generalLogic.js'
import { registerSchema, loginSchema, sendParcelSchema, manageParcelSchema, deliverParcelSchema } from './modules/businessLayer/schema.js'

const handle = new Handlebars({ defaultLayout: 'layout' })

const router = new Router()

// the routes defined here

//-------------------------- GET -------------------------
router.get('/', async context => {	//Homepage Route (Either Manager, User or courier)
	if (!context.cookies.get('userType') || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if he is logged in
	
	const parcels = await getParcels(context.cookies.get('userType'), context.cookies.get('userName'))	//Get parcels
	const homepage = homePageRedirection(context.cookies.get('userType'))	//Gets homepage according to type of user

	//Go to homepage with the parcels, with a key saying to the head that the page is home, a key saying which type of user is and if the cookies are accepted
	context.response.body = await handle.renderView(homepage, {
		'homepage': true, 'parcels': parcels, 
		[context.cookies.get('userType')]: true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	
})

router.get('/login', async context => {	//Login Route
	context.response.body = await handle.renderView('login', {
		'Login': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Login page
})

router.get('/register', async context => {	//Register Route
	context.response.body = await handle.renderView('register', {
		'Register': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Register page
})

router.get('/sendParcel', async context => {	//Send Parcel Route
	if (context.cookies.get('userType') !== 'user' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if he user

	context.response.body = await handle.renderView('sendParcel', {
		'sendParcel': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Send Parcel page
})

router.get('/availableParcels', async context => {	//Available Parcels Route
	if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is a courier
	
	context.response.body = await handle.renderView('availableParcels', {
		'availableParcels': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Available Parcels page
})

router.get('/deliveryScreen/:trackingNumber', async context => {	//Delivery Screen Route
	if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is a courier
	
	context.response.body = await handle.renderView('deliveryScreen', {
		'deliveryScreen': true, 
		'courier': true, 
		'trackingNumber': context.params.trackingNumber,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Delivery Screen page
})

router.get('/unpickedParcels', async context => {	//Unpicked Parcels Route
	if (context.cookies.get('userType') !== 'manager' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is a manager

	const parcels = await getAvailableParcels(false, false)	//Calls function to get the available parcels (the unpicked ones)
	context.response.body = await handle.renderView('unpickedParcels', {
		parcels, 
		'homepage': true, 
		'manager': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Unpicked Parcels page
})

router.get('/deliveredParcels', async context => {	//Delivered Parcels Route
	if (context.cookies.get('userType') !== 'manager' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is a manager

	const parcels = await getDeliveredParcels()	//Calls function to get the delivered parcels
	context.response.body = await handle.renderView('deliveredParcels', {
		parcels, 
		'homepage': true, 
		'manager': true,
		'cookiesAccepted': context.cookies.get('cookiesAccepted')
	})	//Goes to Delivered Parcels page
})

router.get('/cookiesScreen', async context => {	//Cookies Info Route
	context.response.body = await handle.renderView('cookiesScreen', {
		'cookiesAccepted': true, 
		'cookiesScreen': true
	})	//Goes to cookies Info Screen
})

//-------------------------- Api -------------------------
router.get('/getAvailableParcelsApi/:lat/:lng', async context => {	//API to get the parcels ordered by distance
	if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) 	//If not a courier then return message saying that there is no permission
		context.response.body = 'No permission to access the file'
	else    
		context.response.body = await getAvailableParcels(context.params.lat, context.params.lng)	//Returns the parcels available (Sort by distance)
})

router.get('/getAvailableParcelsApi', async context => {	// Api call without the courier location
	if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) 	//If not a courier then return message saying that there is no permission
		context.response.body = 'No permission to access the file'
	else    
		context.response.body = await getAvailableParcels(false, false)	//Returns the parcels available (Sort by date added)
})

//-------------------------- POST -------------------------
router.post('/register', async context => {	//Register post
	try {
		//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
		const obj = await formDataProcessing(await context.request.body({ type: 'form' }), registerSchema)
		await register(obj)	//Tries to register
		context.response.redirect('/login?succ=Registered with success!')	//Goes to login
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/register?err=${err}`) //Send error to Page
	}
})

router.post('/login', async context => {	//Login post
	try {
		if (!context.cookies.get('cookiesAccepted')) context.response.redirect('/login?err=You need to accept the cookies')	//If coockies not accepted
		else {
			//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
			const obj = await formDataProcessing(await context.request.body({ type: 'form' }), loginSchema)
			const userType = await login(obj)	//Checks if credentials are correct and tries to login, then it returns the userType

			context.cookies.set('userType', userType)	//Adds the cookie user type
			context.cookies.set('userName', obj.userName)	//Adds the cookies user name

			context.response.redirect('/')	//Goes to homepage
		}
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/login?err=${err}`) //Send error to Page
	}
})

router.post('/sendParcel', async context => {	//Send Parcel post
	try {
		if (context.cookies.get('userType') !== 'user' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is an user
		else {
			//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
			const obj = await formDataProcessing(await context.request.body({ type: 'form' }), sendParcelSchema)
			await sendParcel(obj, context.cookies.get('userName'))	//Sends the Parcel

			context.response.redirect('/sendParcel?succ=Parcel added with success')	//Sends success message
		}
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/sendParcel?err=${err}`) //Send error to Page
	}
})

router.post('/manageParcel', async context => {	//Manage Parcel post
	try {
		if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is an user
		else {
			//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
			const obj = await formDataProcessing(await context.request.body({ type: 'form' }), manageParcelSchema)
			const successMessage = await manageParcel(obj.trackingNumber, context.cookies.get('userName'))	//Checks if the parcel is valid and manages the parcel

			//Redirects according to action
			successMessage === 'in-transit' ? context.response.redirect(`/deliveryScreen/${obj.trackingNumber}`) : context.response.redirect(`/?succ=${successMessage}`)
		}
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/?err=${err}`)
	}
})

router.post('/deliveryScreen/:trackingNumber', async context => {	//Delivery Screen post
	try {
		if (context.cookies.get('userType') !== 'courier' || !context.cookies.get('cookiesAccepted')) context.response.redirect('/login') //Checks if it is an courier
		else {
			//Converts the data to an usable object
			const objTransformed = await deliverProcessWithImage(await context.request.body({ type: 'form-data' }), context.params.trackingNumber)
			await formDataProcessing(objTransformed, deliverParcelSchema, true)	//Check if values are correct
			
			await deliverParcel(objTransformed)	//Tries to deliver the parcel

			context.response.redirect(`/?succ=Parcel delivered with success`)	//Redirect to homepage with a success message
		}
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/?err=${err}`)
	}
})

//--------------------------- OTHER --------------------------------------
router.get('/logout', context => {	//Route to logout
  context.cookies.delete('userType')
  context.cookies.delete('userName')
  context.response.redirect('/login')
})


router.get('/cookiesAccept', context => {	//Accepts the cookies
	context.cookies.set('cookiesAccepted', 'true')
	context.response.redirect('/login')
})

router.get('/declineCookies', context => {	//Declines the cookies
	context.cookies.delete('cookiesAccepted')
	context.response.redirect('/logout')
})
export default router
