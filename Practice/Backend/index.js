require('dotenv').config()
const express=require('express');
const app=express();

const port= 5000;
const database=require('./db')
database();
const sign=require('./Sim')

const bodyParser = require('body-parser');
const cors=require('cors')
app.use(cors({}))
app.use(express.json());                                                                                                          
app.use(bodyParser.json())
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '73790928133-suk88f55p624r77bnohl5iv3l6g3tjtm.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Endpoint for handling the Google login callback

app.use('/sign',sign)

app.listen(port,function(){
    console.log(`server listening on port ${port}`)
});