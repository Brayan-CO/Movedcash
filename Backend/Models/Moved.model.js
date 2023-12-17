const mongoose = require("mongoose");

const movedSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    })

const MovedModel = mongoose.model("moved", movedSchema);
module.exports = MovedModel;