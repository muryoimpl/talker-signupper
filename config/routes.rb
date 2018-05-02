# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'rooms#index'

  resources :rooms, only: %i(index create show), param: :name

  namespace :api do
    resources :rooms, only: %i(show), param: :name

    namespace :rooms do
      scope ':name' do
        resources :talks, only: %i(create update destroy) do
          collection do
            resources :shuffle, only: %i(create), module: :talks
          end
        end
      end
    end

    patch '/talks/:id/progress', to: 'talks/progress#update', constraints: {id: /\d+/}, as: :talks_progress
  end

  mount ActionCable.server => '/cable'
end
