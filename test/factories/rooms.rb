FactoryGirl.define do
  factory :room do
    sequence(:name) {|n| "room_name#{n}" }
  end
end
