import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({
    port: 3001
});

server.on("connection", async (socket) => {
    try {
        const user = await client.user.create({
            data: {
                email: Math.random().toString() + '@example.com',
                password: Math.random().toString()
            }
        });
        socket.send("Hi there you are connected to the server");
    } catch (err) {
        console.error('Error creating user in websocket connection', err);
        socket.send('Internal server error');
    }
})
