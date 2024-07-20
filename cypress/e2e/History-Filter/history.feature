Feature: Transaction history

  Background:
    Given I open the login page
    And I type in the email "iamlove@gmail.com"
    And I type in the password "123"
    And I click the login button
    Then I should see the homepage
    Given I am on the Home View

  Scenario: User clicks into transaction history view
    When I click into the History View
    Then I should see a dropdown menu with the tag "This Month"
    And I should see the past transactions listed below

  Scenario: User clicks on date dropdown menu and selects a Date Range
    Given I am on the History View
    When I click on the dropdown menu with the tag "This Month"
    Then I should see a dropdown box showing options sorting by date range, Today, Yesterday, This Month and Last Month
    And I select a Date Range from 15 June to 17 June
    Then I should see the dropdown box closing
    When I click on Apply Filter
    And I should see my past transactions from 15 June to 17 June listed below
    And I should see "DATE RANGE +$ XXX.XX" on the top right

  Scenario: User clicks on date dropdown menu and selects a Day
    Given I am on the History View
    When I click on the dropdown menu with the tag "This Month"
    Then I should see a dropdown box showing options sorting by date range, Today, Yesterday, This Month and Last Month
    And I click on the Yesterday button
    Then I should see the dropdown box closing
    When I click on Apply Filter
    And I should see my past transactions for Yesterday listed below
    And I should see "YESTERDAY DATE" on the top right
    And I should see "DAILY +$ XXX.XX" on the top right

  Scenario: User clicks on date dropdown menu and selects a Month
    Given I am on the History View
    When I click on the dropdown menu with the tag "This Month"
    Then I should see a dropdown box showing options sorting by date range, Today, Yesterday, This Month and Last Month
    And I click on the THIS MONTH button
    Then I should see the dropdown box closing
    When I click on Apply Filter
    And I should see my past transactions for the month listed below
    And I should see "MONTH 2024" on the top left
    And I should see "MONTHLY +$ XXX.XX" on the top right