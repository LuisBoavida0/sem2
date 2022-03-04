import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'

//
import { register, login, sendParcel } from './modules/businessLayer/businessLayer.js'
import { formDataProcessing, homePageRedirection } from './modules/businessLayer/generalLogic.js'
import { registerSchema, loginSchema, sendParcelSchema } from './modules/businessLayer/schema.js'

const handle = new Handlebars({ defaultLayout: 'layout' })

const router = new Router()

// the routes defined here

//-------------------------- GET -------------------------
router.get('/', async context => {
	if (!context.cookies.get('userType')) context.response.redirect('/login') //Checks if he is logged in
	
	const homepage = homePageRedirection(context.cookies.get('userType'))	//Gets homepage according to type of user
	context.response.body = await handle.renderView(homepage)
})

router.get('/login', async context => {
	context.response.body = await handle.renderView('login', {'Login': true})	//Goes to Login page (Sends object for the header to know which page it is)
})

router.get('/register', async context => {
	context.response.body = await handle.renderView('register', {'Register': true})	//Goes to Register page (Sends object for the header to know which page it is)
})

router.get('/sendParcel', async context => {
	if (!context.cookies.get('userType')) context.response.redirect('/login') //Checks if he is logged in

	context.response.body = await handle.renderView('sendParcel', {'sendParcel': true})	//Goes to Send Parcel page (Sends object for the header to know which page it is)
})

//-------------------------- POST -------------------------
router.post('/register', async context => {
	try {
		//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
		const obj = await formDataProcessing(await context.request.body({ type: 'form' }), registerSchema)
		await register(obj)	//Tries to register
		context.response.redirect('/login')	//Goes to login
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/register?err=${err}`) //Send error to Page
	}
})

router.post('/login', async context => {
	try {
		console.log((await context.request.body({ type: 'form' })).value)
		//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
		const obj = await formDataProcessing(await context.request.body({ type: 'form' }), loginSchema)
		const userType = await login(obj)	//Checks if credentials are correct and tries to login, then it returns the userType

		context.cookies.set('userType', userType)	//Adds the cookie user type
    	context.cookies.set('userName', obj.userName)	//Adds the cookies user name

		context.response.redirect('/')
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/login?err=${err}`) //Send error to Page
	}
})

router.post('/sendParcel', async context => {
	try {
		if (context.cookies.get('userType') !== 'user') context.response.redirect('/login') //Checks if it is an user

		//Transforms the form data into an object (throws an error if form is not formatted according to the schema)
		let obj = await formDataProcessing(await context.request.body({ type: 'form' }), sendParcelSchema)
		await sendParcel(obj, context.cookies.get('userName'))	//Sends the Parcel

		context.response.redirect('/sendParcel')
	} catch (err) {
		console.log(err)	//Log the error
		context.response.redirect(`/sendParcel?err=${err}`) //Send error to Page
	}
})

router.get('/logout', context => {
  context.cookies.delete('userType')
  context.cookies.delete('userName')
  context.response.redirect('/login')
})

export default router
