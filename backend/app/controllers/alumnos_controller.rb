class AlumnosController < ApplicationController
  before_action :set_alumno, only: %i[show update destroy]

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def index
    render json: Alumno.order(:id)
  end

  def show
    render json: @alumno
  end

  def create
    @alumno = Alumno.new(alumno_params)

    if @alumno.save
      render json: @alumno, status: :created
    else
      render json: { errors: @alumno.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @alumno.update(alumno_params)
      render json: @alumno
    else
      render json: { errors: @alumno.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @alumno.destroy!
    head :no_content
  end

  private

  def set_alumno
    @alumno = Alumno.find(params[:id])
  end

  def alumno_params
    params.require(:alumno).permit(:nombre, :apellido, :edad, :correo)
  end

  def render_not_found
    render json: { error: "Alumno no encontrado" }, status: :not_found
  end
end
