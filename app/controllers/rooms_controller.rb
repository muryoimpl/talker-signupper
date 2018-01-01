# frozen_string_literal: true
class RoomsController < ApplicationController
  def index
    @room = Room.new
    @name = params[:name] if params[:name]
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      redirect_to room_path(name: @room.name)
    else
      render action: :index
    end
  end

  def show
    @room = Room.find_by(name: params[:name])

    unless @room
      flash[:not_exist_alert] = I18n.t('errors.room_is_not_found')
      redirect_to rooms_path(name: params[:name])
    end
  end

  private

  def room_params
    params.require(:room).permit(:name, :password)
  end
end
