const puppeteer = require('puppeteer'); //include Puppeteer Library
const assert = require('assert').strict
const { Tom } = require('test-runner')
const tom = new Tom()

const url = 'https://bazaar-sponsor-8080.codio-box.uk' 

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}
/** Feature: Login
 *  As a user I want to be able to Login */

/** Scenario: 
 *  Access login page from home page */
tom.test('access login page from home page     ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// WHEN I am automatically redirected to login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// THEN I should see the page heading "Log In"
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'log in screen not found')
	// AND the "username" input field should be visible
			const usernameField = await page.$eval('input[name="userName"]', node => node.offsetParent)
			await assert.notEqual(usernameField, null, 'username field is not visible')
			await browser.close()
})

/** Scenario: 
 *  Log in with valid data */
tom.test('log in with valid username/password  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// WHEN I enter "customer3" in the username field
			await page.type('input[name="userName"]', 'customer3')
	// AND I enter "p455w0rd" in the password field
			await page.type('input[name="password"]', 'p455w0rd')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// THEN I should see the "customerHomepage" page	//CHANGE VERIFICATION BECAUSE THERE ARE MULTIPLE PAGES WITH LOGOUT LINK
			heading = await page.$eval('a[href="/logout"]', node => true)
			await assert.equal(heading, true, 'logging in does not take user to homepage page')
			await browser.close()
})

/** Scenario: 
 *  Log in with invalid password */
tom.test('log in with invalid password  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// WHEN I enter "customer3" in the username field
			await page.type('input[name="userName"]', 'customer3')
	// AND I enter "p455w0rds" in the password field (invalid password)
			await page.type('input[name="password"]', 'p455w0rds')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// THEN I should see the "Login" page
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'logging in does not take user to homepage page')
	// AND I should see an error message
			heading = await page.$eval('main>p', node => true)
			await assert.equal(heading, true, 'Login is not throwing an error')
			await browser.close()
})

/** Scenario: 
 *  Log in with invalid username */
tom.test('log in with invalid username  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// WHEN I enter "asdasda" in the username field (invalid username)
			await page.type('input[name="userName"]', 'asdasda')
	// AND I enter "p455w0rd" in the password field
			await page.type('input[name="password"]', 'p455w0rd')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// THEN I should see the "Login" page
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'logging in does not take user to homepage page')
	// AND I should see an error message
			heading = await page.$eval('main>p', node => true)
			await assert.equal(heading, true, 'Login is not throwing an error')
			await browser.close()
})

/** Scenario: 
 *  Log in with invalid username and password */
tom.test('log in with invalid username/password  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// WHEN I enter "customer3" in the username field
			await page.type('input[name="userName"]', 'asdasda')
	// AND I enter "p455w0rd" in the password field
			await page.type('input[name="password"]', 'p455w0rds')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// THEN I should see the "Login" page
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'logging in does not take user to homepage page')
	// AND I should see an error message
			heading = await page.$eval('main>p', node => true)
			await assert.equal(heading, true, 'Login is not throwing an error')
			await browser.close()
})

/** Scenario: 
 *  Log in with empty values */
tom.test('log in with empty values  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// WHEN I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
            await delay(500)
	// THEN I should see the "Login" page (I should not see an error message (Only the text validator one))
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'logging in does not take user to homepage page')
			await browser.close()
})
module.exports = tom