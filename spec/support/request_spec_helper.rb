# frozen_string_literal: true
module RequestSpecHelper
  # NOTE: http://qiita.com/upinetree/items/5410f130c91909db347c
  shared_context 'show exceptions', show_exceptions: true do
    around :each do |example|
      show_detailed_exceptions = Rails.application.env_config['action_dispatch.show_detailed_exceptions']
      show_exceptions          = Rails.application.env_config['action_dispatch.show_exceptions']
      consider_all_requests_local = Rails.application.config.consider_all_requests_local

      Rails.application.env_config['action_dispatch.show_detailed_exceptions'] = false
      Rails.application.env_config['action_dispatch.show_exceptions']          = true
      Rails.application.config.consider_all_requests_local                     = false

      example.run

      Rails.application.env_config['action_dispatch.show_detailed_exceptions'] = show_detailed_exceptions
      Rails.application.env_config['action_dispatch.show_exceptions']          = show_exceptions
      Rails.application.config.consider_all_requests_local                     = consider_all_requests_local
    end
  end
end
