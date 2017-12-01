# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Room, type: :model do
  describe 'Validation' do
    let(:room) { Room.new }

    before do
      room.valid?
    end

    describe '#name' do
      context 'is blank' do
        specify do
          expect(room.errors[:name]).to include "can't be blank"
        end
      end

      context 'length' do
        let(:room) { Room.new(name: 'abc') }

        specify do
          expect(room.errors[:name]).to include 'is too short (minimum is 4 characters)'

          room.name = 'abcd'
          expect(room).to be_valid

          room.name = 'abcdefghijklmnopqrstuvwxyzABCD'
          expect(room).to be_valid

          room.name = 'abcdefghijklmnopqrstuvwxyzABCDE'
          room.valid?
          expect(room.errors[:name]).to include 'is too long (maximum is 30 characters)'
        end
      end

      context 'format' do
        let(:room) { Room.new(name: '09azAZ!$+-@_') }

        specify do
          expect(room).to be_valid

          room.name = '09azAZ!$+-@_*'
          room.valid?
          expect(room.errors[:name]).to include 'only allows these characters 0-9a-zA-Z!$@+-_'
        end
      end
    end
  end

  describe '#json_attributes' do
    let(:room) { create(:room) }
    let!(:talk) { create(:talk, room_id: room.id) }

    specify do
      expect(room.json_attributes).to eq room.attributes.merge(talks: room.talks.map(&:attributes))
    end
  end

  describe '#shuffle_talks!' do
    let(:room) { create(:room) }
    let!(:talk_1) { create(:talk, room_id: room.id) }
    let!(:talk_2) { create(:talk, room_id: room.id) }
    let(:talks) { [talk_2, talk_1] }

    describe 'done with arguments' do
      before do
        talks.each(&:reload)
        allow_any_instance_of(Array).to receive(:shuffle).and_return(talks)
      end

      specify do
        talks.each_with_index do |talk, i|
          talk.order_number = i * 10
        end
        target_columns = Talk.column_names - %w(updated_at created_at id)

        expect(Talk).to receive(:import).with(talks, on_duplicate_key_update: target_columns)
        room.shuffle_talks!
      end
    end
  end
end
