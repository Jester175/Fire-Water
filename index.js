const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const players = [];
const posY = 1100;
const posXwater = 1650;
const posXfire = 800;
let coinCount = 0;


const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url.endsWith('.js')) {
    fs.readFile(`./public${req.url}`, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  } else if (req.url.endsWith('.jpg') || req.url.endsWith('.png')) {
    fs.readFile(`./public/assets/images${req.url}`, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        const contentType = req.url.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  console.log(req.connection.remoteAddress);

  const playerId = uuidv4();
  let role = 'fire';
  if (role === 'fire' && players.some(player => player.role === 'fire')) {
    role = 'water';
  }

  const x = role === 'water' ? posXwater : posXfire;
  const y = posY;

  const newPlayer = { playerId, role, x, y };
  players.unshift(newPlayer);

  ws.send(JSON.stringify({ type: 'currentPlayers', players }));

  sendOtherMessage(ws, 'newPlayer', { player: newPlayer });

  // Обработка сообщений от клиента
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    const response = JSON.parse(message);
    const playerToUpdate = players.find((player) => player.role === response.role);
    if (playerToUpdate) {
      playerToUpdate.x = response.x;
      playerToUpdate.y = response.y;
    }
    if (response.type == 'CoinAction') coinCount += 1;
    const data = { action: response.action, playerId: response.playerId, x: response.x, y: response.y }
    sendOtherMessage(ws, response.type, data);
  });

  ws.on('close', () => {
    console.log(coinCount);
    console.log('Client disconnected');
    const index = players.findIndex(player => player.playerId === playerId);
    if (index !== -1) {
      const removedPlayer = players.splice(index, 1)[0];
      const data = { playerId: removedPlayer.playerId };
      sendOtherMessage(ws, 'playerDisconnected', data);
    }
  });
});

const sendOtherMessage = (ws, type, data) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: type, ...data }));
    }
  });
}

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
