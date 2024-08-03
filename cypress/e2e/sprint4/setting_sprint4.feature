Feature: Payment and QR Code Handling
  Background:
    Given I am on Home View

  Scenario: Home View to Payment View
    When I click into the Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    Then I should see a Next button

  Scenario: Manually input amount using keypad and verify update
    When I click into the Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    When I press "5" on the keypad
    And I press "." on the keypad
    And I press "2" on the keypad
    And I press "0" on the keypad
    Then I should see the input field update to "5.20"
    When I click the arrow icon
    Then I should see a Next button
    When I click the Next button
    Then I should be redirected to the QR Pay view
