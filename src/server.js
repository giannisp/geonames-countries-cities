const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const memoize = require('memoizee');

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
});
fastify.register(require('fastify-compress'));

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

const readFile = promisify(fs.readFile);

const readPath = async filename => {
  const filepath = path.join(__dirname, `../build/${filename}`);
  const data = await readFile(filepath, 'utf8');
  const buffer = Buffer.from(data);
  return buffer.toString('utf-8');
};

const memoizeReadPath = memoize(readPath, { async: true });

const getCountry = async countryIso => {
  const citiesFile = await memoizeReadPath('countries-with-cities.json');
  const countriesListWithCities = JSON.parse(citiesFile);
  const list = countriesListWithCities.countries.filter(country => {
    if (country.iso === countryIso) {
      return true;
    }
    return false;
  });
  return list[0];
};

const memoizeCountry = memoize(getCountry, { async: true });

fastify.get('/countries', async (request, reply) => {
  const countryFile = await memoizeReadPath('countries.json');
  reply.type('application/json').code(200);
  return JSON.parse(countryFile);
});

fastify.get('/country/:countryId', async (request, reply) => {
  const cities = await memoizeCountry(request.params.countryId);
  reply.type('application/json').code(200);
  return cities;
});

// Run the server!
fastify.listen(3400, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
