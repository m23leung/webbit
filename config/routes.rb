Rails.application.routes.draw do
  resources :communities
  resources :submissions
  devise_for :users
  root to: "submissions#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
