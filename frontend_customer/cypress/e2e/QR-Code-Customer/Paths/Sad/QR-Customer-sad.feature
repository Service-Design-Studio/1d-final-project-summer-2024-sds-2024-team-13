Feature: QR Code Scanning and Handling

  Background:
    Given I am on Scanning View

  Scenario: Scan a valid QR code with incorrect amount and handle it
    When I scan a valid QR code
    Then I should be redirected to Payment Review view
    And I see a wrong payment amount of $1040.00
    And I should see a Back button
    When I click the Back button
    Then I should be redirected to Scanning view