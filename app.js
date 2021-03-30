const express = require("express");
const bodyParser = require("body-parser");

const app = express();
port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
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

    res.render("list",{whichday:day, itemList:item, PageName:"Home"});


})

app.post('/', function(req, res){

    if(req.body.button == "Home"){
        item.push(req.body.nextThing);
        console.log("Home");
        console.log(item);
        res.redirect("/");
    }
    else if(req.body.button == "Work"){
        workitems.push(req.body.nextThing);
        console.log("Work");
        console.log(workitems);
        res.redirect("/work");
    }
    
})

let workitems=[];
app.get('/work', function(req,res){
    res.render("list",{whichday:day, itemList:workitems, PageName:"Work"});
})


