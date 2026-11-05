const express = require('express');
//package for file upload functionality
const fileUpload=require('express-fileupload');

const app=express();

//fileUpload as a middleware
app.use(fileUpload());

//upload request handling
app.post("/upload",function(req,res){

//when file has been uploaded
if(req.files && Object.keys(req.files).length!==0){

    //uploaded file
    const uploadedFile=req.files.uploadFile;

    //logging uploading file
    console.log(uploadedFile);

    //upload path
    const uploadPath=__dirname + "/uploads/" + uploadedFile.name;

    //to save file using mv() function

     uploadedFile.mv(uploadPath,function(err){
        if(err){
            console.log(err);
            res.send("Failed!");
        }else res.send("Successfully Uploaded!");

     });

}else res.send("No file uploaded!!"); 

});


//Handling download file request
app.get('/download',function(req,res){

   //the res.download() taking filepath to be downloaded
   res.download(__dirname + "/download_gfg.txt",function(err){
    if(err){
        console.log(err);
    }
   });
});


//get req to root of app
app.get('/',function(req,res){
//sending index.html as res to client
res.sendFile(__dirname + "/index.html");
});


// Makes app listen to port 3000
app.listen(3000, function (req, res) {
  console.log("Started listening to port 3000");
});