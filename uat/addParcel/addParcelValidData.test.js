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
 *  Send a parcel */
tom.test('Send Parcel from home page     ', async function () {
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
        // WHEN I enter 'Playstation 4' in the parcelName field
                await page.type('input[name="parcelName"]', 'XBOX 1')
        // AND I enter 'CV1 2AA' in the senderPostcode field   
                await page.type('input[name="senderPostcode"]', 'CV1 2AA')
        // AND I click on the getAddress button
                await page.click('input[name="senderPostcode"] + button', { waitUntil: 'networkidle0' })
                await delay(500)
        // AND I enter '22' in the senderHouseNumber field   
                await page.type('input[name="senderHouseNumber"]', '22')
        // AND I enter 'CV1 2HZ' in the destinationPostcode field   
                await page.type('input[name="destinationPostcode"]', 'CV1 2HZ')
        // AND I click on the getAddress button
                await page.click('input[name="destinationPostcode"] + button', { waitUntil: 'networkidle0' })
                await delay(500)
        // AND I enter '217' in the destinationHouseNumber field   
                await page.type('input[name="destinationHouseNumber"]', '217')
        // AND I enter '10' in the Kgs field   
                await page.type('input[name="kgs"]', '10')
        // AND I click on the sendParcel button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I should see the "customerHomepage" page
                heading = await page.$eval('a[href="/logout"]', node => true)   //CHECK DIFFERENTLY IF IT IS IN HOMEPAGE BECAUSE THERE IS LOGOUT LINK IN MULTIPLE PAGES
                await assert.equal(heading, true, 'Send Parcel does not take user to homepage page')
                await browser.close()
        //AND SEE A SUCCESS MESSAGE
})
module.exports = tom