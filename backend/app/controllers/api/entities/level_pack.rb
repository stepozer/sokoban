module API
  module Entities
    class LevelPack < Base
      expose :id
      expose :name
      expose :slug
      expose :levels_count
      expose :description
      expose :image_url, as: :image
    end
  end
end
