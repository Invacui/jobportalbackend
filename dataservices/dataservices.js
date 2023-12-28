const Users = require('../models/Users');

async function fetchEData() {
    try {
        await Users.find({})
        console.log(`Fetched User's Data Successfully!`)
    } catch (error) {
        console.log(`Something went wrong in Data Fetching, Error Message: ${error} `)
    }
}

module.exports = {fetchEData}