Feature: Customer Accepts the refund
    Background:
        Given that i am on Payment Refund View

    Scenario: Accept button to Refunded transaction
        When i click the Accept button
        Then i should see the Requested Refunds View
        And i should see the Pending Tab
        And i should see the Refunded Tab
        And i should see the Rejected Tab
        When i click on the Refunded Tab
        Then i should see the refunded transaction
        And i should see Payment Refunded