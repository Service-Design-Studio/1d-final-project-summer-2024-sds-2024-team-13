Feature: transaction history

As a hawker, who needs to track earnings regularly
I want a quick and easy way to filter all of my past transactions by a date range, day, and month
So that I can efficiently view my tabulated earnings

Scenario: user click into transaction history view

Given that I am on the Home View
And I clicked into the History View
Then I should see Transactions History view

Scenario: sorting of transaction history

Given that I am on the Home View
And I clicked into the History View
And I clicked on the “Sort” button
Then I should see a popup showing options sorting by date range, day and month
And I clicked on the “Yesterday” option
Then I should see transactions made yesterday only

Scenario: user views a transaction

Given that I am on the Home View
And I clicked into the History View
And I clicked on the topmost transaction in the Transactions History view
Then I should see a popup Transaction Details View showing details such as amount, timestamp, payment source, transaction ID and customer mobile

Scenario: unexpected error when sorting transaction history

Given that I am on the Home View
And I clicked into the History View
And I clicked on the “Sort” button
Then I should see a popup showing options sorting by date range, day and month
And I click on the “Today” option
But an error occurred unexpectedly
Then I should see a popup error message that says "Failed to filter transactions. Please try again later."