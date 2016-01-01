Rails.application.routes.draw do
  get 'play' to: 'pages#play', as: 'pages_play'
  root 'pages#home'
end
