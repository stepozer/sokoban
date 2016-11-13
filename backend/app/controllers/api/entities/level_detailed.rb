class API::Entities::LevelDetailed < API::Entities::Level
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
