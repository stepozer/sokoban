# Play Sokoban Puzzles Online

A version of the classical Sokoban game (http://en.wikipedia.org/wiki/Sokoban).

Site located here: [http://sokoban.venegrec.com](http://sokoban.venegrec.com)

# How to install

* Clone repository
* Install frontend:

```console
cd /frontend
npm install
node_modules/bower/bin/bower install
node_modules/webpack/bin/webpack.js
```

* Install backend:

```console
cd /backend
cp .env.example .env
bundle
bundle exec rake db:migrate
bundle exec rake dev:import_levels
rails s
```
* Go to URL [http://localhost:3000](http://localhost:3000)
