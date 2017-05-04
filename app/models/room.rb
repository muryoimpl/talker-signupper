# frozen_string_literal: true
class Room < ApplicationRecord
  ALLOWED_PATTERN = /\A[0-9a-zA-Z!$\+\-@_]+\z/
  has_many :talks

  validates :name, presence: true, length: {in: 4..30, allow_blank: true}, uniqueness: true
  validates :name, format: {with: ALLOWED_PATTERN, message: I18n.t('errors.not_allowed_character'), allow_blank: true}
end
