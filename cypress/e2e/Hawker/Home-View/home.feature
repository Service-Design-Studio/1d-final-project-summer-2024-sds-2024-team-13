Feature: Home and Transaction Handling

  Background:
    Given I navigate to the Home View

  Scenario: View Home and Transactions
    Then I should see my daily earnings in the main card
    And I should see a maximum of 5 most recent transactions

  Scenario: User hides their current daily earnings
    Given I want my current daily earnings hidden
    When I click on the "eye" icon
    Then I should see the digits of my "Today's Earnings" replaced by "--.--"