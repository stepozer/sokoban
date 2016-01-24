class LevelPackSolution < ActiveRecord::Base
  belongs_to :level_pack
  belongs_to :user
end
