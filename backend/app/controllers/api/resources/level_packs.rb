module API
  module Resources
    class LevelPacks < Grape::API
      include API::Resources::Defaults
      include Grape::Kaminari

      get '/level_packs' do
        present(
          LevelPack.order(seqnum: :asc),
          with: API::Entities::LevelPack
        )
      end

      paginate per_page: 20, offset: nil
      get '/level_packs/:slug' do
        level_pack = LevelPack.find_by!(slug: params[:slug])
        levels     = paginate(level_pack.levels.order(:id))
        present(:level_pack, level_pack, with: API::Entities::LevelPack)
        present(:levels, levels, with: API::Entities::Level)
      end
    end
  end
end
