Feature: Customer Payment Happy Path

  Background:
    Given I am on Scanning View

  Scenario: Successful payment process
    When I scan a valid QR code 
    Then I should be redirected to Payment Review view
    And I should see a payment amount as $10.40
    And I should see a LET'S GO button
    When I click the LET'S GO button
    Then I should be redirected to Payment Success view
    And I should see an animation
    And I should see a payment amount as $10.40
    And I should see a logout button
