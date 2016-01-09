module ApplicationHelper
  def level_preview_img(level)
    image_tag("levels/#{level.level_pack.slug}/#{level.name}.png")
  end
end
