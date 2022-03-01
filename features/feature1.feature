Feature: Send Parcel
    As a user I want to be able to create parcels

@ParcelManagement
    Scenario: Send a parcel
    Given I am on the "Home" page #It will redirect to the login page
        And I enter "Customer1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "submit" button    #Goes to the homepage as a customer
    When I click on the "Send Parcel" button    #Goes to the sendParcel Page
        And I enter "parcelTest" in the "parcelName" box
        And I enter "CV1 2AA" in the "senderPostcode" box
        And I enter "CV1 2HZ" in the "destinationPostcode" box
        And I enter "20" in the "kgs" box
    Then I should see a "Parcel was created successfully!" message #Goes to the homepage with the success message