Rails.application.routes.draw do
  get 'play', to: 'pages#play', as: 'pages_play'
  get 'help', to: 'pages#help', as: 'pages_help'
  root 'pages#home'
end
