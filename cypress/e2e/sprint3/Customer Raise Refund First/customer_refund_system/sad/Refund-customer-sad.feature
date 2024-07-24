Feature: Customer declines the refund
    Background: 
        Given i am on the Payment Refund View

    Scenario: Decline button to Rejected View
        When i click the Decline button
        Then i should see the Requested Refunds View
        And i should see the Pending Tab
        And i should see the Refunded Tab
        And i should see the Rejected Tab
        When i click the Rejected Tab
        Then i should see the rejected transactions
        And i should see Rejected   
