Feature: Register Navigation
  As a user
  I want to navigate to the register page
  So that I can create an account

  Scenario: Navigate to register page
    Given I am on the login screen
    When I click the register link
    Then I should be routed to the register page
