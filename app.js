var post=require('./post/insert');
var updatePost=require('./post/update');
var delPosts=require('./post/delete');

var cron = require('node-schedule');

var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port=process.env.PORT || 5000;

var WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: 'https://byjus.com/cbse-schools-madhya-pradesh/wp-json' });
wp.setHeaders('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYnlqdXMuY29tXC9jYnNlLXNjaG9vbHMtbWFkaHlhLXByYWRlc2giLCJpYXQiOjE1MjM2MDE2OTYsIm5iZiI6MTUyMzYwMTY5NiwiZXhwIjoxNTI0MjA2NDk2LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIzIn19fQ.BUqRUX99UjrbFdU7Y7eB2XUDEL_doAqwOqlaYz6a9mw');

var currDate=new Date();
var year=currDate.getFullYear();
var month=currDate.getMonth();
var days=currDate.getDate();
console.log(`year= ${year} month=${month} days=${days}`);
app.get('/',(req,res)=>{
	// cron job
	var date=new Date(`${year},${month},${days},21,30,0`);
	cron.scheduleJob(date,()=>{
		post.insert(wp.posts().perPage(20),wp.pages().perPage(20));
		updatePost.update(wp.posts(),wp.pages());
		delPosts.delPosts(wp.posts(),wp.pages());
	});
});

app.listen(port,()=>{
	console.log(`server started at port ${port}`);
});