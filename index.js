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
    type Post {
        title: String
        body: String
    }
    input BlogPostContent {
        title: String
        body: String
        media: [MediaDetails!]
    }
    input MediaDetails{
        format: MediaFormat!
        url: String!
    }
    enum MediaFormat{
        IMAGE
        VIDEO
    }
    enum AllowedColor {
        RED
        GREEN
        BLUE
    }
    type Mutation {
        addBook(title: String, author: String): Book
        createBlogPost(content: BlogPostContent!): Post
        updateBlogPost(id: ID!, content: BlogPostContent!): Post
    }
    type Query {
        books: [Book]
        authors: [Author]
        favoriteColor: AllowedColor
        avatar(borderColor: AllowedColor): String
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
    },
    {
        title: 'City of Glass',
    }
];
const resolvers = {
    AllowedColor: {
        RED: '#f00',
        GREEN: '#0f0',
        BLUE: '#00f',
    },
    Query: {
        favoriteColor: () => '#f00',
        books: () => books,
        authors: ()=> authors
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.headers.authorizaton || ''

        const user = getUser(token)

        return { user }
    }
});
const { url } = await startStandaloneServer(server, {
    listent: {port: 4000}
});


console.log(`Server ready at: ${url}`)