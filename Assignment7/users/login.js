const express=require('express');
const { token } = require('morgan');
const mysql=require('mysql2');
const jwt=require("jsonwebtoken")

var router=express.Router();
const connectionDetails={
    host:"localhost",
    post:3306,
    user:"root",
    password:"manager",
    database:"airbnb_db"
}

router.post("/",(request,response)=>
{
    // response.setHeader("Content-Type","application/json");
    // response.write("login");
    // response.end();
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`SELECT * FROM user WHERE email = '${request.body.email}' `;
    console.log(request.body);
    connection.query(querytext,(error,result)=>{
        response.setHeader("Content-Type","application/json");
        if(error==null)
        {
            console.log(result[0].password);
            console.log(request.body.password);
            if(result[0].password==request.body.password)
            {
                var u_result={
                "status": "Success",
                "token" : "Something here",
            }
            u_result.token=jwt.sign(
                    {
                        email:result[0].email,
                        password:result[0].password
                    },"123");
            }
            else{
                var u_result={
                "status" : "Error",
                "token"   : "Nothing here",
            };
            } 
            response.write(JSON.stringify(u_result));
            response.end();
        }
        else{
            console.log(error);
            var u_error={
                "status" : "Error",
                "token"   : "Nothing here"
            };
            response.write(JSON.stringify(u_error));
        }
        response.end();
    });
});

module.exports=router;