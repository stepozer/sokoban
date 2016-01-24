class AddSolutions < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      t.string :name,               null: false, limit: 255
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      t.string   :api_key, null: false

      t.timestamps
    end
    add_index :users, :email,                unique: true
    add_index :users, :api_key,              unique: true

    create_table :level_solutions do |t|
      t.references    :user,         null: false
      t.references    :level,        null: false
      t.integer       :steps,        null: false
      t.text          :solution,     null: false
      t.timestamps                   null: false
    end
    add_foreign_key :level_solutions, :users
    add_foreign_key :level_solutions, :levels
  end
end
