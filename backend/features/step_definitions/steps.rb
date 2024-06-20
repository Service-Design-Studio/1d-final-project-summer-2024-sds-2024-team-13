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
    transactions = page.all('.transaction')
    expect(transactions.size).to be <= 5
    sorted_transactions = transactions.sort_by { |t| t['data-timestamp'] }.reverse
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
    expect(find('.earnings-amount')).to have_content(new_earnings)
  end
end

Then /^I should see the transaction showing on the Most Recent transaction section in the top Red Card$/ do
  within('.top-red-card .recent-transactions') do
    expect(page).to have_content('Transaction')
  end
end

Then /^I should see the transaction highlighted red at the top of the most recent 5 transactions section$/ do
  within('.recent-transactions') do
    expect(first('.transaction')['style']).to include('background-color: red')
  end
end

Given /^(\d+) customers paid at the same time with (.*), (.*) and (.*)$/ do |num_customers, amount1, amount2, amount3|
  [amount1, amount2, amount3].each do |amount|
    Transaction.create(amount: amount.to_f, created_at: Time.now)
  end
end

Then /^I should see (\d+) transaction cards highlighted red at the top of the most recent 5 transactions section$/ do |num_transactions|
  within('.recent-transactions') do
    highlighted_transactions = all('.transaction').take(num_transactions.to_i)
    highlighted_transactions.each do |transaction|
      expect(transaction['style']).to include('background-color: red')
    end
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
    expect(find('.earnings-amount')).to have_content('***')
  end
end

When /^a customer just paid me (.*)$/ do |amount|
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
  travel_to Time.now.tomorrow.beginning_of_day
end

Then /^I should see “Today’s Earnings” in the top Red Card reset to zero$/ do
  within('.top-red-card') do
    expect(find('.earnings-amount')).to have_content('0.00')
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
      expect(transaction['data-date']).to eq(Date.yesterday.to_s)
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

When /^I clicked on "Manage your Daily Earnings"$/ do
  click_link('Manage your Daily Earnings')
end

When /^I changed the End Time to (.*)$/ do |end_time|
  find('.end-time-selector').select(end_time)
end

Then /^I should see “Today’s Earnings” in the top Red Card change my day's earnings \(before 12am\)$/ do
  within('.top-red-card') do
    expect(find('.earnings-amount')).to have_content(my_days_earnings_before_midnight)
  end
end






When /^I clicked into the History View$/ do
  click_link('History View')
end

Then /^I should see a dropdown menu with the tag "Any Date"$/ do
  expect(page).to have_selector('dropdown', text: 'Any Date')
end

Then /^I should see the past transactions listed below$/ do
  expect(page).to have_selector('.transaction')
end

When /^I clicked on dropdown menu with the tag "Any Date"$/ do
  find('dropdown', text: 'Any Date').click
end

Then /^I should see a dropdown box showing options sorting by date range, day and month$/ do
  expect(page).to have_selector('.dropdown-options', text: 'Date Range')
  expect(page).to have_selector('.dropdown-options', text: 'Day')
  expect(page).to have_selector('.dropdown-options', text: 'Month')
end

When /^I selected a Date Range from (.+) to (.+)$/ do |start_date, end_date|
  select_date_range(start_date, end_date)
end

Then /^I should see the dropdown box closing$/ do
  expect(page).not_to have_selector('.dropdown-options')
end

Then /^I should see my past transactions from (.+) to (.+) listed below$/ do |start_date, end_date|
  expect(page).to have_transactions_listed(start_date, end_date)
end

Then /^I should see "DATE RANGE \+\$ (.+)" on the top right$/ do |amount|
  expect(page).to have_selector('.summary', text: "DATE RANGE +$ #{amount}")
end

When /^I clicked on the Yesterday button$/ do
  find('.dropdown-options .yesterday').click
end

Then /^I should see my past transactions for Yesterday listed below$/ do
  expect(page).to have_transactions_listed_for('Yesterday')
