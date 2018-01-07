# frozen_string_literal: true
class AddPasswordToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :password_digest, :string, null: false
  end
end
