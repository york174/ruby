Rails.application.routes.draw do
  resources :alumnos, only: %i[index show create update destroy]
  resources :productos, only: %i[index show create update destroy]

  get "up" => "rails/health#show", as: :rails_health_check
end
