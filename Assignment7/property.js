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

router.get("/",(request,response)=>
{
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`select 
    categoryId,
    title,
    details,
    rent,
    profileImage
    from property`;
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
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`INSERT INTO property (
    categoryId,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
    profileImage
) VALUES (
    ${request.body.categoryId},
    '${request.body.title}',
    '${request.body.details}',
    '${request.body.address}',
    '${request.body.contactNo}',
    '${request.body.ownerName}',
    ${request.body.isLakeView},
    ${request.body.isTV},
    ${request.body.isAC},
    ${request.body.isWifi},
    ${request.body.isMiniBar},
    ${request.body.isBreakfast},
    ${request.body.isParking},
    ${request.body.guests},
    ${request.body.bedrooms},
    ${request.body.beds},
    ${request.body.bathrooms},
    ${request.body.rent},
    null
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