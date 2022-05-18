const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
    const app = express();

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers 
    });

    
    await server.start();
    server.applyMiddleware({ app });
    app.use((req, res) => {
      res.send('Hello from express apollo server');
    });
    await mongoose.connect('mongodb://localhost:27017/post_db', { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     });
     console.log('Mongoose connected..')

    app.listen(4000, () => 
        console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();