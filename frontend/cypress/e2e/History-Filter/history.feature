Feature: Transaction history

  Background:
    Given I open the login page
    And I type in the email "iamgay@gmail.com"
    And I type in the password "123"
    And I click the login button
    Then I should see the homepage
    Given I am on the Home View

  Scenario: User clicks into transaction history view
    When I click into the History View
    Then I should see a dropdown menu with the tag "Any Date"
    And I should see the past transactions listed below

  Scenario: User clicks on date dropdown menu and selects a Date Range
    Given I am on the History View
    When I click on the dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day, and month
    And I select a Date Range from 15 June to 17 June
    Then I should see the dropdown box closing
    And I should see my past transactions from 15 June to 17 June listed below
    And I should see "DATE RANGE +$ XXX.XX" on the top right

  Scenario: User clicks on date dropdown menu and selects a Day
    Given I am on the History View
    When I click on the dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day, and month
    And I click on the Yesterday button
    Then I should see the dropdown box closing
    And I should see my past transactions for Yesterday listed below
    And I should see "YESTERDAY 16 JUN" on the top right
    And I should see "DAILY +$ XXX.XX" on the top right
    And I should NOT see any "MONTHLY +$ XXX.XX" or "DATE RANGE +$ XXX.XX" on the top right

  Scenario: User clicks on date dropdown menu and selects a Month
    Given I am on the History View
    When I click on the dropdown menu with the tag "Any Date"
    Then I should see a dropdown box showing options sorting by date range, day, and month
    And I click on the THIS MONTH button
    Then I should see the dropdown box closing
    And I should see my past transactions for the month of June listed below
    And I should see "JULY 2024" on the top left
    And I should see "MONTHLY +$ XXX.XX" on the top right
