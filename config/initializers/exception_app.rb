# frozen_string_literal: true

Rails.configuration.exceptions_app = ->(env) {
  if %r|\A/api|.match?(env['REQUEST_URI'])
    Api::ApplicationController.action(:render_404).call(env)
  else
    ApplicationController.action(:render_404).call(env)
  end
}
