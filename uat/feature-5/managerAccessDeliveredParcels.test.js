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
 *   Access the Delivered parcels page */
tom.test('Access the Unpicked parcels page     ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
                await page.setDefaultTimeout(0)
                await page.setDefaultNavigationTimeout(0)
                await page.goto(url, { waitUntil: 'networkidle0' })
        // AND I am automatically redirected to login 
                let heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I click accept on the Cookies screen
                await page.click('a[href="cookiesAccept"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
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
        // THEN I should See the delivered parcels page
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Delivered Parcels', 'homepage not redirecting to the Delivered Parcels')
})
module.exports = tom