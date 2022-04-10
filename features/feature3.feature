Feature: Assign Parcel
    As a courier I want to be able to assign parcels

@ParcelManagement
    Scenario: Access assign parcels page from homepage
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "courier1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "courierHomepage" page
    When I click on the See Available parcels link
    Then I should See the available parcels page

@ParcelManagement
    Scenario: Assign parcel correctly
    Given I am on the "Home" page
        And I am redirected to the login 
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
    When I click on the See Available parcels
        AND I See the available parcels page
        AND I click on the newly created parcel
    Then I should see a success message

@ParcelManagement
    Scenario: Try to assign parcel with a tracking number with incorrect length
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "courier1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "courierHomepage" page
    When I enter "incorrect" in the tracking number field
        AND I click on the Assign button
    Then I should See an error message

@ParcelManagement
    Scenario: Try to assign parcel with incorrect tracking number
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "courier1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "courierHomepage" page
    When I enter "32bb3fea-5509-46c6-9e15-9d525759212a" in the tracking number field
        AND I click on the Assign button
    Then I should See an error message