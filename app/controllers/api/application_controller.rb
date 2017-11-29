# frozen_string_literal: true
class Api::ApplicationController < ActionController::API
  include ExceptionAppRenderer
  include LoggerUtility

  # override
  def render_404(e = nil)
    log_error(e)
    head :not_found
  end

  private

  def broadcast_to(channel_name)
    ActionCable.server.broadcast(channel_name, yield)
  end

  def render_json(action, status, locals)
    locals[:status] = status_to_number(status)
    render(action: action, status: status, locals: locals)
  end

  def status_to_number(status_symbol)
    Rack::Utils::SYMBOL_TO_STATUS_CODE[status_symbol]
  end
end
