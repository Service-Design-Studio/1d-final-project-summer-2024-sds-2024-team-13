Feature: User Login

  Scenario: User logs in
    Given I open the login page
    When I type in the email "chicken@gmail.com" 
    And I type in the password "123"
    And I click the login button
    Then I should see the homepage
