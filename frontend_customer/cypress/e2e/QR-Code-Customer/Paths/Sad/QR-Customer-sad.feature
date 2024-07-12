Feature: Customer Payment Sad Path

  Background:
    Given I am on Scanning View

  Scenario: Wrong Payment Input
    When I scan a valid QR code 
    Then I should be redirected to Payment Review view
    And I see a wrong payment amount of $1040.00
    And I should see a Back button
    When I click the Back button 
    Then I should be redirected to Scanning view