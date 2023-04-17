const express=require('express');
const app=express();
const socket = require('socket.io')
const leaveRoom = require('./utils/leave-room');
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));
require('./models/db');
const User=require('./models/user');
const UserRouter=require('./routes/user');
const user = require('./models/user');
const structure=require('./Rooms/structure');
require("dotenv").config();
app.use(express.json())


app.use(UserRouter)

app.get('/',(req,res)=>{
    res.json('heeey')
    // res.send('<h1 style=color:red>hello world</h1>')
    res.json({success:true,msg:'wlc'})
})

app.get('/room-1',(req,res)=>{
   
    res.json({roomId:'room-1'})

})
const io = socket(app.listen(3000, () => console.log('sever running')), { cors: { origin: '*' } })

//================================================================================

io.on('connection', (socket) => {
    console.log('⚡ user connected')
   
       //add NameSpaces
      //  socket.on('nameSpaceLoad',()=>{
      //     console.log('nameSpaceLoad')
         
         
          //  let nsData=[]
          //  for(let ns of structure){
          //   nsData.push({
          //     title:ns.title,
          //     endpoint:ns.endpoint
          //    })
          //  }
        
         let nsData= structure.map((e)=>{
            return {
             title:e.title,
             endpoint:e.endpoint
            }
         })
           
           socket.emit('nsLoad',nsData);
        
      //      socket.emit('nsLoad',nsData);
           
      //  })
      
       socket.on('disconnect',()=>{
           console.log(`${socket.id} disconnected`)
       })

     
    })
   

