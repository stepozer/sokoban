class DevController < ApplicationController
  layout 'dev'

  def level_preview
    @level = Level.find(params[:id])
    gon.push(sokoban_level: @level.level)
  end
end
