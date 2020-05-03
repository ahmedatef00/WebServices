var express = require("express");
var app = express();
const bodyparser = require('body-parser');
const db = require('./db');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/students',(req,res,next)=>{

    res.status(200).send({
        success:true,
        message:"Retrived Succesflly",
        db,
    })
})

   app.post('/student',(req,res,next)=>{
       console.log("Request.body",req.body);
       if(!req.body.name){
           return res.status(400).send({
               success:false,
               message:"name is required"
           })
       }
       const Student={
        id:db.length+1,
        name:req.body.name,
        age:req.body.age,
        courses:req.body.courses,
        married:req.body.married
    }
       db.push(Student);
       console.log("DB",db);
       
       res.status(201).send({
        success:'true',
        message:'Students added successfully',
        Student,

       })
   })

   app.get("/student/:id", (req, res, next) => {
    const id = parseInt(req.params.id,10);
    console.log("id:",id);
    
    db.map((student)=> {
        if(student.id==id){

        return res.status(200).send(
            {
            success:'true',
            message:'Student retrevied successfully',
            student,        
            });

        }
          

       });

            
       return res.status(404).send({
           success:'flase',
       message:'Student retrevied failed',
       })
       
    })
   
   app.delete('/student/:id',bodyparser.json(),(req,res,next)=>{
const id = parseInt(req.params.id,10);
db.map((student,index)=>{
    if (student.id===id) {
        db.splice(index,id);
        return res.status(200).send({
            success: 'true',
         message: 'student deleted successfuly',

        })
    }
})    
})

app.put('/student/:id',(req,res,next)=>{
    const id = parseInt(req.params.id,10);
    let studentFound;
    let studentIndex;
    console.log("ID",id);
    
        db.map((student,index)=>{
        if(student.id==id){
            studentFound=student
            studentIndex=index;
            console.log("studentFound,studentIndex",studentFound,studentIndex);
            
        }
    })

        if (!studentFound) {
            res.status(201).send({
                success: 'false',
                 message: 'student Not  Found',
            
                    
            })
        }
        const updatedStudent = {
            id: studentFound.id,
            name: req.body.name || studentFound.name,
            age: req.body.age || studentFound.name,
            courses:req.body.courses||studentFound.courses,
            married:req.body.married||studentFound.married,
          };
        db.splice(studentIndex,1,updatedStudent);
        res.status(201).send({
        success: 'true',
         message: 'student Updated successfuly',
        updatedStudent, 
            
    })
        

})
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

