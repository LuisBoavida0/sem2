Feature: Courier See available parcels
    As a courier I want to be see all the parcels available to assign

@ParcelManagement
    Scenario: See the available parcels
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "courier1" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "courierHomepage" page
    When I click on the See Available parcels
    THEN I should See the available parcels page
        And I should see the available parcels



Feature: Manager homepage
    As a manager I want to be able to access the manager homepage

@ParcelManagement
    Scenario: Access the manager homepage
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
    When I click on the "login" button
    Then I see the "managerHomepage" page

@ParcelManagement
    Scenario: See couriers in transit
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
    When I see the "managerHomepage" page
    Then I should see the couriers and click on one of them
        And I should see the modal



Feature: Manager unpicked
    As a manager I want to be able to access the unpicked parcels page 

@ParcelManagement
    Scenario: Access the Unpicked parcels page
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "managerHomepage" page
    WHEN I click on the Unpicked parcels
    THEN I should See the Unpicked parcels page
  

@ParcelManagement
    Scenario: See the Unpicked parcels page
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "managerHomepage" page
    WHEN I click on the Unpicked parcels
        And I See the Unpicked parcels page
    THEN I should see the parcels   



Feature: Manager delivered
    As a manager I want to be able to access the delivered parcels page

@ParcelManagement
    Scenario: Access the Delivered parcels page
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "managerHomepage" page
    WHEN I click on the delivered parcels
    THEN I should See the delivered parcels page
  

@ParcelManagement
    Scenario: See the delivered parcels page
    Given I am on the "Home" page
        And I am redirected to the login 
        And I enter "manager" in the "username" box
        And I enter "p455w0rd" in the "password" box
        And I click on the "login" button
        And I see the "managerHomepage" page
    WHEN I click on the delivered parcels
        AND I See the delivered parcels page
    THEN I should see the parcels  