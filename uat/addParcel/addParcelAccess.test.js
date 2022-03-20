const puppeteer = require('puppeteer'); //include Puppeteer Library
const assert = require('assert').strict
const { Tom } = require('test-runner')
const tom = new Tom()

const url = 'https://bazaar-sponsor-8080.codio-box.uk' 

function delay(time) {
        return new Promise(function (resolve) {
                setTimeout(resolve, time)
        });
}

/**Feature: Send Parcel
 * As a user I want to be able to create parcels */

/** Scenario: 
 *  Access Send Parcel from homepage */
 tom.test('Access Send Parcel from homepage    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
                await page.setDefaultTimeout(0)
                await page.setDefaultNavigationTimeout(0)
                await page.goto(url, { waitUntil: 'networkidle0' })
        // AND I am redirected to the login
                let heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I enter "customer3" in the username field
                await page.type('input[name="userName"]', 'customer3')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see the "customerHomepage" page
                heading = await page.$eval('a[href="/logout"]', node => true)
                await assert.equal(heading, true, 'logging in does not take user to homepage page')
        // When I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I should see the "sendParcel" page
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Send Parcel', 'redirecting to add parcel not working')
                await browser.close()
})
module.exports = tom