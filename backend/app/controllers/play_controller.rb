class PlayController < ApplicationController
  def index
    @level_packs = LevelPack.order(seqnum: :asc)
    if current_user && !params[:not_solved].blank?
      ids = LevelPackSolution.where(user: current_user, progress: 100).pluck(:level_pack_id)
      @level_packs = @level_packs.where.not(id: ids)
    end
  end

  def pack
    @level_pack = LevelPack.find_by!(slug: params[:pack])
    @levels = Level.where(level_pack: @level_pack).order(id: :asc).page(params[:page]).per(32)
  end

  def show
    @level_pack = LevelPack.find_by!(slug: params[:pack])
    @level      = Level.find_by!(level_pack: @level_pack, name: params[:level])
    next_level  = @level.next_level
    gon.push(api_key: current_user.api_key) if current_user
    gon.push(sokoban_level: @level.level)
    gon.push(sokoban_level_id: @level.id)
    gon.push(sokoban_next_level_url: play_show_path(pack: next_level.level_pack.slug, level: next_level.name))
  end
end
