module API
  module V1
    module Entities
      class Base < Grape::Entity
        format_with(:api_datetime) { |t| t.to_formatted_s(:api_datetime) }
      end

      class Level < Base
        expose :id
        expose :name
        expose :image_url, as: :image
      end

      class LevelDetailed < Level
        expose :level_matrix, as: :level
        expose :size_x
        expose :size_y
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
        expose :image_url, as: :image
        expose :levels, if: { show_levels: true }, using: API::V1::Entities::Level
      end
    end
  end
end
