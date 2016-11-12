module API
  module V1
    class Levels < Grape::API
      include API::V1::Defaults

      resource :levels do
        route_param :id do
          desc 'Get level by id'
          get do
            level = Level.find(params[:id])
            present(level, with: API::V1::Entities::LevelDetailed)
          end
        end
      end
    end
  end
end