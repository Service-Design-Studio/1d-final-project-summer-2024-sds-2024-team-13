Feature: User Login
    Scenario: Successful login
        Given I am on the login page
        When I enter my username and password
        And I click the login button
        Then I should be redirected to Home Page

Feature: Home Page
    Scenario: Visit the home page
        Given I am on the home page
        Then I should see "Home"

Feature: Hide Amount
    Scenario: Hide amount on home page
        Given I am on the home page
        And I click the hide button
        Then the amount should be hidden

Feature: More Details
    Scenario: View more transaction details
        Given I am on the home page
        And I click on a card
        Then I should be redirected to "transaction"

Feature: Refresh
    Scenario: Refresh home page
        Given I am on the home page
        and I click on the refresh button
        Then the home page should refresh