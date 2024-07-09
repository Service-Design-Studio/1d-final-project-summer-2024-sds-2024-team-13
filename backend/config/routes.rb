# config/routes.rb
Rails.application.routes.draw do
  resources :customers
  resources :users do
    resources :transactions, param: :transaction_id
  end
end
