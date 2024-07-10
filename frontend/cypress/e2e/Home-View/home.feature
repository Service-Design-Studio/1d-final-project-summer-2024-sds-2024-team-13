Feature: Viewing daily earnings and transactions

Scenario: User logs in and views daily earnings and transactions
  Given I open the login page
  And I type in the email "iamgay@gmail.com" and password "123"
  And I click the login button
  Then I should see the homepage
  And I should see my daily earnings and my most recent transactions in the top red card
  And I should see a maximum of 5 most recent transactions

Scenario: Navigating to History View and back to Home View
  Given I am logged into the app
  And I am on the Home View
  When I click into the History View
  And I click into the Home View
  Then I should see my daily earnings and my most recent transactions in the top red card
  And I should see a maximum of 5 most recent transactions

Scenario: Receiving a new transaction
  Given I am logged into the app
  And I am on the Home View
  When I receive a new transaction of 5.30
  Then I should see the numbers for "Today’s Earnings" increase by 5.30

Scenario: Multiple customers paying simultaneously
  Given I am logged into the app
  And I am on the Home View
  When 3 customers pay at the same time with 5.30, 2.30, and 2.40
  Then I should see the numbers for "Today’s Earnings" increase by 10.00
  And I should see the transaction of 5.30 showing on the Most Recent Transaction section in the top red card
  And I should see 3 transaction cards highlighted red at the top of the most recent 5 transactions section
