module LevelSolutionApiHelper
  extend Grape::API::Helpers

  params :level_solution_create do
    requires :level_id
    requires :solution
  end

  def level_solution_create_params
    api_params.permit(:level_id, :solution).merge(user_id: @user.id)
  end
end
