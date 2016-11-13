class API::Entities::LevelPack < API::Entities::Base
  expose :id
  expose :name
  expose :slug
  expose :levels_count
  expose :description
  expose :image_url, as: :image
end