structure.forEach((ns)=>{
  
  io.of(ns.endpoint).on('connection',(nsSocket)=>{
      console.log(`new user Connected : ${ns.endpoint}`)
      nsSocket.on('RoomLoad',()=>{
        console.log('RoomLoad')
         nsSocket.emit('RoomLoad',ns.rooms)
      })
      let uname;
      let myRoom
      
      nsSocket.on('leave-room',data=>{
        console.log('leave-room')
        const {title,username}=data
        nsSocket.leave(title)

        let myRoom=ns.rooms.find(e=>{return e.title === title})

        myRoom.delUser(username)
        upOnlineUsers(ns.endpoint,title,myRoom.userList)
        console.log(`${username} leave the ${title} room---userlist after leave user: ${myRoom.userList}`)
        
        nsSocket.broadcast.to(title).emit('leftMyUsr',username);
      })
      
      nsSocket.on('joinRoom',data=>{
        console.log('joinRoom')
        
        const {username,room}=data
        console.log(username,room)
        uname=username
        
        nsSocket.join(room)
        
        myRoom=ns.rooms.find(e=>{return e.title === room})
        //nsSocket.rooms: Set(2) { 'WxJtG4lMRlgmG2ZeAAAH', 'Room-1' }
        //ns.rooms:  [Room { name: 'Room-1', title: 'Room-1', history: [], userList: [] },Room { name: 'Room-2', title: 'Room-2', history: [], userList: [] }]
        myRoom.addUser(username)

        console.log('myRoom')
        console.log(myRoom)

        upOnlineUsers(ns.endpoint,room,myRoom.userList)
         console.log(`user ${username} join ${room} room---userlist after join user: ${myRoom.userList}`)
        //================================================

         nsSocket.emit('RoomInformation',myRoom)
         nsSocket.emit('usersInfo')
         nsSocket.emit('chatsInfo')
         nsSocket.emit('gamesInfo')
        // nsSocket.emit('myGm',myRoom.showPlay);   //کاربر لیست بروز شده آیکن گیم های اتاق چت را دربافت کند
        // nsSocket.emit('myCht',myRoom.history);   //کاربر لیست بروز شده چت های اتاق چت را دربافت کند
        // nsSocket.emit('myusr',myRoom.userList);


        nsSocket.broadcast.to(room).emit('joinMyUsr',username);
        
       
      
        nsSocket.on('chat',data=>{
          console.log('chat')
          const {msg,name}=data
         
          let chatroom=ns.rooms.find(e=>{return e.title === Array.from(nsSocket.rooms)[1]})
          let MsgInfo={
            msg,
            name,
            time:new Date().toLocaleString(),
            avatar:'https://s2.uupload.ir/files/avatar_6j64.png'
          }
          chatroom.addMessage(MsgInfo)
          
          if(myRoom.history.length>10){
            myRoom.history.shift()
          }
          
          io.of(ns.endpoint).in(chatroom.title).emit('chatServer',MsgInfo)
          console.log(`get message ${msg}`)
        })
        nsSocket.on('createGm',data=>{
          console.log('createGm')
          const {Random_Number,username}=data
          console.log(Random_Number,username)
          console.log(`${username} create play  room`)

          plyInfo={
            name:Random_Number,
            creator:username,
            listply:[username],
            id:nsSocket.id
          }
          
          myRoom.delUser(username)
          myRoom.addply(plyInfo)

          io.of(ns.endpoint).in(myRoom.title).emit('GameIcon',plyInfo)
          
          nsSocket.broadcast.to(myRoom.title).emit('leftRmToGm',username);
          nsSocket.emit('gameInfo',plyInfo)
          
         
          /////////////////////////////////////////
          nsSocket.on('backGmToRm',(data)=>{
           
            console.log('backGmToRm=>createGm')
            const {room,username,GmName}=data
            console.log(room,username,GmName)
            console.log(`creator:${username} closeed his play room`)
            
            let gameRoom=myRoom.showPlay.find(e=>e.name === GmName) //گرفتن گیم مورد نظر
            
            if(gameRoom !== undefined){
               let ListId=gameRoom.uID  // گرفتن لیست آیدی های اتاق گیم
               let rez=ListId.map(a=>a.id)
               rez.map(e=> io.of(ns.endpoint).to(e).emit('closePageGame')) //بسته شدن گیم برای مهمانان اتاق گیم
               console.log(rez)
              
               let rez1=ListId.map(a=>a.name)
               io.of(ns.endpoint).in(room).emit('usersRoom',rez1) // ارسال لیست کاربرانی که از گیم خارح وبه اتاق چت ورود کردند به کاربران اتاق چت
               
               io.of(ns.endpoint).in(room).emit('deleteMyGame',GmName) // آیکن گیم برای کاریران اتاق چت حذف شود
               myRoom.delply(GmName) // حذف گیم از کلاس
               console.log(myRoom)
               console.log(rez)
               io.of(ns.endpoint).sockets.to(rez).emit('myusr',myRoom.userList)
              //  rez.map(e=> io.of(ns.endpoint).to(e).emit('myusr',myRoom.userList))
              // for(let id of rez){ // بروز رسانی سه آیتم اتاق چت برای کاربرانی که از گیم خارح وبه اتاق چت ورود کردند
              //      console.log('myid')
              //      console.log(id)
              //      io.of(ns.endpoint).to(id).emit('myusr',myRoom.userList)
              //      io.of(ns.endpoint).to(id).emit('myCht',myRoom.history)
              //      io.of(ns.endpoint).to(id).emit('myGm',myRoom.showPlay)
                  
              // }
            
            }
             

            })
          
        })
        
        nsSocket.on('joinGm',data=>{
          console.log('joinGm')
          const {title,username,gameName}=data
          console.log(title,username,gameName)
          console.log(`player:${username} join to Game`)
          
         
           myRoom.delUser(username)
           myRoom.add2(gameName,username,nsSocket.id)
          
           nsSocket.broadcast.to(title).emit('leftRmToGm',username);
        
          
           let myGame=myRoom.showPlay.find(e=>{return e.name === gameName})
           
           nsSocket.emit('GameInformation',myGame)
           nsSocket.emit('gameInfo')
           
           let ListId=myGame.uID
           let rez=ListId.map(a=>a.id)
           rez.map(e=>io.of(ns.endpoint).to(e).emit('joinRmToGm',username))

           /////////////////////////////////////
           
           nsSocket.on('backGmToRm',data=>{  //خروج کاربرمهمان از گیم و برگشت به لابی
              console.log('backGmToRm=>joinGm')
              const {room,username,GmName}=data //دریافت نام اتاق چت و نام کاربر و نام اتاق گیم(بترتیب))
              console.log(room,username,GmName)
              console.log('i closed play room')

              myRoom.addUser(username)    // کاربر به لیست کاربران اتاق چت اضافه شود در کلاس
              myRoom.del2(gameName,username)  // کاربر از لیست کاربران اتاق گیم حذف شود درکلاس

              nsSocket.emit('myGm',myRoom.showPlay);   //کاربر لیست بروز شده آیکن گیم های اتاق چت را دربافت کند
              nsSocket.emit('myCht',myRoom.history);   //کاربر لیست بروز شده چت های اتاق چت را دربافت کند
              nsSocket.emit('myusr',myRoom.userList);
              nsSocket.broadcast.to(title).emit('usersRoom3',username);  //کاربر به لیست کاربران اتاق چت اضافه شود در فرانت
             

              let ListId=myGame.uID
              let rez=ListId.map(a=>a.id)
              rez.map(e=> io.of(ns.endpoint).to(e).emit('leftGmToRm',username))  // کاربر از لیست کاربران اتاق گیم حذف شود در فرانت
           
            })
               
           
        })
      })

      nsSocket.on('disconnecting',()=>{
        console.log(`new user: ${uname} disconnecting : ${ns.endpoint}`)
        let LastRoom=Array.from(nsSocket.rooms)[1]
        
        if(myRoom !== undefined){
         upOnlineUsers(ns.endpoint,LastRoom,myRoom.userList)
         
       }

      })
      nsSocket.on('disconnect',()=>{
        console.log(`new user: ${uname} disconnected : ${ns.endpoint}`)
        // chatroom1.delUser(uname)
        // nsSocket.broadcast.to(chatroom1).emit('leftUs',uname);
      })
    })
    
    
  
})


