Feature: QR Code Sad Path

  Background:
    Given I am on Home View

  Scenario: Fill in the input field incorrectly and attempt to generate a QR code
    Given I am on Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    When I press "6" on the keypad
    And I press "." on the keypad
    And I press "5" on the keypad
    And I press "0" on the keypad
    Then I should see the input field update to "6.50"
    And I clicked on the Generate button
    Then I clicked on the Edit button
    Then I should be redirected to Payment View
