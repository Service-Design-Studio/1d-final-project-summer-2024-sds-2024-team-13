Feature: Hawker Raising Refund First, Hawker View
    Background: 
        Given on Transaction History View
    
    Scenario: Transaction History View to Transaction Details Popup
        When I click on one of the transactions in the Transaction History View
        Then I should see a popup Transaction Details View
        And I should see amount
        And I should see timestamp        
        And I should see payment source     
        And I should see transaction ID
        And I should see customer mobile
        And I should see a Refund Customer button
        Given that I click on the Refund Customer button
        Then I should be redirected to Refund Customer View
        And I should see the amount the customer paid
        And I should see the hawker the amount was paid to
        And I should see the customer mobile that paid
        And I should see the date and time of the transaction
        And I should see the transaction ID
        And I should see the reason for refund
        Then I fill up accordingly
        Then I should see Submit Button
        And click on Submit
        Then I should be redirected back to Requested Refund View
        Then I click on the back button 
        And I should see a deduction in my daily earnings and total earnings on Transaction History

        
    Scenario: Going Into Request Refunds View
        When I click on Requested Refunds button
        Then I should see a Requested Refunds page
        And I should see a pending tab, refunded tab and rejected tab

   