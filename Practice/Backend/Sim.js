const router=require("express").Router();//use to defined the routes of a file
const mongoose=require('mongoose')//library to connect database mongodb
const Joi = require("joi");//to check validation of input-like email hai to @hai ya nhi
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");//check krta h [passowrd ki length
const { User,validate1 } = require("./Model/user");//to get userschema from user.js
const { v4: uuidv4 } = require('uuid');




router.post('/simran',async(req,res)=>{
    const { Name, Email,Password } = req.body;
    try {
      
     
      
      const { error } = validate1({Name, Email,Password });
      
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
    
      const user = await User.findOne({ Email: req.body.Email });
     
  
      if (user) {
        return res.status(409).send({ message: "User with given email already exists!" });
      }
  
     
  
      const salt = await bcrypt.genSalt(Number(process.env.SALT));// bcrypt ka means coverting krwani hota h gensalt ka mtlb means password ko kitne number tk rakhna h
     
  
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      
  
      const newUser = new User({ ...req.body, Password: hashedPassword,});//...sari properties jo input se ayi h wo save ho jaye
      await newUser.save();
  
      
  
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  const validate3 = (data) => {
    const schema = Joi.object({
      Email: Joi.string().email().required().label("Email"),
      Password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };
  router.post("/Login", async (req, res) => {
    try {
    
      const { error } = validate3(req.body);
      
      if (error)
        return res.status(400).send({ message: error.details[0].message });
  
      const user = await User.findOne({ Email: req.body.Email });
      
      if (!user)
      
        return res.status(401).send({ message: "Invalid Email or Password" });
  
      const validPassword = await bcrypt.compare(
        req.body.Password,//input passowrd
        user.Password//database mein saved h
      );
   
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });
      const token = user.generateAuthToken();//
     
      
      res.status(200).send({ data: token, message: "logged in successfully" }
      );
      
    
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

 



  router.get('/userId/:id',async(req,res)=>{
    const sim=req.params.id
    console.log(sim)
    const user=await User.findById(sim)//await hum isliye lgate waiting ke liye dekh rhe h wait krte h kya result aat h
console.log(user)
res.json(user)
  })
  const schema1 = new mongoose.Schema({
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
   
    
  });
 
  const userSchema = new mongoose.Schema({
    name: String,
    addedDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'active'
    }
  });
  
  const User = mongoose.model('User', userSchema);
  // Add a new user
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Add a new user
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'Deleted user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  
  router.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
  });
  
  const schema2 = mongoose.model('schema2', schema1);


  


    

   
         
        
        
      
         
          

// CORS headers middleware


// Endpoint to handle form submission

         

  module.exports=router
