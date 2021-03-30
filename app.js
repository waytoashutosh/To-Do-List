const express = require("express");
const bodyParser = require("body-parser");

const app = express();
port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,function(){
    console.log("To do list server is running.");
})

let item=[];

let options = { weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' };
let today  = new Date();

let day = today.toLocaleDateString("en-US", options);
app.set('view engine', 'ejs');

app.get('/', function(req, res){

    res.render("list",{whichday:day, itemList:item});


})

app.post('/', function(req, res){
    item.push(req.body.nextThing);
    console.log(item);
    res.redirect("/");
})

