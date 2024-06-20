# Use the official Ruby image from Docker Hub
FROM ruby:3.2.4

# Install Node.js and Yarn
RUN (curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | apt-key add -) && \
    echo "deb https://deb.nodesource.com/node_14.x buster main" > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs lsb-release

RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Download and install Cloud SQL Auth Proxy
RUN curl -o /cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 && \
    chmod +x /cloud_sql_proxy

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock to the container
COPY Gemfile Gemfile.lock ./

# Install application dependencies
RUN gem install bundler && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install

# Copy the rest of the application code to the container
COPY . /app

# Ensure bin/rails and other bin files have correct shebang and executable permissions
RUN sed -i '1s|.*|#!/usr/bin/env ruby|' /app/bin/* && chmod +x /app/bin/*

# Clear cache and set permissions on the cache directory
RUN rm -rf tmp/cache/assets/sprockets && mkdir -p tmp/cache/assets/sprockets && chmod -R 755 tmp/cache/assets && chown -R root:root tmp/cache/assets

# Set environment variables
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true
ARG MASTER_KEY
ENV RAILS_MASTER_KEY=${MASTER_KEY}

# Precompile Rails assets
RUN bundle exec rake assets:precompile

# Expose port 8080
EXPOSE 8080

# Start the Cloud SQL Auth Proxy and the Rails server
CMD /cloud_sql_proxy -dir=/cloudsql -instances=$CLOUD_SQL_CONNECTION_NAME=tcp:5432 & \
    bundle exec rails server -b 0.0.0.0 -p 8080
