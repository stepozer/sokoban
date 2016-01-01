class PagesController < ApplicationController
  def home
  end

  def play
    gon.push('game_goal': ActionController::Base.helpers.asset_path('game/goal.jpg'))
    gon.push('game_wall': ActionController::Base.helpers.asset_path('game/wall.jpg'))
    gon.push('game_hero': ActionController::Base.helpers.asset_path('game/hero_left.jpg'))
    gon.push('game_hero': ActionController::Base.helpers.asset_path('game/hero_right.jpg'))
    gon.push('game_hero': ActionController::Base.helpers.asset_path('game/hero_up.jpg'))
    gon.push('game_hero': ActionController::Base.helpers.asset_path('game/hero_down.jpg'))
    gon.push('game_box': ActionController::Base.helpers.asset_path('game/box.jpg'))
    gon.push('game_box_goal': ActionController::Base.helpers.asset_path('game/box_goal.jpg'))
  end

  def help
  end
end
