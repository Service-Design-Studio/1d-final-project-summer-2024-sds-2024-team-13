Feature: Payment View Add Item
  Background:
    Given I am on Home View

  Scenario: Add Chicken Cutlet Noodle to payment
    Given I am on Payment View
    And The input field is 0
    When I clicked on the add button for the Chicken Cutlet Noodle item
    Then I should see the input field amount increase by 6.00
    And I should see the next button turn red
