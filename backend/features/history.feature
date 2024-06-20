Feature: transaction history

    As a hawker who needs to track earnings regularly
    I want a quick and easy way to filter all of my past transactions by a date range, day, and month
    So that I can efficiently view my tabulated earnings

Scenario: user click into transaction history view

    Given that I am on the Home View
    And I clicked into the History View
    Then I should see a dropdown menu with the tag "Any Date"
    And I should see the past transactions listed below

Scenario: user click on date dropdown menu and selects a Date Range

    Given that I am on the History View
    And I clicked on dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day and month
    And I selected a Date Range from 15 June to 17 June
    Then I should see the dropdown box closing
    And I should see my past transactions from 15 June to 17 June listed below
    And I should see "DATE RANGE +$ XXX.XX" on the top right

Scenario: user click on date dropdown menu and selects a Day

    Given that I am on the History View
    And I clicked on dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day and month
    And I clicked on the Yesterday button
    Then I should see the dropdown box closing
    And I should see my past transactions for Yesterday listed below
    And I should see "YESTERDAY 16 JUN" on the top right
    And I should see "DAILY +# XXX.XX" on the top right
    And I should NOT see any "MONTHLY +$ XXX.XX" or "DATE RANGE +$ XXX.XX" on the top right

Scenario: user click on date dropdown menu and selects a Month

    Given that I am on the History View
    And I clicked on dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day and month
    And I clicked on the THIS MONTH button
    Then I should see the dropdown box closing
    And I should see my past transactions for the month of June listed below
    And I should see "JUNE 2024" on the top left
    And I should see "MONTHLY +$ XXX.XX" on the top right

Scenario: user views a transaction

    Given that I am on the History View
    And I clicked on one of the transactions in the Transactions History view
    Then I should see a popup Transaction Details View showing details such as amount, timestamp, payment source, transaction ID and customer mobile

Scenario: incoming new transaction
    
    Given that I am on the History View
    And I have just received a new transaction of 5.30
    Then I should see the numbers for "MONTHLY +$" increase by 5.30
    And I should see the numbers for "DAILY +$" increase by 5.30
    And I should see the transaction showing on top of the transaction section

Scenario: multiple transactions at the same time

    Given that I am on the Home View
    And 3 customers paid at the same time with 5.30, 2.30 and 2.40
    Then I should see the numbers for "MONTHLY +$" increase by 10.00
    And I should see the numbers for "DAILY +$" increase by 10.00
    And I should see the 3 transactions showing on top of the transaction section