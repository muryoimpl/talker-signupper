# frozen_string_literal: true
class Api::TalksController < Api::ApplicationController
  def create
    find_room!
    talk = Talk.new(talk_params.merge(room_id: @room.id))
    talk.save!

    ActionCable.server.broadcast(
      "room-#{params[:name]}",
      render_talks_json(:created, talk, talk.errors.full_messages)
    )
    head status
  rescue ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid, ActionController::ParameterMissing => e
    log_warn(e)
    talk = e.class == ActiveRecord::RecordInvalid ? e.record : nil
    render_talks_json(:bad_request, talk, select_error(e))
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
    @room = Room.find_by!(name: params[:name])
  end

  def select_error(e)
    if e.class == ActiveRecord::RecordNotFound
      [I18n.t('errors.room_is_not_found')]
    elsif e.class == ActiveRecord::RecordInvalid
      e.record.errors.full_messages
    else
      [e.message]
    end
  end

  def render_talks_json(status, talk, errors)
    render(
      action: :create,
      status: status,
      locals: {
        status: status_to_number(status),
        errors: errors,
        talk: talk&.json_attributes(@room)
      }
    )
  end
end
