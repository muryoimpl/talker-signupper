# frozen_string_literal: true
class Api::ApplicationController < ActionController::API
  def log_error(e)
    Rails.logger.error(<<~ERR)
      #{e.class} #{e.message}
      #{e.backtrace.join("\n")}
    ERR
  end
end
