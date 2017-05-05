# frozen_string_literal: true
class Talk < ApplicationRecord
  belongs_to :room

  validates :title, presence: true
  validates :talker_name, presence: true

  def json_attributes(room)
    attributes.merge(room: room.attributes)
  end
end
