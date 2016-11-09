class LevelPack < ActiveRecord::Base
  has_many :levels
  has_many :level_solutions

  def image_url
    ActionController::Base.helpers.image_path("level_packs/#{slug}.jpg")
  end
end
