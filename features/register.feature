Feature: Login
    As a user I want to be able to register an account

@Register
    Scenario: register with valid data
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I enter "customerDATE" in the username field
        AND I enter "customerDate@gmail.com" in the email field
        AND I enter "p455w0rd" in the password field
        AND I enter "p455w0rd" in the password2 field
        AND I click on the register button
    THEN I should see the Login Page
        AND I should see a success message

@Register
    Scenario: register with empty values
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I dont fill anything
        AND I click on the register button
    THEN I should see the Register page
        And I should see a validation error message (a popup on the text area)

@Register
    Scenario: register with invalid username
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I enter "a" in the username field (invalid username)
        AND I enter "customerDate@gmail.com" in the email field
        AND I enter "p455w0rd" in the password field
        AND I enter "p455w0rd" in the password2 field
        AND I click on the register button
    THEN I should see the Register Page
        AND I should see an error message
        
@Register
    Scenario: register with invalid email
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I enter "customerDATE" in the username field
        AND I enter "a@a.com" in the email field (invalid email)
        AND I enter "p455w0rd" in the password field
        AND I enter "p455w0rd" in the password2 field
        AND I click on the register button
    THEN I should see the Register Page
        AND I should see an error message
                
@Register
    Scenario: register with different passwords
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I enter "customerDATE" in the username field
        AND I enter "customerDate@gmail.com" in the email field
        AND I enter "p455w0rd" in the password field
        AND I enter "p455w0rd2" in the password2 field (Invalid password)
        AND I click on the register button
    THEN I should see the Register Page
        And I should see a validation error message (a popup on the text area)
                                
@Register
    Scenario: register with invalid passwords
    GIVEN I am on the homepage
        AND I am redirected to the login
        AND I click on the register link
        AND I am now on the register page
    WHEN I enter "customerDATE" in the username field
        AND I enter "customerDate@gmail.com" in the email field (invalid email)
        AND I enter "p455w0rd" in the password field
        AND I enter "p455w0rd" in the password2 field
        AND I click on the register button
    THEN I should see the Register Page
        AND I should see an error message