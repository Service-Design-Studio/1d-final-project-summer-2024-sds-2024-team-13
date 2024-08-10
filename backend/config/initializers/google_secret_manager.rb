# config/initializers/google_secret_manager.rb
if Rails.env.production?
  require "google/cloud/secret_manager"

  # Create a Secret Manager client
  secret_manager_client = Google::Cloud::SecretManager.secret_manager_service

  # Access the secret and set it as an environment variable
  gemini_api_key_secret = secret_manager_client.access_secret_version(
    name: "projects/YOUR_PROJECT_ID/secrets/gemini-api-key/versions/latest"
  )
  ENV['GEMINI_API_KEY'] = gemini_api_key_secret.payload.data

end
