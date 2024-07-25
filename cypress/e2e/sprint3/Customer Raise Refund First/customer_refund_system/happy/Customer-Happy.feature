Feature: Happy Path, Customer View
    Background: 
        Given I am on the Transaction History View

    Scenario: Submitting Dispute From Transaction History
        Given I am on the Transaction Popup 
        When I click on one of the transaction card in Transaction History View
        Then I should see how much I've paid
        Then I am redirected to Request Refund view
        And I should see the amount I paid, who I paid to, my phone number, date and time of transaction, transaction ID, expected payment from customer, reason for dispute and amount to be refunded
        Then I fill in the respective fields for expected payment from customer
        And I click on Submit button
        Then I see a notification at the bottom saying "SUBMITTED!"
        Then I should be redirected to Refund Request View
        Then I should be redirected to Transaction History View
        And I should see that transaction card becomes yellow
