var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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
    MongoClient.connect(url,(err, db)=> {
        if (err) throw err;
        var dbo = db.db("mydb");
        for(i=0;i<data.length;i++)
        {
            console.log(`to update ${data[i].id}`);
            var updateParam = { id:data[i].id };
            var toUpdate={ $set: {status:'trash'}};
            dbo.collection("customers").updateOne(updateParam, toUpdate,(err, res)=> {
            if (err) throw err;
            console.log(JSON.stringify(res,undefined,2));
            db.close();
            });
    
        }
    });
}

module.exports.delPosts=delPosts;
