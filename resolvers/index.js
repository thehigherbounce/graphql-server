import bookResolver from './book.js';
import customerResolver from './customer.js';

const rootResolver = {
    ...bookResolver,
    ...customerResolver
};
export default rootResolver;