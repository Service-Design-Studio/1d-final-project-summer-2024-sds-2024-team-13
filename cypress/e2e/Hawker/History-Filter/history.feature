Feature: Transaction history

  Background:
    Given I open the login page on a mobile device
    And I enter the email "chicken@gmail.com"
    And I enter the password "123"
    And I click the login button
    Then I should be redirected to the homepage
    Given I am on the home page after login

  Scenario: User navigates to transaction history view
    When I navigate to the history page
    Then I should see a dropdown menu labeled "This Month"
    And I should see the list of past transactions

  Scenario: User selects a date range from the dropdown
    Given I am on the home page after login
    When I navigate to the history page
    And I open the dropdown menu with the label "This Month"
    Then I should see a dropdown with options to sort by date range, Today, Yesterday, This Month, and Last Month
    When I select the date range from 15 June to 17 June
    Then I should see the dropdown close
    And I should see the transactions from 15 June to 17 June listed
    And I should see "DATE RANGE +$ XXX.XX" on the top right

  Scenario: User selects Yesterday from the dropdown
    Given I am on the home page after login
    When I navigate to the history page
    And I open the dropdown menu with the label "This Month"
    Then I should see a dropdown with options to sort by date range, Today, Yesterday, This Month, and Last Month
    When I click the Yesterday button in the dropdown
    Then I should see the dropdown close
    And I should see the transactions from Yesterday listed
    And I should see "YESTERDAY DATE" on the top right
    And I should see "DAILY +$ XXX.XX" on the top right

  Scenario: User selects This Month from the dropdown
    Given I am on the home page after login
    When I navigate to the history page
    And I open the dropdown menu with the label "This Month"
    Then I should see a dropdown with options to sort by date range, Today, Yesterday, This Month, and Last Month
    When I click the THIS MONTH button in the dropdown
    Then I should see the dropdown close
    And I should see the transactions from this month listed
    And I should see "MONTH 2024" on the top left
    And I should see "MONTHLY +$ XXX.XX" on the top right
