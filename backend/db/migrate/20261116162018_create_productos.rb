class CreateProductos < ActiveRecord::Migration[8.1]
  def change
    create_table :productos do |t|
      t.string :nombre, null: false
      t.decimal :precio, precision: 10, scale: 2, null: false

      t.timestamps
    end
  end
end
