const express = require("express")
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const { startStandaloneServer } = require('@apollo/server/standalone');
const axios = require("axios")

async function startServer() {
    const app = express()
    // Every GraphQL server (including Apollo Server) uses a 
    // schema to define the structure of data that clients can query.
    const server = new ApolloServer({
        typeDefs: `
        type Todo{
            id:ID!
            title:String!
            completed:Boolean
        }
        type Query{
            getTodos:[Todo]
        }`,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get("")).data,
            }
        }
    }

    )


    app.use(bodyParser.json)
    app.use(cors())


    // await server.start()

    // app.use('/graphql', expressMiddleware(server))

    // app.listen(4000, () => {
    //     console.log("GraphQl server runing on 4000");
    // })
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

startServer()