# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include ExceptionAppRenderer
  include LoggerUtility

  protect_from_forgery with: :exception

  # override
  def render_404(e = nil)
    log_warn(e)
    render file: Rails.public_path.join('404.html'), layout: false, status: :not_found
  end
end
