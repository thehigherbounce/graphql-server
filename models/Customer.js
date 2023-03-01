import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    uint: {
        type: String
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;