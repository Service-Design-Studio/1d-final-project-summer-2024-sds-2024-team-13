Feature: QR Sad Path
  
  Background:
    Given I am on Home View

  Scenario: Auto-generating from a Menu with missing labels
    When I click into the More View
    Then I should see a "Menu Preset" button
    Then I click the "Menu Preset" button
    Then I should see an option for "Auto-Generate Menu Items"
    When I click into the "Auto-Generate Menu Items" option
    Then I should see instructions
    Then I browse and select the upload image button
    Then I should see a preview of the selected image
    Then I click on the "Continue" button
    Then I should see the menu items auto-generated based on the selected image
    Then I click on the continue button
    Then I should see the new menu items in the Menu View
    Then I should see menu item Tiger Prawn in the Menu View
    Then I click into menu item Tiger Prawn
    Then I should see the edit page of menu item Tiger Prawn
    When I click on the price
    Then I clear the price
    Then I input 15.00
    Then I click the Confirm button
    Then I should see the price of menu item Tiger Prawn as "$15.00"

  Scenario: Auto-generating from a non-Menu
    When I click into the More View
    Then I should see a "Menu Preset" button
    Then I click the "Menu Preset" button
    Then I should see an option for "Auto-Generate Menu Items"
    When I click into the "Auto-Generate Menu Items" option
    Then I click on upload image button
    Then I browse and select a non-Menu
    Then I should see a preview of the selected image
    When I click on the "Continue" button
    Then I should see an error message
  
  Scenario: Inputting a negative amount
    When I click into the Payment View
    Then I should see an input field with 0
    When I click on input field
    Then I should see a keypad
    When I press "5" on the keypad
    And I press "." on the keypad
    And I press "2" on the keypad
    And I press "0" on the keypad
    Then I should see the input field update to "5.20"
    And I press "-" on the keypad
    Then I should see a grey text "5.20-"
    And I press "6" on the keypad
    Then I should see see the input field update to "-0.80" 
    And I should see a Next button disabled