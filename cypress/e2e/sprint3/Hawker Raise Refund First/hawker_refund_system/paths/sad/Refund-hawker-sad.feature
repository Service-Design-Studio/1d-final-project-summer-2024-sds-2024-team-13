Feature: Cancellation of refunds and rejected refunds
    Background: 
        Given i am on Refund Pending View
    
    Scenario: Hawker cancels refund
        When i click on the transaction
        Then i will see the Refund Details View
        And i should see the refund amount
        And i should see the transaction ID 
        And i should see the reason for refund
        And i should see a Cancel Request Button
        And i click on the Cancel Request Button
        Then i should see the Requested Refunds View
        And i should see the Rejected tab
        And i click on the Rejected tab
        Then i should see the Rejected refunds
        And when i click on the rejected refunds
        Then i should see the Refund details View
        And i should see a Resubmit Request Button
        
