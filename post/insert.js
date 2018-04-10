var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var insert=function(posts,pages){
// insert posts
posts
    .then((data)=>{
            //console.log('inserting posts....');
            fetchMysql(data);
        }).catch((err)=>{
            console.log(err);
        });

// insert pages
pages
    .then((data)=>{
            //console.log('inserting pages....');
            fetchMysql(data);
        }).catch((err)=>{
            console.log(err);
        });
}

function fetchMysql(data){
    MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    var dbo = db.db("mydb");
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
                dbo.collection("customers").insert(myobj,(err, res)=> {
                if (err) throw err;
                console.log("1 document inserted");
                });
            }
        

    }
});
}

module.exports.insert=insert;
