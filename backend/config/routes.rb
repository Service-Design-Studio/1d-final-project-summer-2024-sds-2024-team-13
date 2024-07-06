# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    resources :transactions, param: :transaction_id
  end
end
