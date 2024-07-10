Feature: User Login

  Scenario: User logs in
    Given I open the login page
    When I type in the email "iamgay@gmail.com" and password "123"
    And I click the login button
    Then I should see the homepage
