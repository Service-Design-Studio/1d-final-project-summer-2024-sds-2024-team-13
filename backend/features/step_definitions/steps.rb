require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

module WithinHelpers
  def with_scope(locator)
    locator ? within(locator) { yield } : yield
  end
end
World(WithinHelpers)

#Given /^that I am logged into the app$/ do
#  login_as(user, scope: :user)
#end

Given /^that I am on the Home View$/ do
 visit path_to ("Home View")
end

Given /^that I am on the History View$/ do
  visit path_to ("History View")
 end

Then /^I should see my daily earnings and my most recent transaction in the top Red Card$/ do
  within('.top-red-card') do
    expect(page).to have_content('Daily Earnings')
    expect(page).to have_content('Most Recent Transaction')
  end
end

Then /^I should see a maximum of the most recent 5 transactions in chronological order, with the newest at the top$/ do
  within('.recent-transactions') do
    expect(page).to have_selector('.transaction', maximum: 5)
    transactions = page.all('.transaction')
    sorted_transactions = transactions.sort_by { |t| t[:'data-timestamp'] }.reverse
    expect(transactions).to eq(sorted_transactions)
  end
end

When /^I click on the topmost transaction in the most recent 5 transactions section$/ do
  within('.recent-transactions') do
    first('.transaction').click
  end
end

Then /^I should see a popup Transaction Details View showing amount, timestamp, payment source, transaction id and customer mobile$/ do
  within('.transaction-details-popup') do
    expect(page).to have_content('Amount:')
    expect(page).to have_content('Timestamp:')
    expect(page).to have_content('Payment Source:')
    expect(page).to have_content('Transaction ID:')
    expect(page).to have_content('Customer Mobile:')
  end
end

When /^I clicked into the History View$/ do
  click_link('History View')
end

When /^I clicked into the Home View$/ do
  click_link('Home View')
end

When /^I clicked into the More View$/ do
  click_link('More View')
end

When /^I have just received a new transaction of (.*)$/ do |amount|
  Transaction.create(amount: amount.to_f, created_at: Time.now)
end

Then /^I should see the numbers for "Today's Earnings" increase by (.*)$/ do |amount|
  within('.top-red-card') do
    current_earnings = find('.earnings-amount').text.to_f
    new_earnings = current_earnings + amount.to_f
    expect(page).to have_content("Today's Earnings: #{new_earnings}")
  end
end

Then /^I should see the transaction showing on the Most Recent transaction section in the top Red Card$/ do
  within('.top-red-card .recent-transactions') do
    expect(page).to have_content('Transaction')
  end
end

Then /^I should see the transaction highlighted red at the top of the most recent 5 transactions section$/ do
  within('.recent-transactions') do
    expect(first('.transaction')).to have_css('background-color', text: 'red')
  end
end

Given /^(\d+) customers paid at the same time with (.*), (.*) and (.*)$/ do |num_customers, amount1, amount2, amount3|
  amounts = [amount1, amount2, amount3]
  amounts.each do |amount|
    Transaction.create(amount: amount.to_f, created_at: Time.now)
  end
end

Then /^I should see (\d+) transaction cards highlighted red at the top of the most recent 5 transactions section$/ do |num_transactions|
  within('.recent-transactions') do
    transactions = all('.transaction').take(num_transactions.to_i)
    expect(transactions.all? { |t| t.native.css_value('background-color') == 'red' }).to be true
  end
end

When /^I want to hide my current daily earnings$/ do
  # No action needed for this step, it's a precondition
end

When /^I click on the 'eye' icon$/ do
  find('.eye-icon').click
end

Then /^I should see the digits of my "Today's Earnings" replaced by '\*'$/ do
  within('.top-red-card') do
    expect(page).to have_content("Today's Earnings: ***")
  end
end

When /^a customer just paid me (.*)$/ do |amount|
  # Simulate receiving a payment
  Transaction.create(amount: amount.to_f, created_at: Time.now)
end

