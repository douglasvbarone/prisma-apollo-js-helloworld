const { server } = require('./server')

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  
