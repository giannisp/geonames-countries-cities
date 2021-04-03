# geonames-countries-cities

## Description

-   Export geonames countries to JSON.
-   Export combined geonames countries and main cities to JSON.

## Requirements

-   NodeJS 14.x

## Install

`make`

## Run

`npm start`

## Customize output

Comment/uncomment fields at `src/util/geonames.js`.  
Please note that `country.name` and `city.asciiname` fields are used for sorting.

## Field info

http://download.geonames.org/export/dump/
