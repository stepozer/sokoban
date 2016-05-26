class LevelPack < ActiveRecord::Base
  has_many :levels
  has_many :level_solutions
end
