module LevelSolutionApiHelper
  extend Grape::API::Helpers

  params :level_solution_create do
    requires :level_id, type: Integer, desc: 'Unique level id'
    requires :solution, type: String,  desc: 'Level solution steps'
  end

  def level_solution_create_params
    api_params.permit(:level_id, :solution).merge(user_id: @user.id)
  end
end
