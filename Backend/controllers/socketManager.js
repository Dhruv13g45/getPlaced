import { Server } from "socket.io";
const connections = {};
/*
connections = {
  room1: [socketId1, socketId2],
  room2: [socketId3]
}
*/

export const connectToServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("something connected");

    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      connections[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });
    });

    //signaling stage
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("disconnect", () => {
      let roomKey = null;

      for (const [key, users] of Object.entries(connections)) {
        if (users.includes(socket.id)) {
          roomKey = key;
          break;
        }
      }

      if (!roomKey) return;

      for (let i = 0; i < connections[roomKey].length; i++) {
        io.to(connections[roomKey][i]).emit("user-left", socket.id);
      }

      connections[roomKey] = connections[roomKey].filter(
        (id) => id !== socket.id
      );

      if (connections[roomKey].length === 0) {
        delete connections[roomKey];
      }
    });
  });
  return io;
};
