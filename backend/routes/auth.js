const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
    // Check whether the user with this email exist already
    try{
   
    let user =await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({error: 'Sorry with this email already exist'})
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email, 
      password: req.body.password,
    })
    
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    //  res.json({error: 'Please enter unique value',
    //  message:err.message})});
    res.json({user})    
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }

  });

module.exports = router;
