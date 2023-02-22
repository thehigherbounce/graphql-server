import { countries } from "./data.js";
export const typeDefs = `#graphql
    type Book {
        title: String
        author: Author
    }
    type Author {
        name: String
        books: [Book]
    }
    type Country {
        name: String
        code: String
    }
    type Query {
        books: [Book]
        authors: [Author]
        countries: [Country]
    }
`;
export const resolvers = {
    Query: {
        books: () => books,
        countries: () => countries,
        authors: () => authors,
    }
}