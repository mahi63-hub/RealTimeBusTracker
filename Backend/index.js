const Fastify = require('fastify');

const app = Fastify();

const route = [
  {
    latitude: 16.506,
    longitude: 80.648,
  },
  {
    latitude: 16.507,
    longitude: 80.649,
  },
  {
    latitude: 16.508,
    longitude: 80.650,
  },
  {
    latitude: 16.509,
    longitude: 80.651,
  },
];

let currentIndex = 0;

setInterval(() => {
  const currentLocation = route[currentIndex];

  console.log(currentLocation);

  currentIndex++;

  if (currentIndex >= route.length) {
    currentIndex = 0;
  }
}, 2000);

app.get('/', async () => {
  return {
    message: 'Server Running',
  };
});

app.listen({ port: 3001 }, () => {
  console.log('Server Running on Port 3001');
});