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

/**Feature: Register
 * As a user I want to be able to register an account */

/** Scenario: 
 *  register with invalid passwords */
 tom.test('register with invalid passwords   ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.setDefaultTimeout(0)
			await page.setDefaultNavigationTimeout(0)
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I am redirected to the login
			let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'log in screen not found')
	// AND I click on the register link
			await page.click('a[href="/register"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// AND I am now on the register page
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Register', 'Register screen not found')
	// WHEN I enter "customerDATE" in the username field
			let todaysdate = new Date().toISOString().replaceAll(':', '').replaceAll('-', '').replaceAll('Z', '').replaceAll('T', '').replaceAll('.', '')
			await page.type('input[name="userName"]', `user${todaysdate}`)
	// AND I enter "customerDate@gmail.com" in the email field
			await page.type('input[name="email"]', `user${todaysdate}@gmail.com`)			
	// AND I enter "p" in the password field (Invalid password)
			await page.type('input[name="password"]', 'p')
	// AND I enter "p" in the password2 field (Invalid password)
			await page.type('input[name="password2"]', 'p')
	// AND I click on the register button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// THEN I should see the page heading "Register"
			heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Register', 'Register screen not found')
	// AND I should see an error message
			heading = await page.$eval('main>p', node => true)
			await assert.equal(heading, true, 'Register is not throwing an error')
			await browser.close()
})
module.exports = tom