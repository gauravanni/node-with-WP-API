var post=require('./post/insert');
var updatePost=require('./post/update');
var delPosts=require('./post/delete');

var cron = require('node-schedule');

var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: 'https://byjus.com/cbse-schools-madhya-pradesh/wp-json' });
//wp.setHeaders('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYnlqdXMuY29tXC9zdGFnaW5nLWNoZW1pc3RyeSIsImlhdCI6MTUyMzM2MTc2OSwibmJmIjoxNTIzMzYxNzY5LCJleHAiOjE1MjM5NjY1NjksImRhdGEiOnsidXNlciI6eyJpZCI6IjYyIn19fQ.cfWTNJG-XCVMGucT-iUmupGz2BKpm3URrJGNrGVabdc');

app.get('/',(req,res)=>{
	// crud operations
	var date=new Date(2018,3,12,19,33,0);
	cron.scheduleJob(date,()=>{
		post.insert(wp.posts().perPage(20),wp.pages().perPage(20),res);
		updatePost.update(wp.posts(),wp.pages());
		//delPosts.delPosts(wp.posts(),wp.pages());
	});
});

app.listen(5000,()=>{
	console.log('port started at 5000');
});
