Rails.application.routes.draw do
  mount API::Root, at: '/api'
  mount GrapeSwaggerRails::Engine, at: '/api/doc'

  get  'play/:pack/:level',     to: 'play#show',         as: 'play_show'
  get  'play/:pack',            to: 'play#pack',         as: 'play_show_pack'
  get  'play',                  to: 'play#index',        as: 'play_index'
  get  'dev/level_preview/:id', to: 'dev#level_preview', as: 'dev_level_preview'
  get  'help',                  to: 'pages#help',        as: 'pages_help'
  root 'pages#home'
end
