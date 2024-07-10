Feature: Login Screen
  As a user
  I want to open the app
  So that I can see the login screen

  Scenario: Open app and see login screen
    Given I open the app
    Then I should see the login screen

  Scenario: Successful login
    Given I am on the login screen
    When I enter my email and password
    And I click the login button
    Then I should see the home screen
