require 'grape-swagger'

module API
  module V1
    class Root < Grape::API
      mount API::V1::LevelSolutions
      add_swagger_documentation(
        api_version: 'v1',
        hide_documentation_path: true,
        hide_format: true,
        format: :json,
        info: {
          title: 'Sokoban Game API'
        }
      )
    end
  end
end
