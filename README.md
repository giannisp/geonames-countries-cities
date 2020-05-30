# geonames-countries-cities

## Description

-   Export geonames countries to JSON.
-   Export combined geonames countries and main cities to JSON.
-   Run your own microservice quickly, for country and cities.

## To run a quick microservice

```sh

docker-compose up

```

## URL

**/countries**

Gives the list of all the countries

**/country/:countryId**

Give you the details of cities within a country.

## Requirements

-   NodeJS 12.x

## Install

`make`

## Run

`npm start`

## Customize output

Comment/uncomment fields at `src/util/geonames.js`.  
Please note that `country.name` and `city.asciiname` fields are used for sorting.

## Field info

http://download.geonames.org/export/dump/
