Rails.application.routes.draw do
  get 'play/:pack/:level',   to: 'play#show',  as: 'play_show'
  get 'play/:pack',          to: 'play#pack',  as: 'play_show_pack'
  get 'play',                to: 'play#index', as: 'play_index'
  get 'help',                to: 'pages#help', as: 'pages_help'
  root 'pages#home'
end
