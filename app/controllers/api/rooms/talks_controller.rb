# frozen_string_literal: true
class Api::Rooms::TalksController < Api::ApplicationController
  def create
    find_room!
    talk = Talk.new(talk_params.merge(room_id: @room.id))
    talk.save!

    broadcast_to("room-#{params[:name]}") do
      render_json(:create, :created, talk: talk.json_attributes(@room), errors: nil)
    end
    head :ok
  rescue ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid, ActionController::ParameterMissing => e
    log_warn(e)
    talk = e.class == ActiveRecord::RecordInvalid ? e.record : nil
    render_json(:create, :bad_request, talk: talk&.json_attributes(@room), errors: talks_error(e))
  end

  def update; end

  def destroy; end

  private

  def talk_params
    params.require(:talk).permit(:title, :talker_name)
  end

  def find_room!
    @room = Room.find_by!(name: params[:name])
  end

  def talks_error(e)
    if e.class == ActiveRecord::RecordNotFound
      [I18n.t('errors.room_is_not_found')]
    elsif e.class == ActiveRecord::RecordInvalid
      e.record.errors.full_messages
    else
      [e.message]
    end
  end
end
