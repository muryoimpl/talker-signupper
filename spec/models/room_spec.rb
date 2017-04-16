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
end
