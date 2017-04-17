# frozen_string_literal: true
class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :name, null: false

      t.timestamps

      t.index :name, unique: true
    end
  end
end
