var mongoose=require('../config/config');
var Item=require('../models/item');

var insert=function(posts,pages){
    
// insert posts
posts
    .then((data)=>{
            console.log('inserting posts....');
            fetchMysql(data);
        }).catch((err)=>{
            console.log(err);
        });

// insert pages
pages
    .then((data)=>{
            console.log('inserting pages....');
            fetchMysql(data);
        }).catch((err)=>{
            console.log(err);
        });
}

function fetchMysql(data){
    for(i=0;i<data.length;i++)
    {
            var postDate=new Date(data[i].date_gmt);
            var postDateFormat=postDate.getFullYear()+'-' + (postDate.getMonth()+1) + '-'+postDate.getDate();
            var todayDate=new Date();
            var todayDateFormat=todayDate.getUTCFullYear()+'-' + (todayDate.getMonth()+1) + '-'+todayDate.getDate();
            //console.log(todayDateFormat);
            // insert
             if(postDateFormat===todayDateFormat)
             {
                var myobj={title:data[i].title.rendered,link:data[i].link,type:data[i].type,id:data[i].id,status:data[i].status};
                var item=new Item(myobj);
                item.save().then((data)=>{
                    console.log(data);
                },(err)=>{
                    console.log(err);
                })
            }
    }

}

module.exports={insert};
