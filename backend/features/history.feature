Feature: History Page
    Scenario: Visit the history page
        Given I click on the history icon
        Then I should be redirected to the history page

Feature: More Details
    Scenario: View more transaction details
        Given I am on the history page
        And I click on a card
        Then I should be redirected to "transaction"

Feature: Filter 
    Scenario: Filter transactions displayed by date
        given I am on the history page
        when I click on the filter icon
        And select a specific date
        Then only transactions from those dates will be displayed