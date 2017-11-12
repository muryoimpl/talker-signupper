# frozen_string_literal: true
class Api::TalksController < Api::ApplicationController
  def create
    room = find_room!
    talk = Talk.new(talk_params.merge(room_id: room.id))
    status = talk.save ? :ok : :bad_request

    ActionCable.server.broadcast(
      "room-#{params[:name]}",
      render(action: :create, status: status, locals: {
        status: status(talk),
        errors: talk.errors.full_messages,
        talk: talk.json_attributes(room)
      })
    )
    head :ok
  end

  def update
  end

  def destroy
  end

  private

  def talk_params
    params.require(:talk).permit(:title, :talker_name)
  end

  def find_room!
    Room.find_by!(name: params[:name])
  end

  def status(talk)
    talk.valid? ? 201 : 400
  end
end
