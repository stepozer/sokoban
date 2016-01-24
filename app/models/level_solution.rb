class LevelSolution < ActiveRecord::Base
  belongs_to :level
  belongs_to :user

  before_create :set_default_empty_values
  after_create :update_level_solutions_count

  private

  def set_default_empty_values
    self.steps = solution.size
  end

  def update_level_solutions_count
    level.update(solutions_count: level.level_solutions.select(:user_id).distinct.count)

    level_pack_solution = LevelPackSolution.find_or_initialize_by(level_pack: level.level_pack, user: user)
    level_pack_solution.update(progress: level.level_solutions.select(:user_id).distinct.count / level.level_pack.levels_count)
  end
end
