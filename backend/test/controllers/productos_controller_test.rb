require "test_helper"

class ProductosControllerTest < ActionDispatch::IntegrationTest
  test "lists productos as JSON" do
    get productos_url

    assert_response :success
    assert_equal 2, JSON.parse(response.body).length
  end

  test "creates a producto" do
    assert_difference("Producto.count", 1) do
      post productos_url, params: { producto: { nombre: "Cuaderno", precio: 12.5 } }, as: :json
    end

    assert_response :created
    assert_equal "Cuaderno", JSON.parse(response.body)["nombre"]
  end

  test "updates a producto" do
    producto = productos(:one)

    put producto_url(producto), params: { producto: { nombre: "Cuaderno actualizado", precio: 15 } }, as: :json

    assert_response :success
    assert_equal "Cuaderno actualizado", JSON.parse(response.body)["nombre"]
  end

  test "deletes a producto" do
    producto = productos(:one)

    assert_difference("Producto.count", -1) do
      delete producto_url(producto)
    end

    assert_response :no_content
  end

  test "returns validation errors as JSON" do
    post productos_url, params: { producto: { nombre: "", precio: -1 } }, as: :json

    assert_response :unprocessable_entity
    assert JSON.parse(response.body).key?("errors")
  end

  test "returns JSON not found for a missing producto" do
    get producto_url(id: -1), as: :json

    assert_response :not_found
    assert_equal "Producto no encontrado", JSON.parse(response.body)["error"]
  end
end
