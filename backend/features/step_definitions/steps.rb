# require 'uri'
# require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

# module WithinHelpers
#   def with_scope(locator)
#     locator ? within(locator) { yield } : yield
#   end
# end
# World(WithinHelpers)

# Given /^(?:|I )am on (.+)$/ do |page_name|
#   visit path_to(page_name)
# end

# Then /^(?:|I )should be on (.+)$/ do |page_name|
#   current_path = URI.parse(current_url).path
#   if current_path.respond_to? :should
#     current_path.should == path_to(page_name)
#   else
#     assert_equal path_to(page_name), current_path
#   end
# end

# Then /^(?:|I )should see "([^\"]*)"(?: within "([^\"]*)")?$/ do |text, selector|
#   with_scope(selector) do
#     if page.respond_to? :should
#       page.should have_content(text)
#     else
#       assert page.has_content?(text)
#     end
#   end
# end

# When /^(?:|I )press "([^\"]*)"(?: within "([^\"]*)")?$/ do |button, selector|
#   with_scope(selector) do
#     click_button(button)
#   end
# end

# # Specific steps for history.feature
# When /^I click on the history icon$/ do
#   find(".history-icon").click
# end

# Then /^I should be redirected to the history page$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("history page")
# end

# Given /^I am on the history page$/ do
#   visit path_to("history page")
# end

# When /^I click on a card$/ do
#   find(".transaction-card").click
# end

# Then /^I should be redirected to "transaction"$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("transaction page")
# end

# When /^I click on the filter icon$/ do
#   find(".filter-icon").click
# end

# When /^I select a specific date$/ do
#   find(".date-picker").set("2023-01-01")
# end

# Then /^only transactions from those dates will be displayed$/ do
#   within(".transactions-list") do
#     expect(page).to have_content("2023-01-01")
#   end
# end

# # Specific steps for home_page.feature
# Given /^I am on the login page$/ do
#   visit path_to("login page")
# end

# When /^I enter my username and password$/ do
#   fill_in("username", with: "testuser")
#   fill_in("password", with: "password")
# end

# When /^I click the login button$/ do
#   click_button("Login")
# end

# Then /^I should be redirected to Home Page$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("home page")
# end

# Given /^I am on the home page$/ do
#   visit path_to("home page")
# end

# Then /^I should see "Home"$/ do
#   expect(page).to have_content("Home")
# end

# When /^I click the hide button$/ do
#   find(".hide-button").click
# end

# Then /^the amount should be hidden$/ do
#   expect(page).not_to have_content("Amount")
# end

# When /^I click on a card$/ do
#   find(".transaction-card").click
# end

# Then /^the home page should refresh$/ do
#   visit current_path
# end

# # Specific steps for settings.feature
# When /^I click on the more icon$/ do
#   find(".more-icon").click
# end

# Then /^I should be redirected to the more page$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("more page")
# end

# Given /^I am in the more page$/ do
#   visit path_to("more page")
# end

# When /^I click on the settings bar$/ do
#   find(".settings-bar").click
# end

# Then /^I should be redirected to the settings page$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("settings page")
# end

# When /^I click on manage your daily earnings bar$/ do
#   find(".daily-earnings-bar").click
# end

# Then /^I should be redirected to the daily earnings settings page$/ do
#   current_path = URI.parse(current_url).path
#   current_path.should == path_to("daily earnings settings page")
# end

