# frozen_string_literal: true
class Talk < ApplicationRecord
  belongs_to :room

  validates :title, presence: true, length: {maximum: 50}
  validates :title, uniqueness: {scope: :room_id, message: I18n.t('errors.messages.taken')}
  validates :talker_name, presence: true, length: {maximum: 50}

  scope :ordered_by_number, -> { order(order_number: :desc, id: :asc) }

  def json_attributes(room)
    attributes.merge(room: room.attributes)
  end
end
