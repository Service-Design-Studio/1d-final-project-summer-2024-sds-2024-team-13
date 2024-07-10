Feature: User registration and login

  Scenario: User registers and logs in
    Given I open the login page
    When I click on the register link
    And I type in the name "Edina"
    And I type in the email "hahahahaha@example.com"
    And I type in the phone number "1234567890"
    And I type in the password "password"
    And I click the register button
    Then I should be redirected to the login page
    When I type in the email "hahahaha@example.com"
    And I type in the password "password"
    And I click the login button
    Then I should see the homepage
