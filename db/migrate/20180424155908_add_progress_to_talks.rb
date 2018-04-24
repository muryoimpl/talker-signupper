# frozen_string_literal: true

class AddProgressToTalks < ActiveRecord::Migration[5.1]
  def change
    add_column :talks, :progress, :integer, null: false, default: 0
  end
end
