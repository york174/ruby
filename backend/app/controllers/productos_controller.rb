class ProductosController < ApplicationController
  before_action :set_producto, only: %i[show update destroy]

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def index
    render json: Producto.order(:id)
  end

  def show
    render json: @producto
  end

  def create
    @producto = Producto.new(producto_params)

    if @producto.save
      render json: @producto, status: :created
    else
      render json: { errors: @producto.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @producto.update(producto_params)
      render json: @producto
    else
      render json: { errors: @producto.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @producto.destroy!
    head :no_content
  end

  private

  def set_producto
    @producto = Producto.find(params[:id])
  end

  def producto_params
    params.require(:producto).permit(:nombre, :precio)
  end

  def render_not_found
    render json: { error: "Producto no encontrado" }, status: :not_found
  end
end
