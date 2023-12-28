const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        default: '', // You can set a default value if needed
    },
    jobPosition: {
        type: String,
        required: true,
    },
    monthlySalary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['part-time', 'full-time'], // Options for job type
        required: true,
    },
    remoteOrOffice: {
        type: String,
        enum: ['wfh', 'office'], // Options for remote/office
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true,
    },
    skills: {
        type: [String], // Array of strings for skills
        default: [], // Default empty array
    },
    info: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData', //Main topic how to cconnect 2 database with eachother and how to use populate that we ll study in next commit
        required:true,
      }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
