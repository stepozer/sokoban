Rails.application.routes.draw do
  devise_for :users

  mount API::Root, at: '/api'
  mount GrapeSwaggerRails::Engine, at: '/api/doc'

  root  to: 'pages#single_page_application', via: :all
  match '*unmatched_route', to: 'pages#single_page_application', via: :all
end
