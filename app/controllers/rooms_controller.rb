class RoomsController < ApplicationController
  def index
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      redirect_to rooms_show_path(name: @room.name)
    else
      render action: :index
    end
  end

  def show
    @room = Room.find_by(name: params[:name])
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
