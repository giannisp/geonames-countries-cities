const fs = require('fs');
const path = require('path');
const find = require('lodash.find');
const omit = require('lodash.omit');
const sortBy = require('lodash.sortby');

const geonames = require('./util/geonames');

geonames.getCountries()
  .bind({})
  .then((countries) => {
    this.countries = sortBy(countries, 'name');

    const filepath = path.join(__dirname, '../build/countries.json');
    fs.writeFile(filepath, JSON.stringify({
      countries: this.countries,
    }, null, 2), 'utf8');

    console.log('Exported country data to build/countries.json');

    return geonames.getCities();
  })
  .then((cities) => {
    cities.forEach((city) => {
      const country = find(this.countries, { iso: city.country_code });
      if (!country.cities) {
        country.cities = [];
      }
      country.cities.push(omit(city, ['country_code']));
    });

    this.countries.forEach((country) => {
      if (country.cities) {
        country.cities = sortBy(country.cities, 'asciiname');
      }
    });

    const filepath = path.join(__dirname, '../build/countries-with-cities.json');
    fs.writeFile(filepath, JSON.stringify({
      countries: this.countries,
    }, null, 2), 'utf8');

    console.log('Exported country/city data to build/countries-with-cities.json');
  });
