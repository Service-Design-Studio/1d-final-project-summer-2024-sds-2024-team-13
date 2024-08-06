Feature: QR Sad
  Background:
    Given I am on Home View

  Scenario: Manually input amount using keypad and Error
    When I click into the Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    When I press "5" on the keypad
    And I press "." on the keypad
    And I press "2" on the keypad
    And I press "0" on the keypad
    Then I should see the input field update to "5.20"
    And I press "=" on the keypad
    Then I should see a Next button
    When I click the Next button
    Then I should see an error message