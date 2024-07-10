Feature: Home View

  Scenario: User logs in
    Given I open the login page
    When I type in the email "iamgay@gmail.com" 
    And I type in the password "123"
    And I click the login button
    Then I should see the homepage

  Scenario: Viewing daily earnings and transactions
    Given I am logged into the app
    And I am on the Home View
    Then I should see my daily earnings in the main card
    And I should see a maximum of 5 most recent transactions

  Scenario: Navigating to History View and back to Home View
    Given I am logged into the app
    And I am on the Home View
    When I clicked into the History View
    And I clicked into the Home View
    Then I should see my daily earnings in the main card
    And I should see a maximum of 5 most recent transactions

  Scenario: Receiving a new transaction
    Given I am logged into the app
    And I am on the Home View
    When I received a new transaction of 5.30
    Then I should see the numbers for "Today's Earnings" increase by 5.30 in the main card

  Scenario: Multiple customers paying simultaneously
    Given I am logged into the app
    And I am on the Home View
    When 3 customers paid at the same time with 5.30, 2.30, and 2.40
    Then I should see the numbers for "Today's Earnings" increase by 10.00 in the main card
    And I should see 3 transaction cards highlighted red at the top of the most recent 5 transactions section
