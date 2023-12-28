const jwt = require('jsonwebtoken');
const Users = require('../models/Users')
const IsLoggedIn = async (req, res, next) => {
    try {
        console.log("User found++++++++++++++++:.")
        const jwttoken = req.headers.jwttoken; // Corrected typo in req.header.jwttoken
        console.log(jwttoken)
        if (!jwttoken) {
            return res.status(401).json({ //return the status to get to display it ******* Important ******
                Message:"No_token provided"
            })
        }

        const decoded = jwt.verify(jwttoken, "Samvirk");
               
        const user = await Users.findById(decoded._id);  // Fetch user details from the database based on the decoded token
        req.user = user; // Attach the decoded user to the request object This line attaches the user object obtained from the database to the req (request) object.
        next();
    } catch (err) {
        console.error("IsLoggedIn error:", err);
        res.status(401).json({
            Message: "Authentication failed"
        });    }
};

module.exports = IsLoggedIn;
