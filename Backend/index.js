const Fastify = require('fastify');
const WebSocket = require('ws');

const app = Fastify();

const buses = [
  {
    id: 1,
    latitude: 16.506,
    longitude: 80.648,
  },
  {
    id: 2,
    latitude: 16.508,
    longitude: 80.650,
  },
  {
    id: 3,
    latitude: 16.504,
    longitude: 80.646,
  },
];

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client Connected');
});

setInterval(() => {
  buses.forEach((bus) => {
    bus.latitude += 0.0005;
    bus.longitude += 0.0005;
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(buses));
    }
  });
}, 2000);

app.get('/', () => {
  return {
    message: 'Server Running',
  };
});

app.listen({ port: 3001 }, () => {
  console.log('Fastify Running');
});