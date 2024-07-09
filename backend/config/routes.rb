# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    resources :transactions
  end

  post 'users/login', to: 'sessions#create'
  
  
end
