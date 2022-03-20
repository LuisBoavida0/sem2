Feature: See Parcels
    As a user I want to be able to See my parcels

@seeParcels
    Scenario: Access customer homepage from homepage
    GIVEN I am on the homepage
        AND I am automatically redirected to login 
        AND I enter "customer3" in the username field
        AND I enter "p455w0rd" in the password field
    WHEN I click on the login button
    THEN I should see the "customerHomepage" page

@seeParcels
    Scenario: See the customer parcels
    GIVEN I am on the homepage
        AND I am automatically redirected to login 
        AND I enter "customer3" in the username field
        AND I enter "p455w0rd" in the password field
        AND I click on the login button
    WHEN I should see the "customerHomepage" page
    THEN I should see the parcels

@seeParcels
    Scenario: See the no parcels message
    GIVEN I am on the homepage
        AND I am automatically redirected to login 
        AND I enter "customer3" in the username field
        AND I enter "p455w0rd" in the password field
        AND I click on the login button
    WHEN I should see the "customerHomepage" page
    THEN I should see the parcels page saying that i dont have any parcels yet
