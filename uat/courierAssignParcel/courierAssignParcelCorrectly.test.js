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

/**Feature: Assign Parcel
 * As a courier I want to be able to assign parcels */

/** Scenario: 
 *   Assign a parcel correctly */
tom.test('Access Assign parcels page from homepage     ', async function () {
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
        // AND I enter "customer3" in the username field
                await page.type('input[name="userName"]', 'customer3')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see the "customerHomepage" page
                let linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take user to homepage page')
        // AND I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I enter 'XBOX 1' in the parcelName field
                await page.type('input[name="parcelName"]', 'XBOX 1')
        // AND I enter 'CV1 2AA' in the senderPostcode field   
                await page.type('input[name="senderPostcode"]', 'CV1 2AA')
        // AND I click on the getAddress button
                await page.click('input[name="senderPostcode"] + button', { waitUntil: 'networkidle0' })
                await delay(200)
        // AND I enter '22' in the senderHouseNumber field   
                await page.type('input[name="senderHouseNumber"]', '22')
        // AND I enter 'CV1 2HZ' in the destinationPostcode field   
                await page.type('input[name="destinationPostcode"]', 'CV1 2HZ')
        // AND I click on the getAddress button
                await page.click('input[name="destinationPostcode"] + button', { waitUntil: 'networkidle0' })
                await delay(200)
        // AND I enter '217' in the destinationHouseNumber field   
                await page.type('input[name="destinationHouseNumber"]', '217')
        // AND I enter '10' in the Kgs field   
                await page.type('input[name="kgs"]', '10')
        // AND I click on the sendParcel button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I am redirected to the homepage
        // AND I click on the logout button        
                await page.click('a[href="/logout"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I am now on login 
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Login', 'homepage not redirecting to the login')
        // AND I enter "courier1" in the username field
                await page.type('input[name="userName"]', 'courier1')
        // AND I enter "p455w0rd" in the password field
                await page.type('input[name="password"]', 'p455w0rd')
        // AND I click on the login button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see the "courierHomepage" page
                linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take courier to homepage page')
        // WHEN I click on the See Available parcels
                await page.click('a[href="/availableParcels"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I should See the available parcels page
                await page.on('dialog', async dialog => {
                    await dialog.dismiss();
                })
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Available parcels', 'homepage not redirecting to the Available parcels')
        // AND I click on the newly created parcel
                await delay(500)
                await page.click('section:last-of-type input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I see a success message
                heading = await page.$eval('main>p', node => node.innerText)
                await assert.equal(heading, 'Parcel Assigned', 'parcel not being correctly assigned')
                await browser.close()
})
module.exports = tom