async function upOnlineUsers(endpoint,room,userList){

  let onlineUsers=await (io.of(endpoint).in(room).allSockets())

  let usersArry=Array.from(onlineUsers)
  let uus=usersArry.length
  io.of(endpoint).in(room).emit('upOnlineUsers',{uus,userList})

  // io.to(socketId).emit('hey',hey)
  
}

// let ab=[{ns:'pop',end:'/pop',uz:[]},{ns:'dad',end:'/dad',uz:[]},{ns:'cv',end:'/cv',uz:[]}]
// let fg=[]
// let tt=ab.find(e=>e.ns === 'dad')
// let newRoom={
//   nam:'ali',
//   sen:'12'
// }

// // tt.uz.sam='ali'
// tt.uz.push(newRoom)
// console.log(ab[1].uz)
// console.log(ab)


// let ab1=[1,2]
// let ab2=[3,4,5,6]
// let ab22=[ { name: 4153, creator: 'yasaman', listply: [7,8]}]
// // console.log(ab1.concat(ab2))

// let us= ab22.find(e=>e.name === 4153)
// console.log(us.listply)
// us.listply= us.listply.filter((n) => {return n != 8});
// console.log(us.listply)
// console.log(ab22)

// class Rooms{
//   constructor(){
      
//       this.showPlay=[]
//   }
  
//   addply(ply,s){
//     let a={}
//     a.name=ply
//     a.b=s
//     a.list=[s]
//     this.showPlay.push(a)
          
//   }
//   add2(i,num){
//     let us= this.showPlay.filter(e=>e.name === i)
//     console.log(us)
//     let mam=us[0].list
//     mam.push(num)

//     console.log(mam)
//   }
 
// }  
//  let az=new Rooms()
//  az.addply(21,'zari')
//  az.addply(44,'roya')
//  console.log(az)
//  az.add2(21,'saam')
//  console.log(az.showPlay[0].list)

// const generateID=()=>Math.random().toString(36).substring(2,10)
// let allUsers = []
// let chatRooms=[{id:1,roomName:'Room-1',users:[],messages: []},
//                {id:2,roomName:'Room-2',users:[],messages: []},
//                {id:3,roomName:'MafLaf Gruop',users:[],messages: []},
//                {id:4,roomName:'mozakere scenario',users:[],messages: []},
//                {id:5,roomName:'nato scenario',users:[],messages: []}
//               ]
// let chatRoom=''



// const a = 'name1';
// eval (a + " = 37")
// console.log(name1)


// let a=2
// console.log(a)
// const bf=(a)=>{
//   return a+5
// }
// console.log(bf(a))
// let c=5
// console.log(c)
// let a=()=>{
//   return new Promise((res,rej)=>{
//     setTimeout(() => {
//     let b='man 3'
//     console.log(b)
//     // res('2sanie')
//   }, 2000);
//   })
  
// }


// let c=async()=>{
//   console.log('man 2')
//   let my=await a()
//   console.log('man 4')
// }

// console.log('man 1')
// c()


// let my=({a,...b})=>{
//   if(a === 'sam'){
//      console.log(b)
//   }else if(a === 'bam'){
//     console.log(b.m)
//   }
  
// }
// my({a:'sam',h:2,v:4})
// my({a:'bam',c:3,m:99,mb:44})





// nsSocket.on('backGmToRm',data=>{
//   console.log('backGmToRm')
//   console.log(myRoom)
  
//   const {room,Random_Number,username,createName}=data
//   console.log(room,Random_Number,username,createName)
//   // let chatroom4=ns.rooms.find(e=>{return e.title === room})
  
