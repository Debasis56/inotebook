const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Debasisagoodboy'
var jwt = require('jsonwebtoken');
//Route 1:
//Create a user using: POST "/api/auth/createuser". Doesn't require auth

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res)=>{
    let success = false;
    // obj = {
    //     a: 'thios',
    //     number: 34
    // }
    // res.json(obj)
    

    //If there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try{
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }
    const salt =await bcrypt.genSalt(10);

    const secPassword = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      })
      const data = {
          user:{
              id: user.id
          }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      //localStorage.setItem('token', authToken);
      //console.log(jwtData);
    //   .then(user => res.json(user)).catch(err=>{console.log(err)
    //    res.json({error: 'Please enter a unique value for email', message: err.message})})


    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    success = true;
    res.json({success, authToken});
    //catch errors
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route2:
//Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',[
   // body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials."})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials."})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //localStorage.setItem('token', authToken);
        success = true;
        res.json({success, authToken})

    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }


})


//Route 3: get logged in User details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res)=>{

try{
    userId  = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
}
 })

module.exports = router