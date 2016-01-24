module API
  module V1
    class LevelSolutions < Grape::API
      include API::V1::Defaults
      helpers LevelSolutionApiHelper

      resource :level_solutions do
        desc 'Creates new level solution'
        params do
          use :level_solution_create
        end
        post do
          LevelSolution.create(level_solution_create_params)
          true
        end
      end
    end
  end
end
