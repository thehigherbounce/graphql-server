import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
    type Book {
        title: String
        author: Author
    }
    type Author {
        name: String
        books: [Book]
    }
    type Query {
        books: [Book]
        authors: [Author]    
    }
`;
const authors = [
    {
        name: 'Kate Chopin',
    },
    {
        name: 'Paul Auster',
    }
];
const books = [
    {
        title: 'The Awakening',
        author: authors[0]
    },
    {
        title: 'City of Glass',
        author: authors[1]
    }
];
const resolvers = {
    Query: {
        books: () => books,
        authors: ()=> authors
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listent: {port: 4000}
});

console.log(`Server ready at: ${url}`)