const express=require('express');
const mysql=require('mysql2');
const jwt=require("jsonwebtoken");

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
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`select * from bookings`;
    connection.query(querytext,(error,result)=>{
        response.setHeader("Content-Type","application/json");
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

router.post("/",(request,response)=>
{
     var tokan = request.headers["authorization"]?.split(' ')[1];
    var decodedTokan=jwt.verify(tokan,"123");
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    console.log(decodedTokan.id);
    const querytext=`INSERT INTO bookings (
    userId,
    propertyId,
    total,
    fromDate,
    toDate
) VALUES (
    ${decodedTokan.id},
    ${request.body.propertyId},
    '${request.body.total}',
    '${request.body.fromDate}',
    '${request.body.toDate}'
);`
    connection.query(querytext,(error,result)=>{
        response.setHeader("Content-Type","application/json");
        if(error==null)
        {
            response.write(JSON.stringify(result));
        }
        else{
            response.write(JSON.stringify(error));
        }
        response.end();
    });
});

module.exports=router;