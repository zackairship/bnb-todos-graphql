class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.integer :status, default: 0
      t.text :description
      t.string :title

      t.timestamps
    end
  end
end
