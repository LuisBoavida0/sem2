Feature: Login
    As a user I want to be able to Login

@Login
    Scenario: Log in with valid data
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click accept on the Cookies screen
    WHEN I enter "customer3" in the username field
        AND I enter "p455w0rd" in the password field
        AND I click on the login button      
    THEN I should see the HOME page

@Login
    Scenario: Log in with invalid password
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click accept on the Cookies screen
    WHEN I enter "customer3" in the username field
        AND I enter "p455w0rds" in the password field (invalid password)
        AND I click on the login button      
    THEN I should see the Login page
        And I should see an error message

@Login
    Scenario: Log in with invalid username
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click accept on the Cookies screen
    WHEN I enter "asdasda" in the username field (invalid username)
        AND I enter "p455w0rd" in the password field
        AND I click on the login button      
    THEN I should see the Login page
        And I should see an error message

@Login
    Scenario: Log in with invalid username and password
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click accept on the Cookies screen
    WHEN I enter "asdasda" in the username field (invalid username)
        AND I enter "p455w0rds" in the password field (invalid password)
        AND I click on the login button      
    THEN I should see the Login page
        And I should see an error message

@Login
    Scenario: Log in with empty values
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click accept on the Cookies screen
    WHEN I click on the login button      
    THEN I should see the Login page
        And I should see a validation error message (a popup on the text area)