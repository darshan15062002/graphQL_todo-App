
#GraphQL Todo App
doc=>https://www.apollographql.com/docs/apollo-server/
Why GraphQL?

GraphQL solves the problem of over-fetching and under-fetching data. With REST APIs, you often have to request more data than you need, or you have to make multiple requests to get all the data you need. This can be inefficient and waste bandwidth.

GraphQL allows you to request exactly the data you need, in a single request. This can improve performance and reduce bandwidth usage.

# REST API
GET /todos

# GraphQL API
query {
  todos {
    id
    title
    completed
  }
}

The REST API will return all of the todos, even if you only need the title and completed status. The GraphQL API will only return the data that you requested.

GraphQL is also more flexible than REST APIs. It allows you to make complex queries that would be difficult or impossible to make with REST. For example, you could filter todos by status, priority, or due date.


to use graph database i am using Apollo server to connect graphQL server with nodejs 
