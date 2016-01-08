class PagesController < ApplicationController
  def index
  end

  def show
    gon.push(level: Level.find(params[:id]))
  end
end
