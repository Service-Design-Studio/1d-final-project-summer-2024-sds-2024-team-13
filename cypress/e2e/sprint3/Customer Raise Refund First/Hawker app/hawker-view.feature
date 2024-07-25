Feature: Customer Raising Dispute, Hawker View
    Background:
        Given I am on Transaction History View

    Scenario: Hawker Receiving Request
        Given I am on Refund Request view
        And I click on transaction card that contains "Pending from you"
        Then I should be redirected to Refund Details view of the transaction card
        And I should see decline button
        And I should see accept button

    Scenario: Happy Path, Accepting Dispute and Refunding
       Given I am on the Refund Details Page 
       And I click on the Accept button
       Then I should be redirected back to Transaction History view
       And I should see a new transaction card with a deduction and word saying “REFUNDED”
       Then I should see the refunded transaction in the Refunded Tab
       When I click on Requested Refund button
       And Click on Refunded Tab in Requested Refunds view

    Scenario: Sad Path, Declining Dispute and Not Refunding
       Given I am on the Refund Details Page 
       And I did not give a reason for rejection
       And I try click on the Decline button
       Then I should see that the Decline button is greyed out
       And I should not be able to press it

    