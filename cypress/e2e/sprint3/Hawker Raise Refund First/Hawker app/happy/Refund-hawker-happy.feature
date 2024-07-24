Feature: Hawker sends refund request to customer
    Background: 
        Given i am on the Transaction Details View
    
    Scenario: Transaction details view to Refund Customer view(submitted)
        When i click on the Refund Customer Button
        Then i should see the Refund Customer View
        And i should see the amount the customer paid
        And i should see the expected payment from customer
        And i should see a submit Button
        When i click the submit Button
        Then i should see the Refund Customer View
        And i should see a green submitted icon
        
    #Scenario:Customer accepts Refund(customer app swap to hawker app)

