const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'appleorange$oy';

// create a User: POST"/api/auth/createuser". No login required
router.post("/createuser",
  [
    body("name",'Enter valid name').isLength({ min: 3 }),
    body("email",'Enter valid email').isEmail(),
    body("password",'password must be at least 5 character').isLength({ min: 5 }),
  ],
  async(req, res) => {
    // If there are errors, Return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      // Check whether the user with this email exist already
   
    let user =await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({error: 'Sorry with this email already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    // create new user
    user = await User.create({
      name: req.body.name,
      password: secPass, 
      email: req.body.email,
    })
    const data = {
      user:{
        id: user.id
      }
    }
   const authtoken = jwt.sign(data,JWT_SECRET);

    // res.json(user)
    res.json({authtoken})

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }

  });

  //Authenticate a user using: POST "api/auth/login". No login required
  router.post("/login",
  [
    body("email",'Enter valid email').isEmail(),
    body("password",'Password cannot be blank').exists(),
    ], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {email,password} = req.body;
    try {
      let user =await User.findOne({email})
      if(!user){
        return res.status(404).json({error: "Please try to login with correct Credentials"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(404).json({error: "Please try to login with correct Credentials"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      res.send(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  })
module.exports = router;
