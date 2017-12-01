# frozen_string_literal: true
class Room < ApplicationRecord
  ALLOWED_PATTERN = /\A[0-9a-zA-Z!$\+\-@_]+\z/
  has_many :talks

  validates :name, presence: true, length: {in: 4..30, allow_blank: true}, uniqueness: true
  validates :name, format: {with: ALLOWED_PATTERN, message: I18n.t('errors.not_allowed_character'), allow_blank: true}

  def json_attributes
    attributes.merge(talks: talks.ordered_by_number.map(&:attributes))
  end

  def shuffle_talks!
    re_numbered_talks = talks.to_a.shuffle.map.with_index {|talk, i|
      talk.order_number = i * 10
      talk
    }

    target_columns = Talk.column_names - %w(created_at updated_at id)
    Talk.import re_numbered_talks, on_duplicate_key_update: target_columns
  end
end
