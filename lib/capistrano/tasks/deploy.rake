namespace :deploy do
  task :app_setup do
    on roles(:all) do
      # Restart unicorn server
      # execute '/etc/init.d/unicorn restart sokoban'

      # Upload deploy config
      stage = fetch(:stage).to_s
      upload! "config/deploy/#{stage}.rb", "#{current_path}/config/deploy/#{stage}.rb"
    end
  end

  after :finishing, 'deploy:app_setup'
  after :finishing, 'deploy:cleanup'
end
