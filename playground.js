const users=[{
  id:1,
  name:'Gaurav',
  SchoolId:101
},{
  id:2,
  name:'Kumar',
  SchoolId:102
}];

const grades=[];

const getUser=(id)=>{
  return new Promise((resolve,reject)=>{
      const userMatch=users.find((user)=>{
        return user.id===id;
      })
      if(userMatch)
      {
        return resolve(userMatch);
      }
      reject(`does not match user with ${id}`);
  })
}

getUser(3)
.then((user)=>{
  console.log(user);
}).catch((e)=>{
console.log(e);
});