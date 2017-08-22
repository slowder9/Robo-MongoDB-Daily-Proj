const express = require("express");
const mustache = require("mustache-express");
const mongo = require("mongodb").MongoClient;
const bodyparser = require("body-parser");
//require the data file
let data = require('./public/data');

const server = express();

server.use(express.static('public'))

server.engine("mustache", mustache ());
server.set("views", "./views");
server.set("view engine", "mustache");

// //require the data file
// let data = require("'./public/data");

mongo.connect("mongodb://localhost:27017/test", function (err, db) {
	let robots = db.collection("robots");

//list all of the robots
server.get("/", function (req, res){
  //get data from mongo
  //list it using mustache
robots.find().toArray().then(function (robots) {
    res.render("robots", {
      noms: robots, 
  //we can now use "robots" in our mustache template
  	});
  });
});

server.get("/nojob", function (req, res) {
	robots.find({ job: null }).toArray().then(function (robots) {
		res.render("robots", {
			noms: robots,
		});
	});
});


// server.post("/search", function (req, res){
//   const query = req.body.search_text;
//   //using a "regular expression" here - we'll talk about in detail later, big idea is to find string that include substring "query"
// robots.find({ name: new RegExp(query) }).toArray().then(function (items){
//          res.render("robots", {
//          noms: robots, 
//     });
//   });
// });//search_text comes from "name" in mustache doc

server.listen(3011);
	console.log("hey hey")
});

//type in db.robots.find() in terminal and data should pop up


