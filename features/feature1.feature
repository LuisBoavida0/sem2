Feature: Send Parcel
    As a user I want to be able to create parcels

@ParcelManagement
    Scenario: Send a parcel
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        And I click on the Send Parcel link
        And I see the "sendParcel" page
     When I enter 'Playstation 4' in the parcelName field
        And I enter 'CV1 2AA' in the senderPostcode field   
        And I click on the getAddress button
        And I enter '22' in the senderHouseNumber field   
        And I enter 'CV1 2HZ' in the destinationPostcode field   
        And I click on the getAddress button
        And I enter '217' in the destinationHouseNumber field   
        And I enter '10' in the Kgs field   
        And I click on the sendParcel button
    Then I should see the "customerHomepage" page
        And I should see a success message
        
@ParcelManagement
    Scenario: Send Parcel from home page incorrect parcelName
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        And I click on the Send Parcel link
        And I see the "sendParcel" page
     When I enter 'X' in the parcelName field (incorrect value)
        And I enter 'CV1 2AA' in the senderPostcode field   
        And I click on the getAddress button
        And I enter '22' in the senderHouseNumber field   
        And I enter 'CV1 2HZ' in the destinationPostcode field   
        And I click on the getAddress button
        And I enter '217' in the destinationHouseNumber field   
        And I enter '10' in the Kgs field   
        And I click on the sendParcel button
    Then I should see the "sendParcel" page
        And I should see an error message
                
@ParcelManagement
    Scenario: Send Parcel from home page incorrect senderHouseNumber
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        And I click on the Send Parcel link
        And I see the "sendParcel" page
     When I enter 'Playstation 4' in the parcelName field
        And I enter 'CV1 2AA' in the senderPostcode field   
        And I click on the getAddress button
        And I enter '9999999999' in the senderHouseNumber field (incorrect value) 
        And I enter 'CV1 2HZ' in the destinationPostcode field   
        And I click on the getAddress button
        And I enter '217' in the destinationHouseNumber field   
        And I enter '10' in the Kgs field   
        And I click on the sendParcel button
    Then I should see the "sendParcel" page
        And I should see an error message
                        
@ParcelManagement
    Scenario: Send Parcel from home page incorrect destinationHouseNumber
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        And I click on the Send Parcel link
        And I see the "sendParcel" page
     When I enter 'Playstation 4' in the parcelName field
        And I enter 'CV1 2AA' in the senderPostcode field   
        And I click on the getAddress button
        And I enter '22' in the senderHouseNumber field
        And I enter 'CV1 2HZ' in the destinationPostcode field   
        And I click on the getAddress button
        And I enter '9999999999' in the destinationHouseNumber field (Invalid value)
        And I enter '10' in the Kgs field   
        And I click on the sendParcel button
    Then I should see the "sendParcel" page
        And I should see an error message

@ParcelManagement
    Scenario: Send Parcel from home page empty values
    Given I am on the "Home" page
        And I am redirected to the login 
        And I click accept on the Cookies screen
        And I enter "customer3" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "customerHomepage" page
        And I click on the Send Parcel link
        And I see the "sendParcel" page
     When I dont fill the form
        And I click on the sendParcel button
    Then I should see the "sendParcel" page
        And I should see a validation error message (a popup on the text area)