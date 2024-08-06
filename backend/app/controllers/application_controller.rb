class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }

    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def not_found
      render json: { error: 'Not Found' }, status: :not_found
    end
end
