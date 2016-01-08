Rails.application.routes.draw do
  get 'play/:id', to: 'play#show',  as: 'play_show'
  get 'play',     to: 'play#index', as: 'play_index'
  get 'help',     to: 'pages#help', as: 'pages_help'
  root 'pages#home'
end