end

Then /^I should see "YESTERDAY \d{2} JUN" on the top right$/ do
  expect(page).to have_selector('.summary', text: /YESTERDAY \d{2} JUN/)
end

Then /^I should see "DAILY \+\# (.+)" on the top right$/ do |amount|
  expect(page).to have_selector('.summary', text: "DAILY +# #{amount}")
end

Then /^I should NOT see any "MONTHLY \+\$ (.+)" or "DATE RANGE \+\$ (.+)" on the top right$/ do |monthly_amount, date_range_amount|
  expect(page).not_to have_selector('.summary', text: "MONTHLY +$ #{monthly_amount}")
  expect(page).not_to have_selector('.summary', text: "DATE RANGE +$ #{date_range_amount}")
end

When /^I clicked on the THIS MONTH button$/ do
  find('.dropdown-options .this-month').click
end

Then /^I should see my past transactions for the month of June listed below$/ do
  expect(page).to have_transactions_listed_for_month('June')
end

Then /^I should see "JUNE 2024" on the top left$/ do
  expect(page).to have_selector('.summary', text: 'JUNE 2024')
end

Then /^I should see "MONTHLY \+\$ (.+)" on the top right$/ do |amount|
  expect(page).to have_selector('.summary', text: "MONTHLY +$ #{amount}")
end

When /^I clicked on one of the transactions in the Transactions History view$/ do
  within('.transactions-history') do
    first('.transaction').click
  end
end

Then /^I should see a popup Transaction Details View showing details such as amount, timestamp, payment source, transaction ID and customer mobile$/ do
  within('.transaction-details-popup') do
    expect(page).to have_content('Amount:')
    expect(page).to have_content('Timestamp:')
    expect(page).to have_content('Payment Source:')
    expect(page).to have_content('Transaction ID:')
    expect(page).to have_content('Customer Mobile:')
  end
end

When /^I have just received a new transaction of (.+)$/ do |amount|
  Transaction.create(amount: amount.to_f, created_at: Time.now)
end

Then /^I should see the numbers for "MONTHLY \+\$" increase by (.+)$/ do |amount|
  within('.summary') do
    current_monthly = find('.monthly-amount').text.to_f
    new_monthly = current_monthly + amount.to_f
    expect(find('.monthly-amount')).to have_content(new_monthly)
  end
end

Then /^I should see the numbers for "DAILY \+\$" increase by (.+)$/ do |amount|
  within('.summary') do
    current_daily = find('.daily-amount').text.to_f
    new_daily = current_daily + amount.to_f
    expect(find('.daily-amount')).to have_content(new_daily)
  end
end

Then /^I should see the transaction showing on top of the transaction section$/ do
  within('.transactions-history') do
    expect(first('.transaction')).to have_content('Transaction')
  end
end

Given /^(\d+) customers paid at the same time with (.+), (.+) and (.+)$/ do |num_customers, amount1, amount2, amount3|
  amounts = [amount1, amount2, amount3]
  amounts.each do |amount|
    Transaction.create(amount: amount.to_f, created_at: Time.now)
  end
end

Then /^I should see the numbers for "MONTHLY \+\$" increase by (.+)$/ do |total_amount|
  within('.summary') do
    current_monthly = find('.monthly-amount').text.to_f
    new_monthly = current_monthly + total_amount.to_f
    expect(find('.monthly-amount')).to have_content(new_monthly)
  end
end

Then /^I should see the numbers for "DAILY \+\$" increase by (.+)$/ do |total_amount|
  within('.summary') do
    current_daily = find('.daily-amount').text.to_f
    new_daily = current_daily + total_amount.to_f
    expect(find('.daily-amount')).to have_content(new_daily)
  end
end

Then /^I should see the 3 transactions showing on top of the transaction section$/ do
  within('.transactions-history') do
    transactions = page.all('.transaction').take(3)
    transactions.each do |transaction|
      expect(transaction).to have_content('Transaction')