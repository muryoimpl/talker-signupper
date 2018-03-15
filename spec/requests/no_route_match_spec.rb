# frozen_string_literal: true

RSpec.describe 'ApplicationController/Api::ApplicationController', type: :request do
  context 'No route match' do
    include_context 'show exceptions'

    describe 'ApplicationController' do
      before do
        get '/foo/bar'
      end

      specify do
        expect(response).to have_http_status :not_found
        expect(response.body).to include "The page you were looking for doesn't exist (404)"
      end
    end

    describe 'Api::ApplicationController' do
      before do
        get '/api/foo/bar'
      end

      specify do
        expect(response).to have_http_status :not_found
        expect(response.body).to be_blank
      end
    end
  end
end
