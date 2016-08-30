class PagesController < ApplicationController
  def home
    @levels = Level.order(created_at: :desc).limit(8)
  end

  def help
  end

  def single_page_application
    gon.push(level_packs: LevelPack.order(seqnum: :asc))
  end
end
