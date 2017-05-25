# frozen_string_literal: true
Rails.application.routes.draw do
  root to: 'rooms#index'

  resources :rooms, only: %i(index create)

  namespace :api do
    resources :rooms, only: %i(show), param: :name

    scope '/rooms/:name' do
      resources :talks, only: %i(create update destroy)
    end
  end
end
