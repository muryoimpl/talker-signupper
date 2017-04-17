# frozen_string_literal: true
class Room < ApplicationRecord
  validates :name, presence: true, length: {in: 4..30}, uniqueness: true
  validates :name, format: {with: /\A[0-9a-zA-Z!$\+\-@_]+\z/, message: 'only allows these characters 0-9a-zA-Z!$@+-_'}
end
