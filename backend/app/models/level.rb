class Level < ActiveRecord::Base
  belongs_to :level_pack
  has_many :level_solutions

  def next_level
    next_level = Level.where('id > ?', id).order(id: :asc).first
    return next_level if next_level
    Level.order(id: :asc).first
  end

  def image_url
    ActionController::Base.helpers.image_path("levels/#{level_pack.slug}/#{name}.png")
  end

  def level_matrix
    unless @level_matrix
      result = []
      level.split('!').each do |line|
        result << line.split('')
      end
      @level_matrix = result
    end
    @level_matrix
  end

  def size_x
    level_matrix.max_by(&:length).size
  end

  def size_y
    level_matrix.size
  end
end
