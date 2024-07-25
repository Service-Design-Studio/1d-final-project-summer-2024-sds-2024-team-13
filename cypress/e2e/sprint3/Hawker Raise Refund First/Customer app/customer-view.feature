Feature: Hawker Raising Refund, Customer View
    Background:
        Given I am on the History View
    
    Scenario: Hawker send refund, update on customer app
        When hawker sends a refund
        Then I should see a new transaction card about the refund
