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
 *   Deliver a parcel with a non existing tracking number */
tom.test('Deliver a parcel with a non existing tracking number     ', async function () {
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
                linkPage = await page.evaluate(() => document.location.href)
                await assert.equal(url, linkPage, 'logging in does not take courier to homepage page')
        // WHEN I go to delivery with a non existing tracking number   
                await page.on('dialog', async dialog => {
                        await dialog.dismiss();
                })  
                await page.goto('https://bazaar-sponsor-8080.codio-box.uk/deliveryScreen/6091a13e-0f1b-4982-bd7c-6137b998tttt', { waitUntil: 'networkidle0' })
        // AND I See the delivery page           
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
        // THEN I should see a error message
                heading = await page.$eval('main>p', node => node.innerText)
                await assert.equal(heading, 'Error: No parcel found with that tracking number', 'Delivery screen not returning a success message')
                await browser.close()
})
module.exports = tom