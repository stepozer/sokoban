class PlayController < ApplicationController
  def index
  end

  def show
    gon.push(sokoban_level: Level.find(params[:id]).level)
  end
end
