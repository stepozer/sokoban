module API
  module V1
    class LevelPacks < Grape::API
      include API::V1::Defaults

      resource :level_packs do
        desc 'Get listing level packs'
        get do
          present(LevelPack.order(seqnum: :asc), with: API::V1::Entities::LevelPack)
        end
      end
    end
  end
end
