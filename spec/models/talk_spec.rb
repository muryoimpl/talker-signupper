# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Talk, type: :model do
  describe 'Validation' do
    let(:room) { create(:room) }

    describe '#title' do
      let(:talk) { build(:talk, title: nil, room_id: room.id) }

      before do
        talk.valid?
      end

      it { expect(talk.errors[:title]).to include "can't be blank" }
    end

    describe '#talker_name' do
      let(:talk) { build(:talk, talker_name: nil, room_id: room.id) }

      before do
        talk.valid?
      end

      it { expect(talk.errors[:talker_name]).to include "can't be blank" }
    end

    describe '#room_id' do
      let(:talk) { build(:talk, room_id: nil) }

      before do
        talk.valid?
      end

      it { expect(talk.errors[:room]).to include 'must exist' }
    end

    describe 'title' do
      let!(:talk_created) { create(:talk, room_id: room.id, title: 'hi') }
      let(:talk) { build(:talk, room_id: room.id, title: 'hi') }

      before do
        talk.valid?
      end

      it { expect(talk.errors[:title]).to include 'has already been taken' }
    end
  end
end
