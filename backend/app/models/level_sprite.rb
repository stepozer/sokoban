class LevelSprite
  def self.all
    sprites = [ :wall, :goal, :hero_up, :hero_down, :hero_left, :hero_right, :box, :box_goal ]
    result  = []
    sprites.each do |name|
      result << { name: name, url: sprite_url(name) }
    end
    result
  end

  def self.sprite_url(name)
    ActionController::Base.helpers.image_path("game/#{name}.jpg")
  end
end
