const Fastify = require('fastify');
const WebSocket = require('ws');

const app = Fastify();

const route = [
  { latitude: 16.506, longitude: 80.648 },
  { latitude: 16.507, longitude: 80.649 },
  { latitude: 16.508, longitude: 80.650 },
  { latitude: 16.509, longitude: 80.651 },
];

const buses = [
  {
    id: 1,
    currentIndex: 0,
  },
  {
    id: 2,
    currentIndex: 1,
  },
  {
    id: 3,
    currentIndex: 2,
  },
];

const wss = new WebSocket.Server({
  port: 8080,
});

wss.on('connection', () => {
  console.log('Client Connected');
});

setInterval(() => {
  const updatedBuses = buses.map((bus) => {
    const location = route[bus.currentIndex];

    bus.currentIndex++;

    if (bus.currentIndex >= route.length) {
      bus.currentIndex = 0;
    }

    return {
      id: bus.id,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedBuses));
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