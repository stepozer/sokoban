class AddLevels < ActiveRecord::Migration
  def change
    create_table :level_packs do |t|
      t.string        :name,         null: false
      t.string        :author,       null: false
      t.string        :description
      t.timestamps                   null: false
    end

    create_table :levels do |t|
      t.string        :level,        null: false
      t.references    :level_pack,   null: false
    end
    add_foreign_key :levels, :level_packs
  end
end
