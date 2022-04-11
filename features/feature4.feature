Feature: Deliver Parcel
    As a courier I want to be able to deliver parcels

@ParcelManagement
    Scenario: Access deliver page from homepage
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "courier1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "courierHomepage" page
    When I go to the delivery screen
    Then I should See the available parcels page

@ParcelManagement
    Scenario: Deliver a parcel correctly
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        AND I click on the Send Parcel link
        AND I enter 'XBOX 1' in the parcelName field
        AND I enter 'CV1 2AA' in the senderPostcode field 
        AND I click on the getAddress button
        AND I enter '22' in the senderHouseNumber field
        AND I enter 'CV1 2HZ' in the destinationPostcode field
        AND I click on the getAddress button
        AND I enter '217' in the destinationHouseNumber field
        AND I enter '10' in the Kgs field
        AND I click on the sendParcel button
        AND I am redirected to the homepage
        AND I click on the logout button
        AND I am now on login
        AND I enter "courier1" in the username field
        AND I enter "p455w0rd" in the password field
        AND I click on the login button
        AND I see the "courierHomepage" page
        AND I click on the See Available parcels
        AND I See the available parcels page
        AND I click on the newly created parcel (to put it as in-transit)
        AND I see a success message
    When I click deliver on that newly added
        AND I See the delivery screen
        AND I type 50 to the latitude field (to surpass the location permission)
        AND I type 50 to the longitude field (to surpass the location permission)
        AND I type Luis Boavida in the name field
        AND I add an image to the signature
        AND I click on the deliver page
    Then I should see a success message


@ParcelManagement
    Scenario: Deliver a parcel with a non existing tracking number
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        AND I enter "courier1" in the username field
        AND I enter "p455w0rd" in the password field
        AND I click on the login button
        AND I see the "courierHomepage" page
    WHEN I go to delivery with a non existing tracking number
        AND I See the delivery page
        AND I type 50 to the latitude field (to surpass the location permission)
        AND I type 50 to the longitude field (to surpass the location permission)
        AND I type Luis Boavida in the name field
        AND I add an image to the signature
        AND I click on the deliver page
    Then I should see a success message

