Feature: Hide Current Daily Earnings

  Background:
    Given I am on the Home View

  Scenario: User hides their current daily earnings
    Given I want to hide my current daily earnings
    When I click on the “eye” icon
    Then I should see the digits of my “Today’s Earnings” replaced by “*”
