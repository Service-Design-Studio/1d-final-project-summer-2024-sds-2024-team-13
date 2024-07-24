Feature: Hawker Raising Refund First, Hawker View
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
        And I should see a Refund Customer button

    Scenario: Submitting Refund To Customer
        Given that I click on the Refund Customer button
        Then I should be redirected to Refund Customer View
        And I should see the amount the customer paid
        And I should see the hawker the amount was paid to
        And I should see the customer mobile that paid
        And I should see the date and time of the transaction
        And I should see the transaction ID
        And I should see the reason(s) for refund
        Then I should see green SUBMITTED
        When I fill up accordingly
        And click on Submit
        Then I should be redirected back to Transaction History View
        And I should see a deduction in my daily earnings and total earnings

        
    Scenario: Going Into Request Refunds View
        When I click on Requested Refunds button
        Then I should see a Requested Refunds page
        And I should see a pending tab, refunded tab and rejected tab

    
    Scenario: Refund submitted to customer
        Then I should be directed to requested refunds page
        When I click on the Request Refunds button
        Then I should see a pending tab
        And I should see a refunded tab
        And I should see a rejected tab
        And I see refunds that are pending from customer
        And I click on a pending refund if there is any
        Then I should see the Refund Details View
        And I should see the amount the customer paid
        And I should see the hawker the amount was paid to
        And I should see the customer mobile that paid
        And I should see the date and time of the transaction
        And I should see the transaction ID
        And I should see the reason(s) for refund
        And I should see two buttons, one for accept and one for decline
