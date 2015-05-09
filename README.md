## geonames-countries-cities

Output geonames countries and main cities on a single json file

## Installation

1. `npm install`
2. `mkdir {input,output}`
3. [Download countryInfo.txt](http://download.geonames.org/export/dump/countryInfo.txt) and copy to `input` dir
4. [Download cities15000.zip](http://download.geonames.org/export/dump/cities15000.zip), extract and copy to `input` dir

## Usage

`node index.js`

## Customize output

Edit `geonames.js`, comment/uncomment fields

## Field info

http://download.geonames.org/export/dump/
