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
 *   Access login page from home page */
tom.test('access register page from home page', async function () {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.setDefaultTimeout(0)
			await page.setDefaultNavigationTimeout(0)
			await page.goto(url, { waitUntil: 'networkidle0' })
    // AND I am redirected to the login
            let heading = await page.$eval('h1', node => node.innerText)
			await assert.equal(heading, 'Login', 'log in screen not found')
	// AND I click accept on the Cookies screen
			await page.click('a[href="cookiesAccept"]', { waitUntil: 'networkidle0' })
			await page.waitForNavigation()
	// WHEN I click on the register link
            await page.click('a[href="/register"]', { waitUntil: 'networkidle0' })
            await page.waitForNavigation()
	// THEN I should see the page heading "Register"			
            heading = await page.$eval('h1', node => node.innerText)
            await assert.equal(heading, 'Register', 'Register screen not found')
			await browser.close()
})
module.exports = tom