const express=require('express');
const mysql=require('mysql2');

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
    // response.write("register");
    // response.end();
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`INSERT INTO user (firstName, lastName, email, 
    password, phoneNumber, isDeleted, createdTimestamp) VALUES
    ('${request.body.firstName}', '${request.body.lastName}', 
    '${request.body.email}', '${request.body.password}', 
    '${request.body.phoneNumber}', 0, NOW())`;
    connection.query(querytext,(error,result)=>{
        response.setHeader("Content-Type","application/json");
        console.log(result);
        console.log(error);
        if(error==null)
        {
            var u_result={
                "status" : "Success",
                "data"   : result
            };
            response.write(JSON.stringify(u_result));
        }
        else{
            response.write(JSON.stringify(error));
        }
        response.end();
    });
});

module.exports=router;