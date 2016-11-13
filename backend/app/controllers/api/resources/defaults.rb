module API
  module Resources
    module Defaults
      # if you're using Grape outside of Rails, you'll have to use Module#included hook
      extend ActiveSupport::Concern

      included do
        # common Grape settings
        prefix :api
        format :json

        # HTTP header based authentication
        before do
          @user = User.where(api_key: headers['Authorization']).where.not(api_key: nil).first
          # error!('Unauthorized', 401) if @user.nil?
        end

        helpers do
          def api_params
            @api_params ||= ActionController::Parameters.new(params)
          end
        end

        # global handler for simple not found case
        rescue_from ActiveRecord::RecordNotFound do |e|
          error_response(message: e.message, status: 404)
        end

        # Validation Errors
        rescue_from Grape::Exceptions::ValidationErrors, ActiveRecord::RecordInvalid do |e|
          error_response(message: e.message, status: 422)
        end

        # global exception handler, used for error notifications
        rescue_from :all do |e|
          if Rails.env.development?
            error_response(message: "Internal server error: #{e.message}", status: 500)
          else
            error_response(message: 'Internal server error', status: 500)
          end
        end
      end
    end
  end
end
