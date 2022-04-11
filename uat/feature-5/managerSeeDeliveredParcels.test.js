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

/**Feature: Manager homepage
 * As a manager I want to be able to access the delivered parcels page */

/** Scenario: 
 *   See the delivered parcels page */
tom.test('See the delivered parcels page     ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
                await page.setDefaultTimeout(0)
                await page.setDefaultNavigationTimeout(0)
                await page.goto(url, { waitUntil: 'networkidle0' })
        // AND I am automatically redirected to login 
                let heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I enter "manager" in the username field
                await page.type('input[name="userName"]', 'manager')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see the "managerHomepage" page
                const linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take manager to homepage page')
        // WHEN I click on the delivered parcels
                await page.click('a[href="/deliveredParcels"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I See the delivered parcels page
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Delivered Parcels', 'homepage not redirecting to the delivered Parcels')
        // THEN I should see the parcels
                heading = await page.$eval('section>h2', node => true)
                await assert.equal(heading, true, 'delivered parcels not showing, make sure there are any')
                await browser.close()
})
module.exports = tom