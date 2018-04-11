var mongoose=require('../config/config');
var Item=require('../models/item');

var todayDate=new Date();
var todayDateFormat=todayDate.getUTCFullYear()+'-' + ("0" + (todayDate.getMonth() + 1)).slice(-2) + '-'+todayDate.getDate();
var currentDate=`${todayDateFormat}T00:00:00`;

var update=function(posts,pages){
console.log('here',currentDate);
// update posts
posts
.param('modified_after',currentDate)
    .then((data)=>{
        if(data.length>0)
        {
            return updatePosts(data);
        }
       console.log('no posts to update');
    }).catch((err)=>{
        console.log(err);
    })
// update pages
pages
    .param('modified_after',currentDate)
        .then((data)=>{
            if(data.length>0)
            {
                return updatePosts(data);
            }
            console.log('no pages to update');
        }).catch((err)=>{
            console.log(err);
        });
}

function updatePosts(data)
{
   
        for(i=0;i<data.length;i++)
        {
            console.log(`to update ${data[i].id}`);
            var query = { id:data[i].id };
            var toUpdate={ $set: {title: data[i].title.rendered}};
            // update
            Item.update(query,toUpdate)
                .then((data)=>{
                    console.log(data);
                },(err)=>{
                    console.log(err);
                })
        }
}

module.exports.update=update;
