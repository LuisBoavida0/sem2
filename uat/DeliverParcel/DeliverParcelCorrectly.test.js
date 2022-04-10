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

/**Feature: Deliver Parcel
 * As a courier I want to be able to deliver parcels */

/** Scenario: 
 *   Deliver a parcel correctly */
tom.test('Deliver a parcel correctly     ', async function () {
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
        // AND I click on the See Available parcels
                await page.click('a[href="/availableParcels"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I See the available parcels page
                await page.on('dialog', async dialog => {
                    await dialog.dismiss();
                })
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Available parcels', 'homepage not redirecting to the Available parcels')
        // AND I click on the newly created parcel (To put it as in-transit)
                await delay(500)
                await page.click('section:last-of-type input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // AND I see a success message
                heading = await page.$eval('main>p', node => node.innerText)
                await assert.equal(heading, 'Parcel Assigned', 'parcel not being correctly assigned')
        // WHEN I click deliver on that newly added 
                await page.click('main>section:last-of-type a', { waitUntil: 'networkidle0' })
        // AND I See the delivery screen
                await delay(500)
                heading = await page.$eval('form>h2', node => node.innerText)
                await assert.equal(heading, 'Delivery screen', 'homepage not redirecting to the Delivery Screen')
        // AND I type 50 to the latitude field (to surpass the location permission)
                await page.type('input[name="locationReceivedLat"]', '50.2')
        // AND I type 50 to the longitude field (to surpass the location permission)
                await page.type('input[name="locationReceivedLng"]', '50.2')
        // AND I type Luis Boavida in the name field
                await page.type('input[name="personWhoReceivedParcel"]', 'Luis Boavida')
        // AND I add an image to the signature
                const elementHandle = await page.$('input[type=file]')
                await elementHandle.uploadFile('./signature.jpg')
        // AND I click on the deliver page
                await page.click('form>input[type=submit]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I should see a success message
                heading = await page.$eval('main>p', node => node.innerText)
                await assert.equal(heading, 'Parcel delivered with success', 'Delivery screen not returning a success message')
                await browser.close()
})
module.exports = tom