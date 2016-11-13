module API
  module Resources
    class Levels < Grape::API
      include API::Resources::Defaults

      get '/levels/sprites' do
        present(LevelSprite.all, with: API::Entities::LevelSprite)
      end

      get '/levels' do
        present(LevelSprite.all, with: API::Entities::LevelSprite)
      end

      get '/levels/:id' do
        level = Level.find(params[:id])
        present(level, with: API::Entities::LevelDetailed)
      end
    end
  end
end
