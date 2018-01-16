# frozen_string_literal: true
class Api::Rooms::Talks::ShuffleController < Api::ApplicationController
  def create
    room = Room.find_by!(name: params[:name])

    unless room.try(:authenticate, params[:password])
      head :unauthorized
      return
    end

    room.shuffle_talks!

    broadcast_to("room-#{params[:name]}") do
      render_json(:create, :ok, room: room.json_attributes, error: nil)
    end
    head :ok
  rescue => e
    log_error(e)

    broadcast_to("room-#{params[:name]}") do
      render_json(:create, :internal_server_error, room: room&.json_attributes, error: I18n.t('errors.raised_error'))
    end
    head :internal_server_error
  end
end
