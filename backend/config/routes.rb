# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    resources :transactions
    member do
      get 'earnings_cutoff', to: 'users#show_earnings_cutoff'
      put 'earnings_cutoff', to: 'users#update_earnings_cutoff'
    end
  end

  resources :customers do
    resources :transactions, controller: 'customer_transactions'
  end
  
  post 'users/login', to: 'sessions#create'
  
  
end
