module ApplicationHelper
  def site_menu(name)
    content_for(:site_menu) { name }
  end

  def level_preview_img(level)
    image_tag("levels/#{level.level_pack.slug}/#{level.name}.png")
  end

  def level_pack_img(level_pack)
    image_tag("level_packs/#{level_pack.slug}.jpg")
  end
end
