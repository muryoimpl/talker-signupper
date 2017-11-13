# frozen_string_literal: true
class Api::ApplicationController < ActionController::API
  def render_404(e = nil)
    log_error(e)
    head :not_found
  end

  private

  def log_error(e)
    return unless e
    Rails.logger.error(<<~ERR)
      #{e.class} #{e.message}
      #{e.backtrace.join("\n")}
    ERR
  end

  def log_warn(e)
    Rails.logger.warn(<<~WARN)
      #{e.class} #{e.message}
      #{e.backtrace.join("\n")}
    WARN
  end
end
