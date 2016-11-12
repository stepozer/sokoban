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
        with_options(format_with: :api_datetime) do
          expose :created_at
        end
      end

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
end
