module API
  module V1
    class LevelPacks < Grape::API
      include API::V1::Defaults

      resource :level_packs do
        desc 'Get listing level packs'
        get do
          present(
            LevelPack.order(seqnum: :asc),
            with: API::V1::Entities::LevelPack
          )
        end

        route_param :slug do
          desc 'Get level pack by slug'
          get do
            present(
              LevelPack.find_by!(slug: params[:slug]),
              show_levels: true,
              with: API::V1::Entities::LevelPack
            )
          end
        end
      end
    end
  end
end
