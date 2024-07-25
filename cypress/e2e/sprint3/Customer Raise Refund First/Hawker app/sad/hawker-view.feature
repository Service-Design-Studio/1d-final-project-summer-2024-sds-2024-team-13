Feature: Customer Raising Dispute, Hawker View
    Background:
        Given I am on Transaction History View

    Scenario: Sad Path, Declining Dispute and Not Refunding
        Given I am on Refund Request view
        And I click on transaction card that contains "Pending from you"
        Then I should be redirected to Refund Details view of the transaction card
        And I should see decline button
        And I should see accept button
        Then I click on the decline button
        Then I should see the Decline Refund overlay
        Then I did not give a reason for rejection
        Then I should see that the Decline Request button is greyed out
        Then I should not be able to press it

    