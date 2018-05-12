# frozen_string_literal: true

module ExceptionAppRenderer
  # called by config/initializers/exception_app.rb
  # :nocov:
  def render_404
    raise NotImplementedError
  end
  # :nocov:
end
