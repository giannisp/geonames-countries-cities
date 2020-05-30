const fs = require('fs');
const path = require('path');
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

  const countriesWithCities = countries.reduce((result, country) => {
    const countryCities = cities.filter(
      ({ country_code: countryCode }) => countryCode === country.iso,
    );

    return [
      ...result,
      {
        ...country,
        cities: sortBy(
          countryCities.map(({ id, name, asciiname }) => ({
            id,
            name,
            asciiname,
          })),
          'asciiname',
        ),
      },
    ];
  }, []);

  await exportData(countriesWithCities, 'countries-with-cities.json');
};

run();
