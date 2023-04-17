class Room{
    constructor(name,title){
        this.name=name
        this.title=title
        this.history=[]
        this.userList=[]
        this.showPlay=[]
        
    }
    addMessage(MsgInfo){
    
        this.history.push({msg:MsgInfo.msg,name:MsgInfo.name,time:MsgInfo.time,avatar:MsgInfo.avatar})
    }
    addUser(usr){
        let us=this.userList.find(e=>e === usr)
        if(!us){this.userList.push(usr)}
        
        
    }
    delUser(usr){
        
       let us= this.userList.filter(e=>e !== usr)
       this.userList=us
    }
    delply(ply){
       
        let us1= this.showPlay.find(e=>e.name === ply)
        let sam=us1.listply
        let nul=this.userList.concat(sam)
        this.userList=nul  // لیست کاربران اتاق گیم به کاربران اتاق چت اضافه میشوند
         let us= this.showPlay.filter(e=>e.name !== ply)
         this.showPlay=us   // اتاق گیم مورد نظر حذف میشود
        
    }
   
    addply(ply){
        
        
        this.showPlay.push({name:ply.name,creator:ply.creator,listply:ply.listply,uID:[{name:ply.creator,id:ply.id}]})
        
    }
    add2(i,num,id){
       
        let us= this.showPlay.find(e=>e.name === i)
        
        us.listply.push(num)
        us.uID.push({name:num,id})
       
    }
    del2(i,num){
        
        let us= this.showPlay.find(e=>e.name === i)
        let sam1=us.listply
        us.listply= sam1.filter((n) => {return n != num});
        let sam2=us.uID
       let my=sam2.filter(e=>e.name !== num)
        us.uID=my
    }
  
}
module.exports=Room