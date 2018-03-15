# frozen_string_literal: true

module ExceptionAppRenderer
  # called by config/initializers/exception_app.rb
  def render_404
    raise NotImplementedError
  end
end
