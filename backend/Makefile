.PHONY: create-tables create-seeders migrate-tables populate-tables reset-tables unpopulate-tables build start stop remove logs lint mocha test run clear-redis release

SHELL := /bin/bash
branch := $(shell git branch | grep \* | cut -d ' ' -f2)
CONTAINER_NAME := bd-node-app

build:
	docker-compose build
	docker-compose run --rm node npm install

start:
	docker-compose up -d

stop:
	docker-compose down

remove:
	docker-compose rm

logs:
	docker logs -f $(CONTAINER_NAME) | node_modules/.bin/pino

logs-tail:
	docker logs -f --tail 100 $(CONTAINER_NAME) | node_modules/.bin/pino

lint:
	docker-compose run --rm node npm run lint

mocha:
	docker-compose run --rm node npm run mocha

test: lint mocha

run:
	docker-compose exec node sh

create-tables:
	chmod +x ./scripts/create-database.sh
	./scripts/create-database.sh

migrate-tables:
	python scripts/populate_config.py
	npx sequelize db:migrate
	python scripts/api_config.py

create-seeders:
	chmod +x ./scripts/create-seeders.sh
	./scripts/create-seeders.sh

populate-tables:
	python scripts/populate_config.py
	npx sequelize-cli db:seed:all
	python scripts/api_config.py

unpopulate-tables:
	npx sequelize db:seed:undo 

reset-tables:
	docker-compose down
	docker-compose build
	docker-compose run --rm node npm install
	python scripts/populate_config.py
	npx sequelize db:migrate
	python scripts/api_config.py

