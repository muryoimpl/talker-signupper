class RoomsController < ApplicationController
  def index
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)

    redirect_to room_path(id: @room.id) and return if @room.save
  end

  def show
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
