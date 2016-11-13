module API
  module Entities
    class Level < Base
      expose :id
      expose :name
      expose :image_url, as: :image
    end
  end
end
