const WebSocket = require("ws");

let ws;

const connectToWebSocket = () => {
  const WS_URL = 'wss://sheetbookingsocket.glitch.me'; // Replace with your Glitch WebSocket URL
  ws = new WebSocket(WS_URL);

  ws.on('open', () => {
    console.log('Connected to Glitch WebSocket server');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
  });
};

// Create a function to broadcast data to Glitch WebSocket server
const broadcast = (data) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  } else {
    console.error("WebSocket connection is not open");
  }
};

module.exports = { connectToWebSocket, broadcast };
