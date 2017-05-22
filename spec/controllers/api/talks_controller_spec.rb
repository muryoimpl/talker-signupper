# frozen_string_literal: true
RSpec.describe Api::TalksController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'POST create' do
    let!(:room) { create(:room, name: 'yayyay') }

    context 'Room exists' do
      context 'parameters are present' do
        before do
          post :create, params: {name: 'yayyay', talk: {title: 'hi', talker_name: 'muryoimpl'}}
        end

        specify do
          expect(response).to have_http_status :created

          body = JSON.parse(response.body)
          expect(body['status']).to eq 201
          expect(body['errors']).to be_blank
          expect(body['talk']['title']).to eq 'hi'
          expect(body['talk']['talker_name']).to eq 'muryoimpl'
          expect(body['talk']['room']['id']).to eq room.id
        end
      end

      context 'raise error' do
        before do
          allow(Rails.logger).to receive(:error)
          allow(Room).to receive(:find_by!).with(name: 'yayyaa').and_raise(ActiveRecord::RecordNotFound)

          post :create, params: {name: 'yayyaa', talk: {title: 'foo', talker_name: 'ip'}}
        end

        specify do
          expect(Rails.logger).to have_received(:error).once
          expect(response).to have_http_status :bad_request

          body = JSON.parse(response.body)
          expect(body['status']).to eq 400
          expect(body['errors']).to eq %w(ActiveRecord::RecordNotFound)
          expect(body['talk']).to be_nil
        end
      end

      context 'some parameters are missing' do
        context 'talk' do
          before do
            post :create, params: {name: 'yayyay'}
          end

          specify do
            expect(response).to have_http_status :bad_request

            body = JSON.parse(response.body)
            expect(body['status']).to eq 400
            expect(body['errors']).to eq ['param is missing or the value is empty: talk']
            expect(body['talk']).to be_nil
          end
        end

        context 'talker name' do
          before do
            post :create, params: {name: 'yayyay', talk: {title: 'heyhey'}}
          end

          specify do
            expect(response).to have_http_status :bad_request

            body = JSON.parse(response.body)
            expect(body['status']).to eq 400
            expect(body['errors']).to eq ["Talker name can't be blank"]
            expect(body['talk']['talker_name']).to be_nil
          end
        end
      end
    end
  end
end
