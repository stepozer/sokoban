Capistrano::Env.use do |env|
  # General settings
  env.add 'ROUTES_HOST', 'http://localhost:3000'
  env.add 'ASSET_HOST', 'http://localhost:3000'
  env.add 'SECRET_KEY_BASE', 'some_key_value'
  env.add 'DEVISE_SECRET', 'some_key_value'

  # Database settings
  env.add 'DB_HOST', 'localhost'
  env.add 'DB_USERNAME', 'postgres'
  env.add 'DB_PASSWORD', 'postgres'
  env.add 'DB_NAME_DEV', 'sokoban_dev'
  env.add 'DB_NAME_TEST', 'sokoban_test'
  env.add 'DB_NAME_PROD', 'sokoban_dev'
end

set :app_dir, '/var/www/sokoban'
server 'user@example.com', roles: %w{app db web}
