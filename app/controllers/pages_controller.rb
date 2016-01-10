class PagesController < ApplicationController
  def home
    @levels = Level.order(created_at: :desc).limit(6)
  end

  def help
  end
end
