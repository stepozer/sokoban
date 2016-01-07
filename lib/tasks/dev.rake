require 'base64'

namespace :dev do
  task :prepare_game_images => :environment do
    images      = {}
    assets_path = "#{Rails.root}/app/assets"
    ['wall', 'goal', 'box', 'box_goal', 'hero_up', 'hero_down', 'hero_left', 'hero_right'].each do |img|
      File.open("#{assets_path}/images/game/#{img}.jpg", 'r') do |f|
        images[img] = 'data:image/jpeg;base64,' + Base64.encode64(f.read)
      end
    end
    images = "
      var SokobanCellImages = #{images.to_json};
      module.exports = SokobanCellImages;
    "
    File.open("#{assets_path}/javascripts/game/stores/sokoban_cell_images_store.js", 'w') { |f| f.write(images) }
  end
end
