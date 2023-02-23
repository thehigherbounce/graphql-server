import Customer from "../models/Customer.js";
import mongoose from "mongoose";

export default {
    customers: async () => {
        try {
            let result = await Customer.find({});
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}