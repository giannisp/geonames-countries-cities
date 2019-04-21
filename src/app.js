const fs = require('fs');
const path = require('path');
const omit = require('lodash.omit');
const sortBy = require('lodash.sortby');
const { promisify } = require('util');

const geonames = require('./util/geonames');

const writeFile = promisify(fs.writeFile);

const exportData = async (countries, filename) => {
  const filepath = path.join(__dirname, `../build/${filename}`);
  await writeFile(filepath, JSON.stringify({ countries }, null, 2), 'utf8');

  console.log(`Exported data to build/${filename}`);
};

const run = async () => {
  const rawCountries = await geonames.getCountries();
  const countries = sortBy(rawCountries, 'name');

  await exportData(countries, 'countries.json');

  const cities = await geonames.getCities();
  cities.forEach(city => {
    const country = countries.find(({ iso }) => iso === city.country_code);
    if (!country.cities) {
      country.cities = [];
    }
    country.cities.push(omit(city, ['country_code']));
  });

  countries.forEach(country => {
    if (country.cities) {
      country.cities = sortBy(country.cities, 'asciiname');
    }
  });

  await exportData(countries, 'countries-with-cities.json');
};

run();
