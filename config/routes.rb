Rails.application.routes.draw do
  root 'application#index'
  get '/home' => 'application#home'
end
