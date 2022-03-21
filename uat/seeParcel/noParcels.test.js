const puppeteer = require('puppeteer'); //include Puppeteer Library
const assert = require('assert').strict
const { Tom } = require('test-runner')
const tom = new Tom()

const url = 'https://bazaar-sponsor-8080.codio-box.uk/'

function delay(time) {
        return new Promise(function (resolve) {
                setTimeout(resolve, time)
        });
}

/**Feature: See Parcels
 * As a user I want to be able to See my parcels */


/** Scenario: 
 *   See the no parcels message */
 tom.test('See the no parcels message    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
                await page.setDefaultTimeout(0)
                await page.setDefaultNavigationTimeout(0)
                await page.goto(url, { waitUntil: 'networkidle0' })
        // AND I am automatically redirected to login 
                let heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I enter "customer3" in the username field
                await page.type('input[name="userName"]', 'customer7')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // WHEN I see the "customerHomepage" page
                const linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take user to homepage page')
        // THEN I should see the parcels page saying that i dont have any parcels yet
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, "You don't have any parcels yet, click Send Parcel to send one", 'No parcels message not showing')
                await browser.close()
})
module.exports = tom