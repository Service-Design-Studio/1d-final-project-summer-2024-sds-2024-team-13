class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    private
    def record_not_found
        render json: { error: "Record not found" }, status: :not_found
    end

    helper_method :current_user #make current_user method available in views, but not necessary.

    def current_user         #identify if hawker or customer 
        if session[:customer_id]     #session is in-built method to access session hash
        @current_user ||= Customer.find(session[:customer_id])    #||operation ensures @curent_user is only assigned a value if it is nil at first.
        elsif session[:user_id]
        @current_user ||= User.find(session[:user_id])
        end
    end

end
