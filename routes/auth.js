const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwttoken = require('jsonwebtoken');

const router = express.Router();
//Async Functions for L/S Page
async function checkcondtions( email, phone, password) {
    console.log(`"conditions check hit" ${email},${phone},${password}`);
    try {
        const confirmD = await Users.findOne({
            $or: [{ Email: email }, { Phone: phone }],
        });

        if (confirmD) {
            throw new Error('User Already Exist!');
        } 
         else if (password.length <= 4) {
            throw new Error('Passwords Length should be min 4 Digits');
        } 
        else {
            return true;
        }
    } catch (error) {
        console.error(`Error checking conditions: ${error.message}`);
        throw new Error(error.message); // Throw the dynamic error message
    }
}

async function loginvalidator(email , password) {
    console.log(`"conditions check hit" ${email} , ${password}`);
    try {
        const mailcheckuserdata = await Users.findOne({Email:email});
        console.log(mailcheckuserdata)
        if(mailcheckuserdata){
            const passcheck = await bcrypt.compare(password,mailcheckuserdata.Password);
            if(passcheck){
                return mailcheckuserdata;
            }
            else{
                throw new Error("Password is Incorrect Please Check Again!")
            }
        }
        else{
            throw new Error("User Doesnt Exist with this Email")
        }
    } catch (error) {
        console.error(`Error checking conditions: ${error.message}`);
        throw new Error(error.message)
    }
}

//Handlers
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { fname, lname, email, phone, password , usertype} = req.body;
    
    const UserT = (!usertype) ? false : true; //check if the user is present in the req or not if not then return false 
    console.log(`Sexy=> ${UserT}`); 
        // Check if any required field is empty
        if (!fname || !lname || !email || !phone || !password ) {
            return res.status(400).json({ 
                Message: 'Please fill out the form correctly. All fields are required.',
            });
        }
    //Bcrypt
    const hashed_password = await bcrypt.hash(password , 10);
    try {
        const conditionsres = await checkcondtions( email, phone, password);
        if (conditionsres) {
            const firstuser = await Users.create({ First_Name: fname, Last_Name: lname,  Email: email, Phone: phone, Password: hashed_password, IsPremium: false , IsRecruiter : UserT});
            const jwttokengen = jwttoken.sign(firstuser.toJSON() , "Samvirk" , {expiresIn:120})
            res.status(200).json({
                Message: 'User created successfully',
                jwttokengen
            });
        } else {
            res.status(400).json({
                Message: 'Conditions not met. User not created.'
            });
        }
    } catch (error) {
        res.status(400).json({
            Message: `Error creating user: ${error.message}`
        });
    }
});


router.post('/login' , async (req,res) =>{
    
        const {email , password} = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ 
                Message: 'Please fill out the form correctly. All fields are required.',
            });
        }
        console.log(email + password)
    try{
        const loguser = await loginvalidator(email,password);
        console.log(`log_user is : > ${loguser}`)
        if(loguser){
        const jwttokengen = jwttoken.sign(loguser.toJSON() , "Samvirk" , {expiresIn:1200})
        res.status(200).json({
            Message:'Login Successfull',
            jwttokengen
        });
    }else {
        res.status(400).json({
            Message: 'Conditions not met. User not created.'
        })}
    }catch(error){
        res.status(400).json({
            Message:`Error! Cannot Login. Error Message: ${error.message}` //This Message is very Important because the typo can cause headache in toastify
        })
    }
})

module.exports = router 