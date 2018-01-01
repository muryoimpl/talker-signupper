# frozen_string_literal: true
FactoryGirl.define do
  factory :room do
    sequence(:name) {|n| "room_name#{n}" }
    password { SecureRandom.urlsafe_base64 }
  end
end
