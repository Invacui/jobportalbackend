const Job = require('../models/Jobprop');

async function fetchEData() {
    try {
        console.log(`Fetched User's Jobs Successfully!`)
        return await Job.find({})
    } catch (error) {
        console.log(`Something went wrong in Data Fetching, Error Message: ${error} `)
    }
}

module.exports = { fetchEData }