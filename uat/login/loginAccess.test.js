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
			await page.setDefaultTimeout(0)
			await page.setDefaultNavigationTimeout(0)
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
module.exports = tom