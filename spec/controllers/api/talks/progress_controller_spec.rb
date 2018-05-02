# frozen_string_literal: true

RSpec.describe Api::Talks::ProgressController, type: :controller do
  render_views

  before do
    request.accept = 'application/json'
  end

  describe 'PATCH update' do
    let(:room) { create(:room) }
    let(:talk) { create(:talk, :oneFifths, room_id: room.id, order_number: 10) }

    before do
      talk.reload
    end

    context 'progress: "entried"' do
      specify do
        expect(patch(:update, params: {id: talk.id, progress: 'entried'})).to have_http_status :ok
        expect(talk.reload.progress).to eq 'entried'
      end
    end

    context 'talk is not found' do
      specify do
        expect(patch(:update, params: {id: talk.id + 1, progress: 'entried'})).to have_http_status :not_found
      end
    end

    context '"progress" value is unknown' do
      specify do
        expect(patch(:update, params: {id: talk.id, progress: 'bar'})).to have_http_status :bad_request
      end
    end

    context 'raise error' do
      before do
        allow(Talk).to receive(:find).and_raise(ActiveRecord::RecordInvalid)
      end

      specify do
        expect_any_instance_of(Api::ApplicationController).to receive(:log_error).with(ActiveRecord::RecordInvalid)

        expect(patch(:update, params: {id: 1, progress: 'entried'})).to have_http_status :internal_server_error
      end
    end
  end
end
