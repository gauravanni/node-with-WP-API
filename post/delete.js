var mongoose=require('../config/config');
var Item=require('../models/item');

var todayDate=new Date();
var todayDateFormat=todayDate.getUTCFullYear()+'-' + ("0" + (todayDate.getMonth() + 1)).slice(-2) + '-'+todayDate.getDate();
var currentDate=`${todayDateFormat}T00:00:00`;

var delPosts=function(posts,pages){

// delete posts
posts
    .status('trash')
    .param('modified_after',currentDate)
    .then((data)=>{
        if(data.length>0)
        {
            return deletePosts(data);
        }
        console.log(`no posts to delete`);
    }).catch((err)=>{
        console.log(err);
    });
    
// delete pages
pages
    .status('trash')
    .param('modified_after',currentDate)
    .then((data)=>{
    if(data.length>0)
    {
        return deletePosts(data);
    }
    console.log(`no pages to delete`);
}).catch((err)=>{
    console.log(err);
});

}

function deletePosts(data)
{
        for(i=0;i<data.length;i++)
        {
            console.log(`to update ${data[i].id}`);
            var query = { id:data[i].id };
            var toUpdate={ $set: {status:'trash'}};
            Item.update(query,toUpdate)
                .then((data)=>{
                    console.log(data);
                },(err)=>{
                    console.log(err);
                });
        }
}

module.exports.delPosts=delPosts;
