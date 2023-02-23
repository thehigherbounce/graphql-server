import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from "mongoose";
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema/index.js';
import resolverss from './resolvers/index.js';
import mutations from './mutations/index.js';
import bodyParser from "body-parser";

mongoose.connect('mongodb://localhost:27017/graphql_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongoose up'))
    .catch(error => console.log(error.message));
mongoose.Promise = global.Promise;

const app = express();
const httpServer = http.createServer(app);
const resolvers = {
    Query: {...resolverss},
    Mutation: {...mutations}
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
    '/',
    cors(),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`Server ready at http://localhost:4000`)