# config/routes.rb
Rails.application.routes.draw do
  resources :transactions
  resources :users do
    resources :transactions, param: :transaction_id
  end

  post 'users/login', to: 'sessions#create'
  
end
