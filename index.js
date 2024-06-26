const express = require('express');
const http = require('http');
const initializeWebSocketServer = require('./src/websocket');
require('dotenv').config();
const db = require('./src/api/models');
const { chatRooms, userConnections, deviceConnections } = require('./src/websocket/stateManager');


const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
initializeWebSocketServer(server);

// Other middleware and routes setup
// ...
app.get('/admin/stats', (req, res) => {
    res.json({
        numberOfChatRooms: chatRooms.size,
        numberOfUserConnections: userConnections.size,
        numberOfDeviceConnections: deviceConnections.size
    });
});

// Start the server 

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});