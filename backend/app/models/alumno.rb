class Alumno < ApplicationRecord
  validates :nombre, :apellido, :correo, presence: true
  validates :correo, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :edad, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 130
  }
end
