# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'SokobanGame'
set :repo_url, 'git@github.com:stepozer/sokoban.git'

# Default branch is :master
set :branch, 'master'

# Root directory with source code
set :deploy_to, ->{ fetch(:app_dir) }

# VCS system name
set :scm, :git

# Shared directories
set :linked_dirs, %w{log node_modules tmp/pids tmp/cache tmp/sockets public/assets}
set :linked_files, %w(.env)

# Count stored releases
set :keep_releases, 5

# Specify rails app environment
set :rails_env, 'production'