var fs     = require('fs');
var _      = require('lodash');

var geonames = require('./geonames');

var data = {};

geonames
    .read_countries()
    .then(function(countries) {
        console.log('Processed ' + countries.length + ' countries');

        data.countries = countries;
        return geonames.read_cities();
    })
    .then(function(cities) {
        console.log('Processed ' + cities.length + ' cities');

        _.each(cities, function(city) {
            var country = _.findWhere(data.countries, {iso: city.country_code});
            country.cities.push(_.omit(city, 'country_code'));
        });

        fs.writeFile('output/data.json', JSON.stringify({countries: data.countries}), 'utf8');

        console.log('Exported data to output/data.json');
    });
