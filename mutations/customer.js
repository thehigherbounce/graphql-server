import Customer from "../models/Customer.js";
import mongoose from "mongoose";

export default {
    createCustomer: async (_, { firstName, lastName, address, uint }, req) => {
        console.log(firstName, lastName, address, uint)
        try {
            let customer = new Customer({
                _id: new mongoose.Types.ObjectId,
                firstName: firstName,
                lastName: lastName,
                address: address,
                uint: uint
            });
            let result = await customer.save();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}