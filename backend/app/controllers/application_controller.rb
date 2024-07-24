class ApplicationController < ActionController::Base
    #push
    protect_from_forgery unless: -> { request.format.json? }


end
