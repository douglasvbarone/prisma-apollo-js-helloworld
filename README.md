A simple Prisma example using Apollo server.

## Requirements

* Node / NPM
* Docker & Docker compose (only for DB)

If you don't want to setup a DB with Docker, you can do it manually or use the branch [`'sqlite'`](https://github.com/douglasvbarone/prisma-apollo-js-helloworld/tree/sqlite).
## Usage
### Prepare
~~~
npm install
docker-compose up
npm run migrate
~~~

### Run
~~~
npm run dev
~~~

Access Playground at http://localhost:4000/

### Build
~~~
npm run build
~~~