# frozen_string_literal: true
class Talk < ApplicationRecord
  belongs_to :room

  validates :title, presence: true, uniqueness: {scope: :room_id, message: I18n.t('errors.messages.taken')}
  validates :talker_name, presence: true

  def json_attributes(room)
    attributes.merge(room: room.attributes)
  end
end
