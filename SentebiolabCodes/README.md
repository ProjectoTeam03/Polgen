# Genetic Sipariş Uygulaması


# Migration ve Demo Girdi Dosyaları
$ node_modules/.bin/sequelize migration:generate --name <table_name>

$ node_modules/.bin/sequelize seed:generate --name <table_name>

## Çalıştırma
$ node_modules/.bin/sequelize db:migrate

$ node_modules/.bin/sequelize db:seed

## Geri alma
$ node_modules/.bin/sequelize db:seed:undo:all

$ node_modules/.bin/sequelize db:migrate:undo:all