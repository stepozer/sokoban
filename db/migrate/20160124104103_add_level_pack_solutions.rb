class AddLevelPackSolutions < ActiveRecord::Migration
  def change
    create_table :level_pack_solutions do |t|
      t.references    :user,         null: false
      t.references    :level_pack,   null: false
      t.integer       :progress,     null: false
    end
    add_foreign_key :level_pack_solutions, :users
    add_foreign_key :level_pack_solutions, :level_packs
  end
end
