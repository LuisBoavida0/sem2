import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'

import { login, register, userDoesntExist, addParcel } from './modules/ORM.js'
import { formDataProcessing, getGeneralData, homePageRedirection, addExtraParcelValues } from './modules/dataProcessing.js'
import { registerSchema, loginSchema, sendParcelSchema } from './modules/schema.js'

const handle = new Handlebars({ defaultLayout: 'layout' })

const router = new Router()

// the routes defined here
router.get('/', async context => {
	if (!context.cookies.get('userType')) context.response.redirect('/login')
	const body = await handle.renderView(homePageRedirection(context), getGeneralData('HomePage', context))
	context.response.body = body
})

router.get('/login', async context => {
	const body = await handle.renderView('login', getGeneralData('Login', context))
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register', getGeneralData('Register', context))
	context.response.body = body
})

router.get('/sendParcel', async context => {
	const body = await handle.renderView('sendParcel', getGeneralData('Send Parcel', context))
	context.response.body = body
})

router.post('/register', async context => {
	try {
		const obj = await formDataProcessing(await context.request.body({ type: 'form' }), loginSchema)
		await userDoesntExist(obj)
		await register(obj)
		context.response.redirect('/login')
	} catch (err) {
		console.log(err)	//Log the error
		context.cookies.set('error', err)	//Send error to Page
		context.response.redirect('/register')
	}
})

router.post('/login', async context => {
	try {
		const obj = await formDataProcessing(await context.request.body({ type: 'form' }), loginSchema)
		context.cookies.set('userType', await login(obj))
		context.cookies.set('userName', obj.userName)
		context.response.redirect('/')
	} catch (err) {
		console.log(err)	//Log the error
		context.cookies.set('error', err)	//Send error to Page
		context.response.redirect('/login')
	}
})

router.post('/sendParcel', async context => {
	try {
		let obj = await formDataProcessing(await context.request.body({ type: 'form' }), sendParcelSchema)
		obj = Object.assign({}, obj, await addExtraParcelValues(context))
		await addParcel(obj)

		context.response.redirect('/sendParcel')
	} catch (err) {
		console.log(err)	//Log the error
		context.cookies.set('error', err)	//Send error to Page
		context.response.redirect('/sendParcel')
	}
})

router.get('/logout', context => {
  // context.cookies.set('authorised', null) // this does the same
  context.cookies.delete('userType')
  context.cookies.delete('userName')
  context.response.redirect('/login')
})

export default router
