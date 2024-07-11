Feature: Payment Happy Path

  Background:
    Given I am on Home View

  Scenario: Successful payment process
    When I click into the Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    When I press "5" on the keypad
    And I press "." on the keypad
    And I press "2" on the keypad
    Then I should see the input field update to "5.20"
    When I click the arrow icon
    Then I should see a Next button
    When I click the Next button
    Then I should be redirected to the QR Pay view
    Given that I am on QR Pay View
    When customer has made the payment within 30 seconds
    Then I should see an animation
    Then I should be redirected to Payment View after 5 seconds
    Then I should be redirected to Payment View
