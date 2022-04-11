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
 *  Send Parcel from home page empty values */
 tom.test('Send Parcel from home page empty values    ', async function () {
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
        // AND I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // WHEN I am on the send parcel page
        // AND I dont fill the form
        // AND I click on the sendParcel button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await delay(500)
        // THEN I should see the "sendParcel" page (I should not see an error message (Only the text validator one)) 
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Send Parcel', 'Adding a parcel incorrectly isnt going to the sendParcel page')
                await browser.close()
})
module.exports = tom