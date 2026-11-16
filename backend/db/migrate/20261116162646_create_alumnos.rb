class CreateAlumnos < ActiveRecord::Migration[8.1]
  def change
    create_table :alumnos do |t|
      t.string :nombre, null: false
      t.string :apellido, null: false
      t.integer :edad, null: false
      t.string :correo, null: false

      t.timestamps
    end
  end
end
