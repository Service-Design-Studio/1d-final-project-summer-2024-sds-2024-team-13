Feature: More Page
    Scenario: Visit the more page
        Given I click on the more icon
        Then I should be redirected to the more page

Feature: Settings Page
    Scenario: Visit the settings page
        Given I am in the more page
        And i click on the settings bar
        Then I should be redirected to the settings page

Feature: Daily Earnings Settings Page
    Scenario: Visit daily earnings settings page
        Given I am in more page
        and I click on manage your daily earnings bar
        Then I should be redirected to the daily earnings settings page