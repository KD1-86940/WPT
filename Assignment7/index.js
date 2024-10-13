const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const multer=require('multer');
const jwt=require('jsonwebtoken');
const cryptojs=require('crypto-js');
const morgon=require('morgan');
const upload=require('upload');
const utils=require('utils');

const appViaUserRegister = require('./users/register');
const appViaUserLogin = require('./users/login');
const appViaUserProfile = require('./users/profile');
const appViaUserProperty = require('./property');
const appViaUserCategory = require('./category');
const appViaUserBooking = require('./booking');

const connectionDetails={
    host:"localhost",
    post:3306,
    user:"root",
    password:"manager",
    database:"airbnb_db"
}

const app=express();
app.use(cors());
app.use(express.json());

app.use((request,response,next)=>
{
    var tokan = request.headers["authorization"]?.split(' ')[1];
    if(tokan!=undefined)
        {
            var temp;
            var decodedTokan=jwt.verify(tokan,"123");
            console.log("Pohoch gya tokan");
            var connection=mysql.createConnection(connectionDetails);
            connection.connect();
            const querytext=`SELECT * FROM user WHERE email = '${decodedTokan.email}'`;
            connection.query(querytext,(error,result)=>{
            console.log(result);
            if(result[0]!=null)
            {
                if(decodedTokan.email==result[0].email)
                {
                    next();
                }
            }
            else{
                var u_result={
                "status" : "chal chal awe",
                "data"   : result
                };
                response.write(JSON.stringify(u_result));
                response.end();
            }
            });
        }
        else{
                var reply={
                "status" : "tokan kahan hain",
                "data"   : "login karke aa"
                };
                response.setHeader("Content-type","application/json");
                response.write(JSON.stringify(reply));
                response.end();
            }
});

app.use("/users/login",appViaUserLogin);
app.use("/users/register",appViaUserRegister);
app.use("/users/profile",appViaUserProfile);
app.use("/property",appViaUserProperty);
app.use("/category",appViaUserCategory);
app.use("/booking",appViaUserBooking);

app.listen(9999, ()=>{console.log("server started at port 9999")});
