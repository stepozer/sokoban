module API
  module Entities
    class Base < Grape::Entity
      format_with(:api_datetime) { |t| t.to_formatted_s(:api_datetime) }
    end
  end
end
