# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    resources :transactions
  end

  resources :customers do
    resources :transactions, controller: 'customer_transactions'
  end
  
  post 'users/login', to: 'sessions#create'
  
  
end