When /^the transaction of (.*) is not shown on the Most Recent transaction section in the top Red Card$/ do |amount|
  within('.top-red-card .recent-transactions') do
    expect(page).not_to have_content(amount)
  end
end

When /^I click on the refresh button$/ do
  find('.refresh-button').click
end

Then /^I should see the refresh timestamp showing "last refreshed at #{Time.now.strftime('%H:%M')}"$/ do
  within('.refresh-timestamp') do
    expect(page).to have_content("last refreshed at #{Time.now.strftime('%H:%M')}")
  end
end

When /^the time has just turned 12 midnight$/ do
  # Simulate the passage of time to midnight
  allow(Time).to receive(:now).and_return(Time.now.tomorrow.beginning_of_day)
end

Then /^I should see “Today’s Earnings” in the top Red Card reset to zero$/ do
  within('.top-red-card') do
    expect(page).to have_content("Today's Earnings: 0.00")
  end
end

Then /^I should see Transactions History view$/ do
  expect(page).to have_content('Transactions History')
end

When /^I clicked on the “Sort” button$/ do
  click_button('Sort')
end

Then /^I should see a popup showing options sorting by date range, day and month$/ do
  within('.sort-popup') do
    expect(page).to have_content('Sort by date range')
    expect(page).to have_content('Sort by day')
    expect(page).to have_content('Sort by month')
  end
end

When /^I clicked on the “Yesterday” option$/ do
  find('.sort-popup .yesterday-option').click
end

Then /^I should see transactions made yesterday only$/ do
  within('.transactions-history') do
    all('.transaction').each do |transaction|
      expect(transaction[:'data-date']).to eq(Date.yesterday.to_s)
    end
  end
end

When /^I click on the topmost transaction in the Transactions History view$/ do
  within('.transactions-history') do
    first('.transaction').click
  end
end

Then /^I should see a popup error message that says "Failed to filter transactions. Please try again later."$/ do
  expect(page).to have_content("Failed to filter transactions. Please try again later.")
end

Then /^I should see a dropdown menu with the tag "Any Date"$/ do
  # Implement code to verify the presence of the dropdown menu with the given tag
  expect(page).to have_select(Any Date)
end

When /^I clicked on dropdown menu with the tag "([^"]*)"$/ do |tag_name|
  find('select', text: tag_name).click
end

And /^I should see the past transactions listed below$/ do
  # Implement code to verify the presence of past transactions
  expect(page).to have_css('.transaction-item')  # Example CSS selector for transaction items
end

Then(/^I should see a dropdown box showing options sorting by date range, day and month$/) do
  dropdown = find('select#date-dropdown')  # Adjust the selector to match your HTML structure
  expect(dropdown).to have_selector('option', text: 'Date Range')
  expect(dropdown).to have_selector('option', text: 'Day')
  expect(dropdown).to have_selector('option', text: 'Month')
end

Then(/^I should see the past transactions listed below$/) do
  expect(page).to have_css('.transaction-item')  # Replace with your actual CSS selector
end

When(/^I selected a Date Range from (.*) to (.*)$/) do |start_date, end_date|
  # Assuming you have a date picker or similar mechanism
  # Adjust the selectors and interaction according to your HTML structure
  # Open the date range picker
  find('select#date-dropdown').click
  find('option', text: 'Date Range').select_option
  # Select the start date
  fill_in 'start_date', with: start_date
  fill_in 'end_date', with: end_date
  # Submit the date range selection
  click_button 'Apply'  # Adjust the button name as per your implementation
end

Then(/^I should see the dropdown box closing$/) do
  # Verify the dropdown is not visible
  expect(page).not_to have_selector('select#date-dropdown')
end

Then(/^I should see my past transactions from (.*) to (.*) listed below$/) do |start_date, end_date|
  # Verify the transactions are listed correctly
  within('.transaction-list') do  # Adjust the selector to match your transaction list
    expect(page).to have_content(start_date)
    expect(page).to have_content(end_date)
  end
end

Then('I should see {string} on the top right') do |string|
  within('.top-right') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content(string)
  end
