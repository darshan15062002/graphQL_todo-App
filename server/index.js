const express = require("express")
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const { startStandaloneServer } = require('@apollo/server/standalone');
const axios = require("axios")

const { USER, TODO } = require('./user')

async function startServer() {
    const app = express()
    // Every GraphQL server (including Apollo Server) uses a 
    // schema to define the structure of data that clients can query.
    const server = new ApolloServer({
        typeDefs: `
        type User{
            id:ID!
            name:String!
            username:String!
            email:String!
            phone:String
            website:String

        }
        type Todo{
            id:ID!
            title:String!
            completed:Boolean
            user:User
        }
        type Query{
            getAllTodos:[Todo]
            getAllUsers:[User]
            getUserById(id:ID!):User
        }`,
        resolvers: {
            Todo: {
                // user: async (a) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${a.id}`)).data
                user: (a) => USER.find((item) => item.id == a.id)
            },
            Query: {
                // getAllTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                getAllTodos: () => TODO,
                // getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getAllUsers: () => USER,

                // getUserById: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
                getUserById: (parent, { id }) => USER.find((item) => item.id == id)
            },
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