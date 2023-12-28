const express = require('express');
const Job = require('../models/Jobprop');

const jobController = express.Router();

jobController.post('/search', async (req, res) => {
  try {
    console.log(req.body)
    const { jobPosition, skills } = req.body;
    let query = {};

    if (jobPosition) {
      query.jobPosition = jobPosition;
    }

    if (skills && Array.isArray(skills) && skills.length > 0) {
      // Use $all to match jobs that contain all selected skills
      query.skills = { $all: skills };
    }

    const jobs = await Job.find(query).limit(3);
    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = jobController;
