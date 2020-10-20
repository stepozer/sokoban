ps:
	docker-compose ps

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

sokoban-frontend-ssh:
	docker-compose exec sokoban-frontend /bin/bash

sokoban-frontend-restart:
	docker-compose stop sokoban-frontend
	docker-compose up -d sokoban-frontend

sokoban-frontend-logs:
	docker-compose logs --follow sokoban-frontend