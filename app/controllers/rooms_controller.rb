class RoomsController < ApplicationController
  def index
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      redirect_to room_path(id: @room.id)
    else
      render action: :index
    end
  end

  def show
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
