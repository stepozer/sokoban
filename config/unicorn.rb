ROOT_DIR = __dir__+'/../'

timeout 60

if !ENV['LOCAL'].nil?
  # Local mode
  worker_processes 4
  listen 3000
else
  # Production mode
  worker_processes 4
  working_directory "#{ROOT_DIR}"

  stderr_path "#{ROOT_DIR}/log/unicorn.stderr.log"
  stdout_path "#{ROOT_DIR}/log/unicorn.stdout.log"
  listen "unix:#{ROOT_DIR}/tmp/sockets/unicorn.sock"
  pidfile = "#{ROOT_DIR}/tmp/pids/unicorn.pid"
  pid pidfile

  preload_app true

  before_fork do |server, worker|
    old_pid = "#{pidfile}.oldbin"
    if File.exists?(old_pid) and server.pid != old_pid
      begin
        Process.kill('QUIT', File.read(old_pid).to_i)
      rescue Errno::ENOENT, Errno::ESRCH
        # someone else did our job for us
      end
    end
  end
end