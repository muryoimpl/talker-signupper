# frozen_string_literal: true

class Api::RoomsController < Api::ApplicationController
  def show
    room = Room.includes(:talks).find_by(name: params[:name])

    render action: :show, status: status(room), locals: {
      status: status(room),
      error: error_message(room),
      room: room
    }
  rescue => e
    log_error(e)
    render action: :show, status: :bad_request, locals: {status: 400, error: e.message, room: nil}
  end

  private

  def status(room)
    room ? 200 : 404
  end

  def error_message(room)
    room ? nil : I18n.t('errors.room_is_not_found')
  end
end
