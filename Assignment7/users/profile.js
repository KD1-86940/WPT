const express=require('express');
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

router.get("/",(request,response)=>
{
    var tokan = request.headers["authorization"]?.split(' ')[1];
            var decodedTokan=jwt.verify(tokan,"123");
            console.log("Pohoch gya tokan");
            var connection=mysql.createConnection(connectionDetails);
            connection.connect();
            const querytext=`SELECT * FROM user WHERE email = '${decodedTokan.email}'`;
            connection.query(querytext,(error,result)=>{
                var u_result={
                "status" : "ho gya bhai check",
                "data"   : result
                };
            response.write(JSON.stringify(u_result));
            response.end();
            });
});

router.post("/",(request,response)=>
{
    var tokan = request.headers["authorization"]?.split(' ')[1];
            var decodedTokan=jwt.verify(tokan,"123");
            var connection=mysql.createConnection(connectionDetails);
            connection.connect();
            console.log(request.body.firstName);
            const querytext=`UPDATE user
                  SET firstName = '${request.body.firstName}',
                  lastName = '${request.body.lastName}',
                  phoneNumber = '${request.body.phoneNumber}'
                  WHERE email = '${decodedTokan.email}'`;
            connection.query(querytext,(error,result)=>{
                console.log(result);
                var u_result={
                "status" : "update hogya record",
                "data"   : result
                };
            response.write(JSON.stringify(u_result));
            response.end();
            });
});

module.exports=router;