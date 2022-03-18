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
 *  Log in with empty values */
 tom.test('log in with empty values  ', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.setDefaultTimeout(0)
			await page.setDefaultNavigationTimeout(0)
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