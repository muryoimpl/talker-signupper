# frozen_string_literal: true
class Api::TalksController < Api::ApplicationController
  def create
    room = find_room!
    talk = Talk.create(talk_params.merge(room_id: room.id))

    render action: :create, status: status(talk), locals: {
      status: status(talk),
      errors: talk.errors.full_messages,
      talk: talk.json_attributes(room)
    }
  rescue => e
    log_error(e)
    render action: :create, status: :bad_request, locals: {status: 400, errors: [e.message], talk: nil}
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
