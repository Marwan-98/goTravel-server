import { Server, Socket } from "socket.io";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<number, { name: string }> = {};

function socket({ io }: { io: Server }) {
  io.on("connection", (socket: Socket) => {
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName, roomId }) => {
      rooms[roomId] = {
        name: roomName,
      };
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
    });

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ message, userId, dateSent, roomId }) => {
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          userId,
          dateSent,
          tripId: roomId,
        });
      }
    );

    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    socket.on(EVENTS.CLIENT.LEAVE_ROOM, (roomId) => {
      socket.leave(roomId);
    });
  });
}

export default socket;
