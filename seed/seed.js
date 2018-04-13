var mongoose=require('../config/config');
var Item=require('../models/item');

var _ = require( 'lodash' );
var cron = require('node-schedule');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: 'https://byjus.com/cbse-schools-madhya-pradesh/wp-json' });

function getAll( request ) {
  return request.then(function( response ) {
    console.log(response.length)
    if ( ! response._paging || ! response._paging.next ) {
      return response;
    }
    return Promise.all([
      response,
      getAll( response._paging.next )
    ]).then(function( responses ) {
      return _.flatten( responses );
    });
  });
}

getAll( wp.pages().perPage(5) ).then(function( pages ) {
for(var i=0;i<pages.length;i++)
{
        console.log('inside for loop....');
        var myobj={title:pages[i].title.rendered,link:pages[i].link,type:pages[i].type,id:pages[i].id,status:pages[i].status,content:pages[i].content.rendered,instance:'cbse-schools-madhya-pradesh'};
        var item=new Item(myobj);
        item.save().then((data)=>{
            console.log(data);
        },(err)=>{
            console.log(err);
        });
}
});




