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

  task :import_levels => :environment do
    ['tutorials', 'alberto-borella', 'thinking-rabbit-original'].each_with_index do |pack, seqnum|
      path = "#{Rails.root}/db/levels/#{pack}"
      meta = YAML.load_file("#{path}/meta.yml")

      level_pack = LevelPack.find_or_create_by(slug: meta['slug']) do |lp|
        lp.seqnum      = seqnum
        lp.name        = meta['name']
        lp.description = meta['description']
      end

      files = Dir["#{path}/*.txt"]
      files.sort.each_with_index do |level_file, number|
        level = File.open(level_file, "r").read.gsub("\r", '').gsub("\n", '!')
        Level.find_or_create_by(name: File.basename(level_file, '.txt'), level_pack: level_pack) do |l|
          l.level = level
        end
      end
    end
  end
end
