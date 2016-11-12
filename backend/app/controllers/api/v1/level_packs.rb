module API
  module V1
    class LevelPacks < Grape::API
      include API::V1::Defaults
      include Grape::Kaminari

      resource :level_packs do
        desc 'Get listing level packs'
        get do
          present(
            LevelPack.order(seqnum: :asc),
            with: API::V1::Entities::LevelPack
          )
        end

        route_param :slug, desc: 'Human-readable level pack name for url' do
          desc 'Get level pack by slug'
          paginate per_page: 20, offset: nil
          get do
            level_pack = LevelPack.find_by!(slug: params[:slug])
            levels     = paginate(level_pack.levels.order(:id))
            present(:level_pack, level_pack, with: API::V1::Entities::LevelPack)
            present(:levels, levels, with: API::V1::Entities::Level)
          end
        end
      end
    end
  end
end
