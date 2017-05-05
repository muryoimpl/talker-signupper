# frozen_string_literal: true
Rails.application.routes.draw do
  root to: 'rooms#index'

  resources :rooms, only: %i(index create)
  match 'rooms/:name', to: 'rooms#show', via: :get, as: :rooms_show

  namespace :api do
    scope '/rooms/:name' do
      resources :talks, only: %i(create update destroy)
    end
  end
end
