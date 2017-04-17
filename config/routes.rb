# frozen_string_literal: true
Rails.application.routes.draw do
  root to: 'rooms#index'

  resources :rooms, only: %i(index create)
  match 'rooms/:name', to: 'rooms#show', via: :get, as: :rooms_show
end
