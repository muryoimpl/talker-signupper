# frozen_string_literal: true
RSpec.describe Api::RoomsController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'GET show' do
    context 'Room exists' do
      let!(:room) { create(:room, name: 'room_name') }
      let!(:talks) { create_list(:talk, 2, room_id: room.id) }

      before do
        get :show, params: {name: 'room_name'}
      end

      specify do
        expect(response.status).to eq 200
        expect(response.body).to eq({
          status: 200,
          error: nil,
          action: 'show-room',
          room: room.attributes.except('password_digest').merge(talks: talks.map(&:attributes))
        }.to_json)
      end
    end

    context 'Room does not exist' do
      before do
        get :show, params: {name: 'hi'}
      end

      specify do
        expect(response.status).to eq 404
        expect(response.body).to eq({status: 404, error: 'room is not found', action: 'show-room', room: nil}.to_json)
      end
    end

    context 'error has occured' do
      before do
        allow(Room).to receive(:includes).and_raise(ArgumentError)
        get :show, params: {name: 'hihihi'}
      end

      specify do
        expect(response.status).to eq 400
        expect(response.body).to eq({status: 400, error: 'ArgumentError', action: 'show-room', room: nil}.to_json)
      end
    end
  end
end
