Feature: Sad Path, Customer View
    Background:
        Given that I am on Transaction History View

    Scenario: Cancelling Refund Request 
        Given I am on the Refund Pending View (Refund Details)
        And I click on the Cancel Request button
        Then I should be redirected back to Requested Refund View
        Then I click on the back button
        Then I click on the Requested Refund button
        Then it should be deleted
        And not seen on any of the Tabs in Requested Refund View


    Scenario: Hawker rejects request/dispute raised by customer
       Given I am on the Refund Pending View and on rejected Tab
       When I click into Refund Details
       Then I will see Please make an...