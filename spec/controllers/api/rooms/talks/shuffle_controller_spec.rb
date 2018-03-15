# frozen_string_literal: true

RSpec.describe Api::Rooms::Talks::ShuffleController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'POST create' do
    let!(:room) { create(:room, name: 'yayyay', password: 'password0') }

    context 'parameters are present' do
      let!(:talk_1) { create(:talk, room_id: room.id, title: 'hi') }
      let!(:talk_2) { create(:talk, room_id: room.id, title: 'hey') }

      before do
        allow(Talk).to receive(:import) {
          talk_1.order_number = 10
          talk_1.save
          talk_2.order_number = 0
          talk_2.save
        }
      end

      specify do
        expect {
          post :create, params: {name: 'yayyay', password: 'password0'}
        }.to have_broadcasted_to('room-yayyay').with {|data|
          json = JSON.parse(data)
          expect(json['status']).to eq 200
          expect(json['error']).to be_nil
          expect(json['room']['id']).to eq room.id
          expect(json['room']['talks'][0]['title']).to eq 'hi'
          expect(json['room']['talks'][1]['title']).to eq 'hey'
        }

        expect(response.status).to eq 200
      end
    end

    context 'password is wrong' do
      specify do
        expect(
          post(:create, params: {name: 'yayyay', password: 'password1'})
        ).to have_http_status :unauthorized
      end
    end

    context 'occurs error while processing' do
      before do
        allow_any_instance_of(Array).to receive(:shuffle).and_raise(StandardError.new('hi'))
        allow(Rails.logger).to receive(:error)
      end

      specify do
        expect {
          post :create, params: {name: 'yayyay', password: 'password0'}
        }.to have_broadcasted_to('room-yayyay').with {|data|
          json = JSON.parse(data)
          expect(json['status']).to eq 500
          expect(json['error']).to eq 'Error has occurred. Please try again after a while. 🙇'
        }

        expect(response.status).to eq 500

        expect(Rails.logger).to have_received(:error).once
      end
    end
  end
end
