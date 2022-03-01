Feature: Login
    As a user I want to be able to Login

@Login
    Scenario: Login
    Given I am on the "Home" page #It will redirect to the login page
        And I enter "Customer1" in the "username" box
        And I enter "p455w0rd" in the "password" box
    When I click on the "submit" button
    Then I should see a "Home" message #Goes to the homepage

@Login
    Scenario: LoginIncorrectly
    Given I am on the "Home" page #It will redirect to the login page
        And I enter "a" in the "username" box
        And I enter "b" in the "password" box
    When I click on the "submit" button
        And I should see a "login" #Stays on Login
    Then I should see an "Error" message