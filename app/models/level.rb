class Level < ActiveRecord::Base
  belongs_to :level_pack

  def next_level
    next_level = Level.where('id > ?', id).order(id: :asc).first
    return next_level if next_level
    Level.order(id: :asc).first
  end
end
