# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Talk, type: :model do
  describe 'Validation' do
    let(:room) { create(:room) }

    before do
      talk.valid?
    end

    describe '#title' do
      let(:talk) { build(:talk, title: nil, room_id: room.id) }

      it { expect(talk.errors[:title]).to include "can't be blank" }
    end

    describe '#talker_name' do
      let(:talk) { build(:talk, talker_name: nil, room_id: room.id) }

      it { expect(talk.errors[:talker_name]).to include "can't be blank" }
    end

    describe '#room_id' do
      let(:talk) { build(:talk, room_id: nil) }

      it { expect(talk.errors[:room]).to include 'must exist' }
    end
  end
end
