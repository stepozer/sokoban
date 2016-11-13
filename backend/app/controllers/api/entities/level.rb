class API::Entities::Level < API::Entities::Base
  expose :id
  expose :name
  expose :image_url, as: :image
end
