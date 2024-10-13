const express=require('express');
const mysql=require('mysql2');
const utils=require('utils');
const multer=require('multer');
;
const upload=multer({dest: 'images'})
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
    id,
    title,
    details,
    image from category`;
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
    connection.end();
});

router.post("/",upload.single('icon'),(request,response)=>
{
    const filename=request.file.filename;
    var connection=mysql.createConnection(connectionDetails);
    connection.connect();
    const querytext=`INSERT INTO category (
    title,
    details,
    image
) VALUES (
    '${request.body.title}',
    '${request.body.details}',
    '${filename}'
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
    connection.end();
});

module.exports=router;