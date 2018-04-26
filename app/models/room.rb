# frozen_string_literal: true

class Room < ApplicationRecord
  ALLOWED_PATTERN = /\A[0-9a-zA-Z!$\+\-@_]+\z/
  has_secure_password
  has_many :talks, dependent: :destroy

  validates :name, presence: true, length: {in: 4..30, allow_blank: true}, uniqueness: true
  validates :name, format: {with: ALLOWED_PATTERN, message: I18n.t('errors.not_allowed_character'), allow_blank: true}
  validates :password, length: {minimum: 6, allow_blank: true}

  def json_attributes
    attributes.except('password_digest').merge(talks: talks.ordered_by_number.map(&:attributes))
  end

  def shuffle_talks!
    re_numbered_talks = talks.where(progress: 0).to_a.shuffle.map.with_index {|talk, i|
      talk.order_number = i * 10
      talk
    }

    target_columns = Talk.column_names - %w(created_at updated_at)
    Talk.import re_numbered_talks, on_duplicate_key_update: target_columns
  end
end
