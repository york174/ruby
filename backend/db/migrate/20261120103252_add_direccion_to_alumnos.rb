class AddDireccionToAlumnos < ActiveRecord::Migration[8.1]
  def change
    add_column :alumnos, :direccion, :string
  end
end
