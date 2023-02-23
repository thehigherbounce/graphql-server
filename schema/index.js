export const typeDefs = `#graphql
    type Book {
        title: String
        author: Author
    }
    type Customer {
        _id: ID!
        firstName: String
        lastName: String
        address: String
        uint: String
    }
    type Author {
        name: String
    }
    type Query {
        books: [Book]
        customers: [Customer]
    }
    type Mutation {
        createCustomer(firstName: String!, lastName:String!, address:String!,uint:String):Customer!
    }
`;