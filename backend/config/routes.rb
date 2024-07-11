# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    resources :transactions, module: :users
    member do
      get 'earnings_cutoff', to: 'users#show_earnings_cutoff'
      put 'earnings_cutoff', to: 'users#update_earnings_cutoff'
    end
  end
  

  resources :customers do
    resources :transactions, module: :customers
  end
  
  post 'users/login', to: 'sessions#create'
  post 'customers/login', to: 'customer_sessions#create'
  
end
