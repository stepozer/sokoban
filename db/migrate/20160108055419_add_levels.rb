class AddLevels < ActiveRecord::Migration
  def change
    create_table :level_packs do |t|
      t.string        :name,         null: false
      t.string        :slug,         null: false
      t.integer       :seqnum,       null: false
      t.integer       :levels_count, null: false
      t.string        :description
      t.timestamps                   null: false
    end

    create_table :levels do |t|
      t.string        :name,         null: false
      t.string        :level,        null: false
      t.references    :level_pack,   null: false
    end
    add_foreign_key :levels, :level_packs
  end
end
