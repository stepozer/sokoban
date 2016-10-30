module API
  module V1
    module Entities
      class Base < Grape::Entity
        format_with(:api_datetime) { |t| t.to_formatted_s(:api_datetime) }
      end

      class Level < Base
        expose :id
        expose :name
        expose :image do |i, o|
          ActionController::Base.helpers.image_path("levels/#{i.level_pack.slug}/#{i.name}.png")
        end
        expose :level_pack_slug do |i, o|
          i.level_pack.slug
        end
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
        expose :levels, if: { show_levels: true }, using: API::V1::Entities::Level
      end
    end
  end
end
