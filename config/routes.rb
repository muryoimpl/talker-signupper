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
  end

  mount ActionCable.server => '/cable'
end
