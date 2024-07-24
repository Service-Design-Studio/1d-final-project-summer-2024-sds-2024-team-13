class ApplicationController < ActionController::Base
    # push
    protect_from_forgery unless: -> { request.format.json? }
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    private
    def record_not_found
        render json: { error: "Record not found" }, status: :not_found
    end
end
