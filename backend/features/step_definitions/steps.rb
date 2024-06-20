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

#Given /^I am on the Home View$/ do
#  visit path_to('the home page')
#end
Given /^(?:|I )am on (.+)$/ do |page_name|
  visit path_to(page_name)
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
  Transaction.create(amount: amount.to_f, created_at: Time.now, ...)
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
    Transaction.create(amount: amount.to_f, created_at: Time.now, ...)
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
  Transaction.create(amount: amount.to_f, created_at: Time.now, ...)
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
  allow(Time).to receive(:now).and_return(Time.now.beginning_of_day)
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
    expect(all('.transaction').all? { |t| t[:'data-date'] == Date.yesterday.to_s }).to be true
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