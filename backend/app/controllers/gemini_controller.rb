# app/controllers/gemini_controller.rb
class GeminiController < ApplicationController
  require 'uri'
  require 'net/http'
  require 'json'
  require 'base64'
  require 'dotenv/load' # Ensure dotenv is loaded

  def generate_content
    api_key = Rails.application.credentials.gemini[:api_key]
    uri_string = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + api_key
    puts uri_string

    begin
      image_data = File.read(params[:image_path].path, mode: "rb")
      encoded_image = Base64.strict_encode64(image_data) # No line feeds are added as compared to normal encode 
      body_request = {
        contents: [
          {
            parts: [
              { text: params[:prompt] },
              {
                inlineData: {
                  mimeType: 'image/jpeg', # accepts both png and jpeg
                  data: encoded_image
                }
              }
            ]
          }
        ]
      }.to_json

      req_uri = URI(uri_string)
      res = Net::HTTP.post req_uri, body_request, "Content-Type" => "application/json"

      response_data = JSON.parse(res.body)
      puts response_data # Log the response for debugging

      if response_data["candidates"]
        render json: response_data
      else
        render json: { error: "Unexpected response structure" }, status: :bad_request
      end
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
