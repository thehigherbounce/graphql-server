import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './schema/index.js';
import bodyParser from "body-parser";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await server.start();
app.use(
    '/',
    cors(),
    bodyParser.json({limit: '50mb'}),
    expressMiddleware(server, {
        context: async ({req}) => ({token: req.headers.token}),
    }),
);

await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`Server ready at http://localhost:4000`)