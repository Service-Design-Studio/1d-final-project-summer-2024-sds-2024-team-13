Feature: recent transactions

    As a hawker who needs to juggle between serving customers and ensuring correct payments
    I want a quick and convenient method to view my recent transactions at a glance
    So that I can efficiently verify new incoming transactions

Scenario: user just logged in

    Given that I am logged into the app
    And I am on the Home View
    Then I should see my daily earnings and my most recent transaction in the top Red Card
    And I should see a maximum of the most recent 5 transactions in chronological order, with the newest at the top

Scenario: user views a transaction

    Given that I am on the Home View
    And I clicks on the topmost transaction in the most recent 5 transactions section
    Then I should see a popup Transaction Details View showing amount, timestamp, payment source, transaction id and customer mobile

Scenario: user accidentally clicked into History View

    Given that I am on the Home View 
    And I clicked into the History View
    And I clicked into the Home View
    Then I should see my daily earnings and my most recent transaction in the top Red Card
    And I should see a maximum of the most recent 5 transactions in chronological order, with the newest at the top

Scenario: user accidentally clicked into More View

    Given that I am on the Home View 
    And I clicked into the More View
    And I clicked into the Home View
    Then I should see my daily earnings and my most recent transaction in the top Red Card
    And I should see a maximum of the most recent 5 transactions in chronological order, with the newest at the top

Scenario: incoming new transaction
    
    Given that I am on the Home View
    And I have just received a new transaction of 5.30
    Then I should see the numbers for "Today's Earnings" increase by 5.30
    And I should see the transaction showing on the Most Recent transaction section in the top Red Card
    And I should see the transaction highlighted red at the top of the most recent 5 transactions section

Scenario: multiple transactions at the same time

    Given that I am on the Home View
    And 3 customers paid at the same time with 5.30, 2.30 and 2.40
    Then I should see the numbers for "Today's Earnings" increase by 10.00
    And I should see the transaction of 5.30 showing on the Most Recent transaction section in the top Red Card  #take the max of all the transactions from the same timing
    And I should see 3 transaction cards highlighted red at the top of the most recent 5 transactions section

Scenario: user wants to hide daily earnings

    Given that I am on the Home View
    And I want to hide my current daily earnings
    And I click on the 'eye' icon
    Then I should see the digits of my "Today's Earnings" replaced by '*'

Scenario: transaction not reflected instantly

    Given that I am on the Home View
    And a customer just paid me 5.30
    And the transaction of 5.30 is not shown on the Most Recent transaction section in the top Red Card
    And I click on the refresh button
    Then I should see the numbers for "Today's Earnings" increase by 5.30
    And I should see the refresh timestamp showing "last refreshed at {current_time}"
    And I should see the transaction showing on the Most Recent transaction section in the top Red Card
    And I should see the transaction highlighted red at the top of the most recent 5 transactions section
    
Scenario: time past 12AM

    Given that I am on the Home View
    And the time has just turned 12 midnight
    Then I should see “Today’s Earnings” in the top Red Card reset to zero

