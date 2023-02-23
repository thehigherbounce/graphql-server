import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
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

export default mongoose.model('Customer', customerSchema);