end

Then('I clicked on the Yesterday button') do
  click_button 'Yesterday'  # Adjust the button name or selector as per your implementation
end

Then('I should see my past transactions for Yesterday listed below') do
  within('.transactions-list') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content('Yesterday')  # Ensure the transaction list includes a reference to "Yesterday"
  end
end

Then('I should NOT see any {string} or {string} on the top right') do |string1, string2|
  within('.top-right') do  # Adjust the selector to match your actual HTML structure
    expect(page).not_to have_content(string1)
    expect(page).not_to have_content(string2)
  end
end

Then('I clicked on the THIS MONTH button') do
  click_button 'THIS MONTH'  # Adjust the button name or selector as per your implementation
end

Then('I should see my past transactions for the month of June listed below') do
  within('.transactions-list') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content('June')  # Ensure the transaction list includes a reference to "June"
  end
end

Then('I should see {string} on the top left') do |string|
  within('.top-left') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content(string)
  end
end

Given('I clicked on one of the transactions in the Transactions History view') do
  find('.transaction-item', match: :first).click  # Adjust the selector to match your actual HTML structure
end

Then('I should see a popup Transaction Details View showing details such as amount, timestamp, payment source, transaction ID and customer mobile') do
  within('.transaction-details-popup') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content('Amount')
    expect(page).to have_content('Timestamp')
    expect(page).to have_content('Payment Source')
    expect(page).to have_content('Transaction ID')
    expect(page).to have_content('Customer Mobile')
  end
end

Then('I should see the numbers for {string} increase by {float}') do |string, float|
  within('.numbers') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content("#{string} +#{float}")
  end
end

Then('I should see the transaction showing on top of the transaction section') do
  within('.transactions-list') do  # Adjust the selector to match your actual HTML structure
    expect(find('.transaction-item', match: :first)).to have_content('Transaction Details')  # Ensure the first item is the expected transaction
  end
end

Then('I should see the {int} transactions showing on top of the transaction section') do |int|
  within('.transactions-list') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_selector('.transaction-item', count: int)
  end
end

Given('that I am logged into the app') do
  visit login_path  # Replace with your actual login path
  fill_in 'Email', with: 'user@example.com'
  fill_in 'Password', with: 'password'
  click_button 'Log in'
end

Given('I am on the Home View') do
  visit path_to('Home View')
end

Given('I clicked on the topmost transaction in the most recent {int} transactions section') do |int|
  within('.most-recent-transactions') do  # Adjust the selector to match your actual HTML structure
    find('.transaction-item', match: :first).click
  end
end

Then('I should see the transaction of {float} showing on the Most Recent transaction section in the top Red Card') do |expected_amount|
  within('.top-red-card .most-recent-transactions') do
    # Assuming your application logic retrieves the actual transaction amount and compares it
    transaction_amounts = all('.transaction-item .amount').map(&:text).map(&:to_f)
    first_transaction_amount = find('.transaction-item', match: :first).text.gsub(/[^\d\.]/, '').to_f
    expect(first_transaction_amount).to eq(expected_amount)
  end
end

Then('I should see the refresh timestamp showing {string}') do |string|
  within('.refresh-timestamp') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content(string)
  end
end

Given('I see “Today’s Earnings” in the top Red Card reset to zero') do
  within('.top-red-card .todays-earnings') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content('Today’s Earnings: $0.00')
  end
end

Given('I clicked on {string}') do |string|
  click_link_or_button string  # This will click either a link or a button with the text `string`
end

Given('I changed the End Time to {int}') do |int|
  fill_in 'End Time', with: int  # Adjust the field name or selector as per your implementation
end

Given('I clicked back to Home View') do
  click_link 'Home'  # Adjust the link text or selector as per your implementation
end

Then('I should see “Today’s Earnings” in the top Red Card change a day of earnings \(before 12am)') do
  within('.top-red-card .todays-earnings') do  # Adjust the selector to match your actual HTML structure
    expect(page).to have_content('Today’s Earnings: $')
  end
end
