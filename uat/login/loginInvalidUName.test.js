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
 *  Log in with invalid username */
 tom.test('log in with invalid username  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.setDefaultTimeout(0)
			await page.setDefaultNavigationTimeout(0)
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
	// AND I click accept on the Cookies screen
			await page.click('a[href="cookiesAccept"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
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
module.exports = tom