module API
  module V1
    module Entities
      class Base < Grape::Entity
        format_with(:api_datetime) { |t| t.to_formatted_s(:api_datetime) }
      end

      class LevelPack < Base
        expose :id
        expose :name
        expose :slug
        expose :levels_count
        expose :description
        expose :image do |i, o|
          ActionController::Base.helpers.image_path("level_packs/#{i.slug}.jpg")
        end
      end
    end
  end
end
