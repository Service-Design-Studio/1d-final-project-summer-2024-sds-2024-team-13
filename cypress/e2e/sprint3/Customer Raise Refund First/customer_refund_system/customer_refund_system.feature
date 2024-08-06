Feature: Customer Raising Dispute, Customer View
    Background: 
        Given I am on logged into the app
        And on Transaction History View
    
    Scenario: Transaction History View to Transaction Details Popup
        When I click on one of the transactions in the Transaction History View
        Then I should see a popup Transaction Details View
        And I should see amount
        And I should see timestamp        
        And I should see payment source     
        And I should see transaction ID
        And I should see customer mobile

        
    Scenario: Going Into Request Refunds View
        Given I am back on Transaction History View
        When I click on Requested Refunds button
        Then I should see a Requested Refunds page
        And I should see a pending tab, refunded tab and rejected tab


    Scenario: Requested Refunds View to Request Refund View
        Given I clicked on the Request Refunds button
        Then I should be directed to requested refunds page
        Then I should see a pending tab
        And I should see a refunded tab
        And I should see a rejected tab
        And I see refunds that are pending
        And I click on a pending refund if there is any
        Then I should see the Request Refund View
        And I should see the amount the customer paid
        And I should see the hawker the amount was paid to
        And I should see the customer mobile that paid
        And I should see the date and time of the transaction
        And I should see the transaction ID
        And I should see the reasons for refund
    