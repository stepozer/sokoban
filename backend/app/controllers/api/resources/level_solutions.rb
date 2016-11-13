class API::Resources::LevelSolutions < Grape::API
  include API::Resources::Defaults
  helpers LevelSolutionApiHelper

  params do
    use :level_solution_create
  end
  post '/level_solutions' do
    LevelSolution.create(level_solution_create_params)
    true
  end
end
