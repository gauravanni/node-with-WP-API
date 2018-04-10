var post=require('./post/post');
var mcache = require('memory-cache');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _ = require( 'lodash' );

var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'https://byjus.com/staging-chemistry/wp-json' });

wp.posts()
  .param('modified_after','2018-04-10T00:00:00')
  .then((data)=>{
    console.log('first',data);
  }).catch((err)=>{
    console.log(err)
  })


app.listen(8000,()=>{
  console.log('port started at 8000');
})




