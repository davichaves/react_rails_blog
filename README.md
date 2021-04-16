# README

- Ruby version:

  2.7.3

- Rails version:

  6.0.3.6

- Running

Make sure you have the same ruby version in your local machine. Use rvm or rbenv if needed.

clone the repo and run the following commands:

```shell
bundle install
rails db:create
rails db:migrate
rails db:seed
```

Then you need to add an API key for the news API. I'm sending a .env with my submission. but if you need one send an email to 95.davi@gmail.com

once you add the API key just run

```shell
rails s
```

then go to http://localhost:3000 to see the live app.

- Database creation

```shell
rails db:create
rails db:migrate
```

- Database initialization

```shell
rails db:seed #add 9 posts
```

- How to run the test suite

```shell
rails test
```

- Linter

using eslint with prettier.

file is .eslintrc.js

```shell
yarn run eslint
```

- Deployment instructions

reployed to heroku using command line tools using the following commands

```shell
 heroku login
 heroku git:remote -a [APP_NAME]
 git push heroku master
 heroku run rake db:migrate
 heroku run rake db:seed #add 9 posts
```

[demo link](https://blog-rails-react-dc.herokuapp.com/)
