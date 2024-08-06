Feature: Payment Happy Path

  Background:
    Given I am on Home View

  Scenario: Setting Menu via Auto-Generation
    When I click into the More View
    Then I should see a "Menu Preset" button
    Then I click the "Menu Preset" button
    Then I should see an option for "Auto-Generate Menu Items"
    When I click into the "Auto-Generate Menu Items" option
    Then I should see instructions
    Then I browse and select the upload image button
    Then I should see a preview of the selected image
    When I click on the "Continue" button
    Then I should see the menu items auto-generated based on the selected image
    Then I should see the new menu items in the Menu View

    Scenario: Add Chicken Cutlet Noodle to payment
    Given I am on Payment View
    And The input field is 0
    When I clicked on the add button for the Chicken Cutlet Noodle item
    Then I should see the input field amount increase by 6.00
    And I should see the next button turn red

  Scenario: Successful payment process
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
    Then I should be redirected to the QR Pay view
    Given that I am on QR Pay View
    When customer has made the payment within 30 seconds
    Then I should see an animation
    Then I should be redirected to Payment View after 5 seconds
    Then I should be redirected to Payment View