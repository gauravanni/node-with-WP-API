var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var WpSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },link:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },type:{
        type:String,
    },status:{
        type:String,
        required:true,
        minlength:1
    },id:{
        type:Number,
        required:true
    },category:{
        type:String
    },
    content:{
        type:String
    },
    instance:{
        type:String
    }
});

module.exports=mongoose.model('Wp-sink',WpSchema);	
