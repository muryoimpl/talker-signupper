# frozen_string_literal: true

class AddOrderNumberToTalks < ActiveRecord::Migration[5.1]
  def change
    add_column :talks, :order_number, :integer
    add_index :talks, %i(room_id order_number)
  end
end
