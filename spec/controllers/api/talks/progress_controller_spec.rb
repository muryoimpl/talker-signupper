# frozen_string_literal: true

RSpec.describe Api::Talks::ProgressController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'PATCH update' do
    let(:room) { create(:room, name: 'yayyay') }
    let(:talk) { create(:talk, :oneFifths, room_id: room.id, order_number: 10) }

    before do
      room.reload
      talk.reload
    end

    context 'progress: "entried"' do
      specify do
        expect {
          patch :update, params: {id: talk.id, progress: 'entried'}
        }.to have_broadcasted_to('room-yayyay').with {|data|
          json = JSON.parse(data)
          expect(json['status']).to eq 200
          expect(json['errors']).to be_blank
          expect(json['talk']['title']).to eq talk.title
          expect(json['talk']['talker_name']).to eq talk.talker_name
          expect(json['talk']['progress']).to eq 'entried'
          expect(json['talk']['room']['id']).to eq room.id
        }
      end
    end

    context 'talk is not found' do
      specify do
        expect(patch(:update, params: {id: talk.id + 1, progress: 'entried'})).to have_http_status :not_found
        expect {
          patch(:update, params: {id: talk.id + 1, progress: 'entried'})
        }.not_to have_broadcasted_to('room-yayyay')
      end
    end

    context '"progress" value is unknown' do
      specify do
        expect(patch(:update, params: {id: talk.id, progress: 'bar'})).to have_http_status :bad_request
        expect {
          patch(:update, params: {id: talk.id, progress: 'bar'})
        }.not_to have_broadcasted_to('room-yayay')
      end
    end

    context 'raise error' do
      before do
        allow(Talk).to receive(:find).and_raise(ActiveRecord::RecordInvalid)
      end

      specify do
        expect_any_instance_of(Api::ApplicationController).to receive(:log_error).with(ActiveRecord::RecordInvalid)

        expect {
          patch(:update, params: {id: 1, progress: 'entried'})
        }.not_to have_broadcasted_to('room-yayyay')
        expect(response.status).to eq 500
      end
    end
  end
end
