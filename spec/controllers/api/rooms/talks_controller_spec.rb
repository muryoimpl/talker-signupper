# frozen_string_literal: true
RSpec.describe Api::Rooms::TalksController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'POST create' do
    let!(:room) { create(:room, name: 'yayyay') }

    context 'Room exists' do
      context 'parameters are present and broadcast response successfully' do
        specify do
          expect {
            post :create, params: {name: 'yayyay', talk: {title: 'hi', talker_name: 'muryoimpl'}}
          }.to have_broadcasted_to('room-yayyay').with {|data|
            json = JSON.parse(data)
            expect(json['status']).to eq 201
            expect(json['errors']).to be_blank
            expect(json['talk']['title']).to eq 'hi'
            expect(json['talk']['talker_name']).to eq 'muryoimpl'
            expect(json['talk']['room']['id']).to eq room.id
          }
        end
      end

      context 'raise error' do
        before do
          allow(Rails.logger).to receive(:warn)
          allow(Room).to receive(:find_by!).with(name: 'yayyaa').and_raise(ActiveRecord::RecordNotFound)

          post(:create, params: {name: 'yayyaa', talk: {title: 'foo', talker_name: 'ip'}})
        end

        specify do
          json = JSON.parse(response.body)
          expect(response).to have_http_status :bad_request
          expect(json['status']).to eq 400
          expect(json['errors']).to eq ['room is not found']
          expect(json['talk']).to be_nil
          expect(Rails.logger).to have_received(:warn).once
        end
      end

      context 'some parameters are missing' do
        context 'talk' do
          before do
            allow(Rails.logger).to receive(:warn)
            post :create, params: {name: 'yayyay'}
          end

          specify do
            json = JSON.parse(response.body)
            expect(response).to have_http_status :bad_request
            expect(json['status']).to eq 400
            expect(json['errors']).to eq ['param is missing or the value is empty: talk']
            expect(json['talk']).to be_nil
            expect(Rails.logger).to have_received(:warn).once
          end
        end

        context 'talker name' do
          before do
            allow(Rails.logger).to receive(:warn)
            post :create, params: {name: 'yayyay', talk: {title: 'heyhey'}}
          end

          specify do
            json = JSON.parse(response.body)
            expect(response).to have_http_status :bad_request
            expect(json['status']).to eq 400
            expect(json['errors']).to eq ["Talker name can't be blank"]
            expect(json['talk']['talker_name']).to be_nil
            expect(json['talk']['title']).to eq 'heyhey'
          end
        end
      end
    end
  end
end
