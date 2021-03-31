const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");

const app = express();
port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(port,function(){
    console.log("To do list server is running.");
})

// let item=[];

mongoose.connect("mongodb://localhost:27017/toDoListDB",{useNewUrlParser:true});

const db = mongoose.connection;

const itemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model('Item', itemSchema);


let defaultItems =[];
let workItems=[];



app.set('view engine', 'ejs');
app.get('/', function(req, res){

    Item.find({}, function(err, foundItems){

        res.render("list",{whichday:date.getDate(), itemList:foundItems, PageName:"Home"});
    })
   


})

app.post('/', function(req, res){

    if(req.body.button == "Home"){
        let itemx = new Item({name:req.body.nextThing});
     
        itemx.save(function(err,item){
        if(err){
            console.log(err);

        }
        else{

            console.log("Successful insertion of "+item.name);
        }

        });

        res.redirect("/");
    }
    else if(req.body.button == "Work"){
        let itemx = new Item({name:req.body.nextThing});
        workItems.push(itemx);
        Item.insert(workItems, function(err){
        if(err){
            console.log(err);

        }
        else{
            console.log("Successful insertion of new item");
        }

        });


        res.redirect("/work");
    }
    
})

let workitems=[];
app.get('/work', function(req,res){
    res.render("list",{whichday:date.getDate(), itemList:workitems, PageName:"Work"});
})


app.get('/about',function(req,res){
    res.render("about");
})
app.post('/delete',function(req, res){
    console.log(req.body);
    Item.deleteOne({name:req.body.checkbox}, function(err,result){
        if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
    });
    res.redirect("/");
})

