require "test_helper"

class AlumnosControllerTest < ActionDispatch::IntegrationTest
  test "lists alumnos as JSON" do
    get alumnos_url

    assert_response :success
    assert_equal 2, JSON.parse(response.body).length
  end

  test "creates an alumno" do
    assert_difference("Alumno.count", 1) do
      post alumnos_url,
        params: { alumno: { nombre: "Luis", apellido: "Garcia", edad: 18, correo: "luis@example.com" } },
        as: :json
    end

    assert_response :created
    assert_equal "Luis", JSON.parse(response.body)["nombre"]
  end

  test "updates an alumno" do
    alumno = alumnos(:one)

    put alumno_url(alumno),
      params: { alumno: { nombre: "York actualizado", apellido: "Ejemplo", edad: 13, correo: "york@example.com" } },
      as: :json

    assert_response :success
    assert_equal "York actualizado", JSON.parse(response.body)["nombre"]
  end

  test "deletes an alumno" do
    alumno = alumnos(:one)

    assert_difference("Alumno.count", -1) do
      delete alumno_url(alumno)
    end

    assert_response :no_content
  end

  test "returns validation errors as JSON" do
    post alumnos_url,
      params: { alumno: { nombre: "", apellido: "", edad: 131, correo: "correo-invalido" } },
      as: :json

    assert_response :unprocessable_entity
    assert JSON.parse(response.body).key?("errors")
  end

  test "returns JSON not found for a missing alumno" do
    get alumno_url(id: -1), as: :json

    assert_response :not_found
    assert_equal "Alumno no encontrado", JSON.parse(response.body)["error"]
  end
end
