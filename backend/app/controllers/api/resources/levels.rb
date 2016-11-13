class API::Resources::Levels < Grape::API
  include API::Resources::Defaults

  get '/levels/:id' do
    level = Level.find(params[:id])
    present(level, with: API::Entities::LevelDetailed)
  end
end
