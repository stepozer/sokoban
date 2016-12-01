require 'rack/cors'

module API
  class Root < Grape::API
    use Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: :get
      end
    end

    mount API::Resources::Levels
    mount API::Resources::LevelPacks
    mount API::Resources::LevelSolutions
    add_swagger_documentation(
      hide_documentation_path: true,
      hide_format: true,
      format: :json,
      info: {
        title: 'Sokoban Game API'
      }
    )
  end
end
