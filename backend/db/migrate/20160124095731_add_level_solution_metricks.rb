class AddLevelSolutionMetricks < ActiveRecord::Migration
  def change
    add_column :levels, :solutions_count, :integer, default: 0
  end
end
