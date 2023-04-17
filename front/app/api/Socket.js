import io from "socket.io-client";
const socket = io.connect("http://192.168.1.161:3000");
console.log('socket connected')
export default socket;



// let socket1;
// export const initiateSocket = (room) => {
//   socket1 = io('http://192.168.1.161:3000');
//   console.log(`Connecting socket...`);
//   if (socket1 && room) socket1.emit('join', room);
// }
// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if(socket1) socket1.disconnect();
// }
// export const subscribeToChat = (cb) => {
//   if (!socket1) return(true);
//   socket1.on('chat', msg => {
//     console.log('Websocket event received!');
//     return cb(null, msg);
//   });
// }
// export const sendMessage = (room, message) => {
//   if (socket1) socket1.emit('chat', { message, room });
// }