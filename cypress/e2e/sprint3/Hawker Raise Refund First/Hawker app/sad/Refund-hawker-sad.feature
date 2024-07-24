Feature: Refund pending view to Refund cancelled view
    Background:
        Given i am on the  refund pending view
    
    Scenario:
        When i click on the cancel refund Button
        And i click on the rejected view
        Then i should see the cancelled request