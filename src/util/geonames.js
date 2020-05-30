const fs = require('fs');
const path = require('path');
const byline = require('byline');

exports.getCountries = () => {
  return new Promise(resolve => {
    const countries = [];
    const filepath = path.join(__dirname, '../../data/countryInfo.txt');

    const stream = byline(fs.createReadStream(filepath, { encoding: 'utf8' }));

    stream
      .on('data', line => {
        if (line.startsWith('#')) {
          return;
        }

        const data = line.split('\t');
        countries.push({
          iso: data[0],
          iso3: data[1],
          iso_numeric: data[2],
          fips: data[3],
          name: data[4],
          capital: data[5],
          // area: data[6],
          // population: data[7],
          // continent: data[8],
          // tld: data[9],
          currency_code: data[10],
          currency_name: data[11],
          phone: data[12],
          postal_code_format: data[13],
          postal_code_regex: data[14],
          // languages: data[15],
          // geoname_id: data[16],
          // neighbours: data[17],
        });
      })
      .on('end', () => {
        resolve(countries);
      });
  });
};

exports.getCities = () => {
  return new Promise(resolve => {
    const cities = [];
    const filepath = path.join(__dirname, '../../data/cities15000.txt');

    const stream = byline(fs.createReadStream(filepath, { encoding: 'utf8' }));

    stream
      .on('data', line => {
        if (line.startsWith('#')) {
          return;
        }

        const data = line.split('\t');
        cities.push({
          id: data[0],
          name: data[1],
          asciiname: data[2],
          // alternatenames: data[3],
          // latitude: data[4],
          // longitude: data[5],
          // feature_class: data[6],
          // feature_code: data[7],
          // cc2: data[9],
          // admin1_code: data[10],
          // admin2_code: data[11],
          // admin3_code: data[12],
          // admin4_code: data[13],
          // population: data[14],
          // elevation: data[15],
          // dem: data[16],
          // timezone: data[17],
          // modified_date: data[18],

          // required field for country matching, omitted from output
          country_code: data[8],
        });
      })
      .on('end', () => {
        resolve(cities);
      });
  });
};
