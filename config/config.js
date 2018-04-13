var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://leadodev:Leado2016@byjus-leado-v1-shard-00-00-6nq5s.mongodb.net:27017,byjus-leado-v1-shard-00-01-6nq5s.mongodb.net:27017,byjus-leado-v1-shard-00-02-6nq5s.mongodb.net:27017/byjusleado?ssl=true&replicaSet=byjus-leado-v1-shard-0&authSource=admin');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports={mongoose};