const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new"
    },
    notes: {
      type: [String],
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Lead", leadSchema);
