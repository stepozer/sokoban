class LevelPackSolution < ActiveRecord::Base
  belongs_to :level_pack
  belongs_to :user

  def update_progress
    user_solutions_count = LevelSolution.where(level: level_pack.levels.pluck(:id), user: user).select(:level_id).distinct.count
    update(progress: user_solutions_count * 100 / level_pack.levels_count)
  end
end
