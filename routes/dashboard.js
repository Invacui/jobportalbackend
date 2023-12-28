const express = require('express');
const IsLoggedIn = require("../middleware/authcheck");
const jobdata = require("../dataservices/fetch_jobs")

const dash = express.Router();
//Dashboard====>
dash.get('/dashboard', async (req,res) =>{
    try {
        const datajob = await jobdata.fetchEData();
        res.status(200).json({
            Message:"Pulled data !!",
            datajob
        })
    } catch (error) {
        console.error(`Error in data fetching:`, error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = dash