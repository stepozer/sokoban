class PlayController < ApplicationController
  def index
    @level_packs = LevelPack.order(author: :asc, name: :asc)
  end

  def pack
    @level_pack = LevelPack.find(params[:pack])
    @levels = Level.where(level_pack: @level_pack).order(id: :asc)
  end

  def show
    @level = Level.find(params[:level])
    gon.push(sokoban_level: @level.level)
  end
end
