# frozen_string_literal: true
FactoryGirl.define do
  factory :talk do
    sequence(:title) {|n| "title-#{n}" }
    sequence(:talker_name) {|n| "talker-#{n}" }
    room_id nil
    order_number nil
  end
end
