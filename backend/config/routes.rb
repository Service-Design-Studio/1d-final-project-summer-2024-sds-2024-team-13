Rails.application.routes.draw do
  # User routes
  get '/users', to: 'users#index'
  get '/users/:id/home', to: 'users#home'
  put '/users/:id/home', to: 'users#refresh_home'
  get '/users/:id/home/transaction', to: 'users#recent_transaction'
  post '/users/:id/home/transaction', to: 'users#create_transaction'
  post '/users/login', to: 'users#login'

  # History routes
  get '/users/:id/history', to: 'history#index'
  get '/users/:id/history/transaction', to: 'history#show_transaction'
  post '/users/:id/history/transaction', to: 'history#create_transaction'
  get '/users/:id/history/date_range', to: 'history#date_range'

  # Settings routes 
  get '/users/:id/settings', to: 'users#show_settings'
  put '/users/:id/settings', to: 'users#update_settings'
  get '/users/:id/daily_earnings', to: 'users#daily_earnings'
  put '/users/:id/daily_earnings', to: 'users#update_daily_earnings'

  root 'users#index'
end
