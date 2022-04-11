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

/**Feature: Courier See available parcels
 * As a courier I want to be see all the parcels available to assign */

/** Scenario: 
 *   See the available parcels */
tom.test('See the available parcels     ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
                await page.setDefaultTimeout(0)
                await page.setDefaultNavigationTimeout(0)
                await page.goto(url, { waitUntil: 'networkidle0' })
        // AND I am automatically redirected to login 
                let heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I enter "courier1" in the username field
                await page.type('input[name="userName"]', 'courier1')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see the "courierHomepage" page
                const linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take courier to homepage page')
        // WHEN I click on the See Available parcels
                await page.click('a[href="/availableParcels"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I should See the available parcels page
                await page.on('dialog', async dialog => {
                    await dialog.dismiss();
                })
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Available parcels', 'homepage not redirecting to the Available parcels')
        // AND I should see the available parcels
                await delay(500)
                heading = await page.$eval('section>h2', node => true)
                await assert.equal(heading, true, 'Parcels available not showing, make sure there are any')
                await browser.close()
})
module.exports = tom