Feature: Home and Transaction Handling

  Background:
    Given I am on the Home View

  Scenario: View Home and Transactions
    Then I should see my daily earnings in the main card
    And I should see a maximum of 5 most recent transactions

  Scenario: Receive a new transaction of any amount
    When I receive a new transaction of "5.30"
    Then I should see the numbers for 'Today's Earnings' increase by "5.30"