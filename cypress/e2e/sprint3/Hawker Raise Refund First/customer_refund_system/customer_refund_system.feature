Feature:Managing wrong payment for Hawker
    Background:
        Given i am on the History View
    
    Scenario: History to Refund Details
        When i click on the highlighted transaction
        Then i should see a popup with the transaction details
        And i should see a Refund Requested button
        And i click on the Refund Requested button
        Then i should see the Requested Refunds View
        And i should see a pending tab
        And i should see a refunded tab
        And i should see a rejected tab
        And i should see the pending transactions
        And i click on the pending transactions
        Then i should see the Refund Details View
        And i should see the payment details
        And i should see the accept button
        And i should see the reject button
    