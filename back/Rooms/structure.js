const NamespaceController=require('./Controllers/Namespace');
const RoomController=require('./Controllers/Room');

let publicRooms=new NamespaceController('Public Rooms','/public')
let groupRooms=new NamespaceController('Group Rooms','/group')
let typeRooms=new NamespaceController('Rooms By Game Type','/type')

publicRooms.addRoom(new RoomController('Room-1','Room-1'))
publicRooms.addRoom(new RoomController('Room-2','Room-2'))
groupRooms.addRoom(new RoomController('MafLafGruop','MafLaf Gruop'))
typeRooms.addRoom(new RoomController('mozakereScenario','mozakere scenario'))
typeRooms.addRoom(new RoomController('natoScenario','nato scenario'))

module.exports=[publicRooms,groupRooms,typeRooms]
