# frozen_string_literal: true
class Api::RoomsController < Api::ApplicationController
  def show
    room = Room.includes(:talks).find_by(name: params[:name])

    render action: :show, status: status(room), locals: {
      status: status(room),
      errors: [],
      room: room&.json_attributes
    }
  rescue => e
    log_error(e)
    render action: :show, status: :bad_request, locals: {status: 400, errors: [e.message], room: nil}
  end

  private

  def find_room!
    Room.find_by!(name: params[:name])
  end

  def status(room)
    room ? 200 : 404
  end
end
