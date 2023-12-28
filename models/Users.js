const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    IsRecruiter:{
        type:Boolean,
        required:true,
    },
    IsPremium: {
        type: Boolean,
        required: true,
    },
    jobsPosted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
      }],
});

module.exports = mongoose.model("UserData", UsersSchema);
