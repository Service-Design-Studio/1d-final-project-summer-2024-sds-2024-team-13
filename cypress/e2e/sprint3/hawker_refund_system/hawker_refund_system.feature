Feature:Managing wrong payment for customers
    Background:
        Given i am on Transaction History View

    Scenario: Transaction History View to Transaction Details View
        When i click on one of the transactions in the Transaction History View
        Then i should see a popup Transaction Details View
        And i should see amount
        And i should see timestamp        
        And i should see payment source     
        And i should see transaction ID
        And i should see customer mobile
        And i should see a Refund Customer button
    
    Scenario: Transaction History View to Transaction Status View
        When i click on Requested Refunds button
        Then i should see a requested refunds view
        And i should see a pending tab
        And i should see a refunded tab
        And i should see a rejected tab
        And i should see refunds that are pending
        And i click on the pending refund
        Then i should see the Refund Details View
        And i should see the amount the customer paid
        And i should see the hawker the amount was paid to
        And i should see the customer mobile that paid
        And i should see the date and time of the transaction
        And i should see the transaction ID
        And i should see the reason(s) for refund