# frozen_string_literal: true

class CreateTalks < ActiveRecord::Migration[5.1]
  def change
    create_table :talks do |t|
      t.string :title
      t.string :talker_name
      t.references :room

      t.timestamps
    end
  end
end
