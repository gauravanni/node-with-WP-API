var post=require('./post/insert');
var updatePost=require('./post/update');
var delPosts=require('./post/delete');

var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'https://byjus.com/staging-chemistry/wp-json' });
wp.setHeaders('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYnlqdXMuY29tXC9zdGFnaW5nLWNoZW1pc3RyeSIsImlhdCI6MTUyMzM2MTc2OSwibmJmIjoxNTIzMzYxNzY5LCJleHAiOjE1MjM5NjY1NjksImRhdGEiOnsidXNlciI6eyJpZCI6IjYyIn19fQ.cfWTNJG-XCVMGucT-iUmupGz2BKpm3URrJGNrGVabdc');

	app.get('/',(req,res)=>{
		try
		{
			// crud operations
			//post.insert(wp.posts().perPage(20),wp.pages().perPage(20));
			//updatePost.update(wp.posts(),wp.pages());
			delPosts.delPosts(wp.posts(),wp.pages());
		}
		catch (err) {
			res.status(500).send({
				success: false,
				message: "Something2 went wrong"
			})
		}
		
		
	});




app.listen(5000,()=>{
	console.log('port started at 5000');
});
