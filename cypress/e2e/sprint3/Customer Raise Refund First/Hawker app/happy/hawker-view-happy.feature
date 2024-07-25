Feature: Customer Raising Dispute, Hawker View
    Background:
        Given I am on Transaction History View

    Scenario: Happy Path, Accepting Dispute and Refunding
        Given I am on Refund Request view
        And I click on transaction card that contains "Pending from you"
        Then I should be redirected to Refund Details view of the transaction card
        And I should see decline button
        And I should see accept button
        Then I click on the Accept button
        Then I should be redirected back to Transaction History view
        Then I should see a new transaction card with a deduction and word saying “REFUNDED”
        Then I click on Requested Refund button
        Then Click on Refunded Tab in Requested Refunds view
        Then I should see the refunded transaction in the Refunded Tab

    