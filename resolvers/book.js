import Customer from "../models/Customer.js";
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
export default {
    books: async () => {
        let result = await Customer.insertMany([
            {
                name: 'Abase',
                email: 'test@gmail.com',
            }
        ]);
        console.log(result);
        return result;
    }
}