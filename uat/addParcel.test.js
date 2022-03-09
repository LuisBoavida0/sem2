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

/** Scenario: 
 *  Send Parcel from home page incorrect parcelName */
tom.test('Send Parcel from home page incorrect parcelName    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true }) //{ headless: false, slowMo: 50, args }
                const page = await browser.newPage()
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
        // AND I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // WHEN I enter 'X' in the parcelName field (Invalid parcel name)
                await page.type('input[name="parcelName"]', 'x')
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
        // THEN I should see the "sendParcel" page 
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Send Parcel', 'Adding a parcel incorrectly isnt going to the sendParcel page')
        // AND I should see an error message
                heading = await page.$eval('main > p', node => true)
                await assert.equal(heading, true, 'Send Parcel does not send an error message')
                await browser.close()
})

/** Scenario: 
 *  Send Parcel from home page incorrect senderHouseNumber */
tom.test('Send Parcel from home page incorrect senderHouseNumber    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
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
        // AND I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // WHEN I enter 'Playstation 4' in the parcelName field
                await page.type('input[name="parcelName"]', 'Playstation 4')
        // AND I enter 'CV1 2AA' in the senderPostcode field   
                await page.type('input[name="senderPostcode"]', 'CV1 2AA')
        // AND I click on the getAddress button
                await page.click('input[name="senderPostcode"] + button', { waitUntil: 'networkidle0' })
                await delay(500)
        // AND I enter '9999999999' in the senderHouseNumber field (Invalid house number)
                await page.type('input[name="senderHouseNumber"]', '9999999999')
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
        // THEN I should see the "sendParcel" page 
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Send Parcel', 'Adding a parcel incorrectly isnt going to the sendParcel page')
        // AND I should see an error message
                heading = await page.$eval('main > p', node => true)
                await assert.equal(heading, true, 'Send Parcel does not send an error message')
                await browser.close()
})

/** Scenario: 
 *  Send Parcel from home page incorrect destinationHouseNumber */
tom.test('Send Parcel from home page incorrect destinationHouseNumber    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
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
        // AND I click on the Send Parcel link
                await page.click('a[href="/sendParcel"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // WHEN I enter 'Playstation 4' in the parcelName field
                await page.type('input[name="parcelName"]', 'Playstation 4')
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
        // AND I enter '9999999999' in the destinationHouseNumber field (Invalid house number) 
                await page.type('input[name="destinationHouseNumber"]', '9999999999')
        // AND I enter '10' in the Kgs field   
                await page.type('input[name="kgs"]', '10')
        // AND I click on the sendParcel button
                await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
                await page.waitForNavigation()
        // THEN I should see the "sendParcel" page 
                heading = await page.$eval('h1', node => node.innerText)
                await assert.equal(heading, 'Send Parcel', 'Adding a parcel incorrectly isnt going to the sendParcel page')
        // AND I should see an error message
                heading = await page.$eval('main > p', node => true)
                await assert.equal(heading, true, 'Send Parcel does not send an error message')
                await browser.close()
})

/** Scenario: 
 *  Send Parcel from home page empty values */
tom.test('Send Parcel from home page empty values    ', async function () {
        // GIVEN I am on the homepage
                const browser = await puppeteer.launch({ headless: true })
                const page = await browser.newPage()
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