//   let gameRoom=myRoom.showPlay.find(e=>e.name === Random_Number)
//   console.log(gameRoom)
//   let ListId


//   nsSocket.emit('RoomInformation',myRoom)
//   nsSocket.emit('usersInfo')
//   nsSocket.emit('chatsInfo')
//   nsSocket.emit('gamesInfo')
//   nsSocket.broadcast.to(room).emit('joinMyUsr',username);

//   // let ListId=gameRoom.uID
//   if(username === gameRoom.creator){

//     console.log(`creator:${username} closeed his play room`)
//     console.log(gameRoom.uID)
//     uId=gameRoom.uID
//     myRoom.delply(Random_Number)
//     io.of(ns.endpoint).in(room).emit('deleteMyGame',Random_Number)
//     for(const id in ListId){
//       io.of(ns.endpoint).to(id).emit('closePageGame')
     
//       // io.of(ns.endpoint).in(room).emit('myUserOnlone',ListId[id])
      
//      }
//   //  nsSocket.to(room).emit('deleteMyGame',Random_Number)
   
//     //  io.of(ns.endpoint).in(room).emit('myplaylist',gameRoom)
    
//      console.log(myRoom)

//     //  ListId.uID={}
//   }else{
//     console.log('i closed play room')
     
//     myRoom.addUser(username)
    
//     myRoom.del2(Random_Number,username)
   
//     //  nsSocket.broadcast.to(room).emit('myUserOnlone2',username);
   
//      console.log(myRoom)
//      for(const id in ListId.uID){
         
//          if(username === ListId.uID[id]){
      
//                  delete ListId.uID[id]
                 
//           }
//       }
//       console.log(myRoom.showPlay)
//   }
      
 
// })

// let num1='zari'
// let num2='farid'
// let nums={}
// nums['saff22']=num1
// nums['saff2ff2']=num2
// console.log(nums)

// for(const id in nums){
//   console.log(id)
//   console.log(nums[id])
// }

// const mam=[{a1:'zari',a2:'20'},{a1:'mari',a2:'30'},{a1:'ali',a2:'40'}]



// let my=mam.filter(e=>e.a1 !== 'mari')
// console.log(my)
// let rez=my.map(a=>a.a2)
// console.log(rez)
// rez.map(e=>console.log(e))

// let keys=mam.map(e=>e.a1);
// let values=mam.map(e=>e.a2);

// console.log(keys,values)
// var result = {};
// keys.forEach((key, i) => result[key] = values[i]);

// for(const id in result){
//   console.log(id)
//   console.log(result[id])
// }
// console.log(result);

// [ { a1: 'zari', a2: '20' }, { a1: 'ali', a2: '40' } ]
// [ '20', '40' ]
// 20
// 40
// [ 'zari', 'mari', 'ali' ] [ '20', '30', '40' ]
// zari
// 20
// mari
// 30
// ali
// 40
// { zari: '20', mari: '30', ali: '40' }


  //  console.log(myRoom)
              //  io.of(ns.endpoint).in(room).emit('deleteMyGame',GmName) //حذف گیم از لیست کاربران اناق
              
              //  io.of(ns.endpoint).in(room).emit('usersRoom',myRoom.userList)  // بروز رسانی لیست کاربران برای کاربران اتاق

              //  let keys=ListId.map(e=>e.id);
              //  let values=ListId.map(e=>e.name);

              //  var result = {};
              //  keys.forEach((key, i) => result[key] = values[i]); //[ {id:name},{}...]
              //  console.log(result)
              //  for(const id in result){
              //   console.log(id)
              //   console.log(result[id])
              //    io.of(ns.endpoint).to(id).emit('chatsInfo2',myRoom.history)
              //    let my=[]
              //    if(result[id] !== gameRoom.creator){
              //       console.log(result[id])
              //       my.push(result[id])
              //       console.log(my)
              //       io.of(ns.endpoint).to(id).emit('usersRoom2',my)
                    
              //     }
              //  }

               
              //  io.of(ns.endpoint).in(room).emit('myGm',myRoom.showPlay);   //لیست بروز شده آیکن های گیم اتاق چت برای همه ارسال شود
              //  io.of(ns.endpoint).in(room).emit('myCht',myRoom.history);  //لیست بروز شده چت های اتاق چت برای همه ارسال شود
              
              //  io.of(ns.endpoint).in(room).emit('usersRoom',myRoom.userList) //لیست بروز شده کاربران اتاق چت برای همه ارسال شود

