Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000', 'https://dbsbiz.as.r.appspot.com', 'http://localhost:3001'
      resource '*',
        headers: :any,
        expose: ['Access-Control-Allow-Origin'],
        methods: [:get, :post, :put, :patch, :delete, :options],
        credentials: true
    end
  end
  