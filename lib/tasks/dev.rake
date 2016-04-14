require 'base64'
# require 'rmagick'
# require 'selenium-webdriver'

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
    ['tutorials', 'alberto-borella', 'thinking-rabbit-original', 'thinking-rabbit-extra'].each_with_index do |pack, seqnum|
      path = "#{Rails.root}/db/levels/#{pack}"
      meta = YAML.load_file("#{path}/meta.yml")

      files = Dir["#{path}/*.txt"]

      level_pack = LevelPack.find_or_initialize_by(slug: meta['slug'])
      level_pack.seqnum       = seqnum
      level_pack.name         = meta['name']
      level_pack.description  = meta['description']
      level_pack.levels_count = files.size
      level_pack.save

      files.sort.each_with_index do |level_file, number|
        level = File.open(level_file, "r").read.gsub("\r", '').gsub("\n", '!')
        l = Level.find_or_initialize_by(name: (number + 1).to_s, level_pack: level_pack)
        l.update(level: level)
      end
    end
  end

  task :generate_level_avatars => :environment do
    driver = Selenium::WebDriver.for :firefox

    levels = Level.order(id: :asc)
    levels.each do |level|
      img_path = "#{Rails.root}/app/assets/images/levels/#{level.level_pack.slug}/#{level.name}.png"
      driver.navigate.to(Rails.application.routes.url_helpers.dev_level_preview_url(level))
      sleep(1)
      driver.save_screenshot(img_path)

      img = Magick::Image.read(img_path).first
      img.trim!
      img.resize_to_fit!(100, 80)
      img.write(img_path)
    end

    driver.quit
  end
end
