#開発環境
up:
	docker compose up -d

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

infront:
	docker compose exec frontend bash

inback:
	docker compose exec backend bash

build:
	docker compose build --no-cache

#本番環境
prod-up:
	docker compose -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.prod.yml down

prod-start:
	docker compose -f docker-compose.prod.yml start

prod-stop:
	docker compose -f docker-compose.prod.yml stop

prod-infront:
	docker compose -f docker-compose.prod.yml exec frontend bash

prod-inback:
	docker compose -f docker-compose.prod.yml exec backend bash

prod-build:
	docker compose -f docker-compose.prod.yml build --no-cache
